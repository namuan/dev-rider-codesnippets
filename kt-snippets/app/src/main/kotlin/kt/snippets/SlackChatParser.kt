package kt.snippets

import com.google.common.io.Resources.getResource
import java.io.BufferedReader
import java.io.File
import java.io.FileReader


fun readGroup(reader: BufferedReader): List<String> {
    val groupLines = mutableListOf<String>()
    var line = reader.readLine()
    while (line != null && line != "–") {
        groupLines.add(line)
        line = reader.readLine()
    }
    return groupLines
}

data class UpdateGroup(
    val messageDatetime: String?,
    val messageGithubProjectName: String?,
    val messageSender: String?,
    val messageAction: String?,
    val messagePullRequest: String?,
)

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

    return UpdateGroup(
        messageDatetime,
        messageGithubProjectName,
        messageSender,
        messageAction,
        messagePullRequest
    )
}

fun main() {
    val file = File(getResource("slack-chat.txt").file)
    val reader = BufferedReader(FileReader(file))

    while (true) {
        val groupLines = readGroup(reader)
        if (groupLines.isEmpty()) {
            break
        }
        val parsedGroup = parseGroup(groupLines.joinToString(" "))
        println("parsedGroup = ${parsedGroup}")
    }

    reader.close()
}
