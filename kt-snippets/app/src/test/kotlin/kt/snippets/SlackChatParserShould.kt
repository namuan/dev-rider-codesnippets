package kt.snippets

import org.hamcrest.MatcherAssert.assertThat
import org.hamcrest.Matchers.equalTo
import org.junit.jupiter.params.ParameterizedTest
import org.junit.jupiter.params.provider.Arguments
import org.junit.jupiter.params.provider.MethodSource

class SlackChatParserShould {

    @ParameterizedTest
    @MethodSource("textProvider")
    fun testExtraction(
        text: String,
        expectedMessageDatetime: String,
        expectedMessageGithubProjectName: String,
        expectedMessageSender: String,
        expectedMessageAction: String,
        expectedMessagePullRequest: String
    ) {
        val parsedGroup = parseGroup(text)

        assertThat(parsedGroup.messageDatetime, equalTo(expectedMessageDatetime))
        assertThat(parsedGroup.messageGithubProjectName, equalTo(expectedMessageGithubProjectName))
        assertThat(parsedGroup.messageSender, equalTo(expectedMessageSender))
        assertThat(parsedGroup.messageAction, equalTo(expectedMessageAction))
        assertThat(parsedGroup.messagePullRequest, equalTo(expectedMessagePullRequest))
    }

    companion object {
        @JvmStatic
        fun textProvider() = listOf(
            Arguments.of(
                "- 22 Dec 2021 github-user APP 10:55 [github-org/project-one-service] PERSON1 commented on #26: TemporaryFixChanges Comment by PERSON1 on line 5 of application/src/componentTest/resources/com.company/project/app/component/stepdefs/file.feature | 22 Dec 2021 slack-channel-title",
                "22 Dec 2021",
                "github-org/project-one-service",
                "PERSON1",
                "commented",
                "#26"
            ),
            Arguments.of(
                "22 Dec 2021 github-user APP 11:11 [github-org/project-one-service] PERSON2 approved #26: TemporaryFixChanges Comment by PERSON2 on line 5 of application/src/test/java/com.company/project/app/validator/Javafile.java | 22 Dec 2021 slack-channel-title",
                "22 Dec 2021",
                "github-org/project-one-service",
                "PERSON2",
                "approved",
                "#26"
            ),
            Arguments.of(
                "22 Dec 2021 github-user APP 11:28 [github-org/project-one-service] PERSON1 commented on #26: TemporaryFixChanges Comment by PERSON1 on line 5 of application/src/test/java/com.company/project/app/validator/Javafile.java | 22 Dec 2021 slack-channel-title",
                "22 Dec 2021",
                "github-org/project-one-service",
                "PERSON1",
                "commented",
                "#26"
            ),
            Arguments.of(
                """22 Dec 2021 github-user APP 12:03 [github-org/project-one-service] PERSON3 commented on #26: TemporaryFixChanges Comment by PERSON3 on line 2 of application/src/main/resources/db/sqlserver/script.sql | 22 Dec 2021 slack-channel-title""",
                "22 Dec 2021",
                "github-org/project-one-service",
                "PERSON3",
                "commented",
                "#26"
            ),
            Arguments.of(
                """22 Dec 2021 github-user APP 14:16 [github-org/project-two-service] PERSON4 approved #38: Remove CDC slack-channel-title""",
                "22 Dec 2021",
                "github-org/project-two-service",
                "PERSON4",
                "approved",
                "#38"
            ),
            Arguments.of(
                """15 Dec github-user APP 09:03 [github-org/project-three-service] Pull request submitted by PERSON5 #26 AA-story-two: Story title. User story link Waiting for build to be stable before pushing the last commit. Also, the following steps have been done for this PR (based on the Rules) • [ ] Done this • [ ] Done that • [ ] Update README if needed • [ ] Review if any of the WIKI content needs to be updated / added • [ ] Look for any warnings during the Gradle build and try to fix them Show more slack-channel-title""",
                "15 Dec",
                "github-org/project-three-service",
                "PERSON5",
                "submitted",
                "#26"
            ),
            Arguments.of(
                """15 Dec github-user APP 09:39 [github-org/project-four-service] PERSON4 approved #39: AB97979343: adds Dockerfile slack-channel-title""",
                "15 Dec",
                "github-org/project-four-service",
                "PERSON4",
                "approved",
                "#39"
            ),
            Arguments.of(
                """15 Dec github-user APP 09:57 [github-org/project-four-service] PERSON5 commented on #39: AA-ticker-no: adds Dockerfile Comment by PERSON5 on line 1 of Dockerfile | 15 Dec slack-channel-title""",
                "15 Dec",
                "github-org/project-four-service",
                "PERSON5",
                "commented",
                "#39"
            ),
            Arguments.of(
                """16 Dec github-user APP 09:58 [github-org/project-four-service] PERSON6 commented on #39: AA-ticker-no: adds Dockerfile Comment by PERSON6 on line 1 of Dockerfile | 16 Dec slack-channel-title""",
                "16 Dec",
                "github-org/project-four-service",
                "PERSON6",
                "commented",
                "#39"
            ),
            Arguments.of(
                """16 Dec github-user APP 10:32 [github-org/project-four-service] PERSON5 approved #39: AA-ticker-no: adds Dockerfile slack-channel-title""",
                "16 Dec",
                "github-org/project-four-service",
                "PERSON5",
                "approved",
                "#39"
            ),
            Arguments.of(
                """16 Dec github-user APP 10:52 [github-org/project-four-service] Pull request closed: #39 AA12345667: adds Dockerfile by PERSON6 slack-channel-title""",
                "16 Dec",
                "github-org/project-four-service",
                "PERSON6",
                "closed",
                "#39"
            ),
            Arguments.of(
                """16 Dec github-user APP 14:22 [github-org/project-four-service] Pull request closed: #40 Update openjdk Docker tag to v17.0.2-oracle by GENERICPERSON Give feedback  Back to filters   -------- v --------""",
                "16 Dec",
                "github-org/project-four-service",
                "GENERICPERSON",
                "closed",
                "#40"
            )
        )
    }
}
