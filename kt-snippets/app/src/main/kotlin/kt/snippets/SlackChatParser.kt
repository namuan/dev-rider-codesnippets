package kt.snippets

import com.google.common.io.Resources.getResource
import java.io.BufferedReader
import java.io.File
import java.io.FileReader
import java.sql.DriverManager

val DB_CONNECTION = "jdbc:sqlite:./build/slack.db"
val DB_TABLE = "pr_messages"

data class UpdateGroup(
    val messageDay: String?,
    val messageMonth: String?,
    val messageYear: String?,
    val messageGithubProjectName: String?,
    val messageSender: String?,
    val messageAction: String?,
    val messagePullRequest: String?,
)

fun readGroup(reader: BufferedReader): List<String> {
    val groupLines = mutableListOf<String>()
    var line = reader.readLine()
    while (line != null && line != "–") {
        groupLines.add(line)
        line = reader.readLine()
    }
    return groupLines
}

fun parseGroup(slackUpdate: String): UpdateGroup {
    val messageDatetimeRegex = """(\d{1,2} \w{3}[\s\d]*) github-user.*""".toRegex()
    val messageGithubProjectNameRegex = """\[(.*)] .* (?:commented|approved|submitted|closed)""".toRegex()
    val messageSenderRegex = """(PERSON1|PERSON2|PERSON3|PERSON4|PERSON5|PERSON6|GENERICPERSON)""".toRegex()
    val messageActionRegex = """] .* (commented|approved|submitted|closed).*""".toRegex()
    val messagePullRequestRegex = """] .* (#\d+).*""".toRegex()

    val messageDatetime = messageDatetimeRegex.find(slackUpdate)?.groupValues?.get(1)
    val messageGithubProjectName = messageGithubProjectNameRegex.find(slackUpdate)?.groupValues?.get(1)
    val messageSender = messageSenderRegex.find(slackUpdate)?.groupValues?.get(1)
    val messageAction = messageActionRegex.find(slackUpdate)?.groupValues?.get(1)
    val messagePullRequest = messagePullRequestRegex.find(slackUpdate)?.groupValues?.get(1)

    val parsedMessageDateTime = messageDatetime?.let { extractFrom(it) }

    return UpdateGroup(
        parsedMessageDateTime?.messageDay,
        parsedMessageDateTime?.messageMonth,
        parsedMessageDateTime?.messageYear,
        messageGithubProjectName,
        messageSender,
        messageAction,
        messagePullRequest
    )
}

data class MessageDateTime(
    val messageDay: String?,
    val messageMonth: String?,
    val messageYear: String?
)

fun extractFrom(messageDatetime: String): MessageDateTime {
    val regex = """([0-9]{1,2})\s([A-Z][a-z]{2})(?:\s([0-9]{4}))?""".toRegex()
    val match: MatchResult? = regex.find(messageDatetime)

    val day = match.let { it?.groupValues?.get(1) }
    val month = match.let { it?.groupValues?.get(2) }
    val year = if (match?.groupValues?.get(3)?.isEmpty() == true) "2022" else match?.groupValues?.get(3)

    return MessageDateTime(day, month, year)
}

fun setupDatabase() {
    val conn = DriverManager.getConnection(DB_CONNECTION)
    val createTable = """
        CREATE TABLE IF NOT EXISTS $DB_TABLE (
            messageDay TEXT, 
            messageMonth TEXT, 
            messageYear TEXT,
            messageGithubProjectName TEXT,
            messageSender TEXT,
            messageAction TEXT,
            messagePullRequest TEXT
        );
    """.trimIndent()
    conn.createStatement().execute(createTable)
    conn.close()
}

fun saveToDatabase(parsedGroup: UpdateGroup) {
    val conn = DriverManager.getConnection(DB_CONNECTION)
    val insertStatement = """
        INSERT INTO $DB_TABLE (
            messageDay,
            messageMonth,
            messageYear,
            messageGithubProjectName,
            messageSender,
            messageAction,
            messagePullRequest
        ) VALUES (
            '${parsedGroup.messageDay}',
            '${parsedGroup.messageMonth}',
            '${parsedGroup.messageYear}',
            '${parsedGroup.messageGithubProjectName}',
            '${parsedGroup.messageSender}',
            '${parsedGroup.messageAction}',
            '${parsedGroup.messagePullRequest}'
        );
    """.trimIndent()
    val statement = conn.prepareStatement(insertStatement)
    statement.executeUpdate()
    conn.close()
}

fun main() {
    val file = File(getResource("slack-chat.txt").file)
    val reader = BufferedReader(FileReader(file))

    setupDatabase()
    while (true) {
        val groupLines = readGroup(reader)
        if (groupLines.isEmpty()) {
            break
        }
        val parsedGroup = parseGroup(groupLines.joinToString(" "))
        if (parsedGroup.messageDay != null && parsedGroup.messageMonth != null && parsedGroup.messageYear != null && parsedGroup.messageGithubProjectName != null && parsedGroup.messageSender != null && parsedGroup.messageAction != null && parsedGroup.messagePullRequest != null) {
            saveToDatabase(parsedGroup)
            println("parsedGroup = ${parsedGroup}")
        }
    }

    reader.close()
}
