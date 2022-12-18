package kt.snippets

import com.google.gson.Gson
import com.google.gson.annotations.SerializedName
import java.net.URI
import java.net.http.HttpClient
import java.net.http.HttpRequest
import java.net.http.HttpResponse

// Define request and response data classes
data class CompletionRequest(
    val model: String,
    val prompt: String,
    val temperature: Double,
    @SerializedName("max_tokens") val maxTokens: Int = 300,
    val stream: Boolean = false
)

data class Choice(val text: String)
data class CompletionResponse(val choices: List<Choice>)
// end

fun main() {
    // Create completion request with the prompt
    val completionRequest = CompletionRequest(
        "text-davinci-003",
        "Who won the last men's football world cup? and with what score?",
        0.1
    )
    // end

    // Convert request to JSON
    val requestJson = Gson().toJson(completionRequest, CompletionRequest::class.java)

    // Create HTTP request
    val request: HttpRequest = HttpRequest.newBuilder()
        .uri(URI.create("https://api.openai.com/v1/completions"))
        .header("Content-Type", "application/json")
        .header("Authorization", "Bearer " + System.getenv("OPENAI_API_KEY"))
        .POST(HttpRequest.BodyPublishers.ofString(requestJson))
        .build()
    // end

    // Send request
    val response = HttpClient.newHttpClient().send(request, HttpResponse.BodyHandlers.ofString())

    // Convert response to data class
    val completionResponse = Gson().fromJson(response.body(), CompletionResponse::class.java)

    // Print response
    println("completionResponse = ${completionResponse}")
}

