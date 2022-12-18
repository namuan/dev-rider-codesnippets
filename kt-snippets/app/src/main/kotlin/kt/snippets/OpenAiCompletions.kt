package kt.snippets

import com.google.gson.Gson
import java.net.URI
import java.net.http.HttpClient
import java.net.http.HttpRequest
import java.net.http.HttpResponse

data class CompletionRequest(val model: String, val prompt: String, val temperature: Double)
data class Choice(val text: String)
data class CompletionResponse(val choices: List<Choice>)

fun main() {
    val completionRequest = CompletionRequest(
        "text-davinci-003",
        "Who won the last men's football world cup?",
        0.6
    )
    val requestJson = Gson().toJson(completionRequest, CompletionRequest::class.java)

    val request: HttpRequest = HttpRequest.newBuilder()
        .uri(URI.create("https://api.openai.com/v1/completions"))
        .header("Content-Type", "application/json")
        .header("Authorization", "Bearer " + System.getenv("OPENAI_API_KEY"))
        .POST(HttpRequest.BodyPublishers.ofString(requestJson))
        .build()
    val client = HttpClient.newHttpClient()

    val response = client.send(request, HttpResponse.BodyHandlers.ofString())
    val completionResponse = Gson().fromJson(response.body(), CompletionResponse::class.java)
    println("completionResponse = ${completionResponse.choices[0].text.trim()}")
}

