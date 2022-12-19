package kt.snippets

import com.google.gson.Gson
import kotlinx.coroutines.Dispatchers
import java.net.URI
import java.net.http.HttpClient.newHttpClient
import java.net.http.HttpRequest
import java.net.http.HttpResponse
import java.util.concurrent.CompletableFuture

data class Person(val id: Int, val name: String)

fun main() {
    val person = Person(1, "John")
    val json = Gson().toJson(person)

    val request = HttpRequest.newBuilder()
        .uri(URI.create("https://httpbin.org/post"))
        .header("Content-Type", "application/json")
        .POST(HttpRequest.BodyPublishers.ofString(json))
        .build()

    val newHttpClient = newHttpClient()

    val futureResponse = CompletableFuture.supplyAsync {
        println("request = ${request}")
        newHttpClient.send(request, HttpResponse.BodyHandlers.ofString())
    }
    val sendAsync = newHttpClient.sendAsync(request, HttpResponse.BodyHandlers.ofString())

    println("futureResponse: $futureResponse")
    futureResponse
        .thenApply { response ->
            response.body()
        }
        .thenAccept { responseBody ->
            Dispatchers.Main.run {
                println("CompletableFuture Response body: $responseBody")
            }
        }.join()

    sendAsync
        .thenApply { response -> response.body() }
        .thenAccept { responseBody ->
            Dispatchers.Main.run {
                println("HttpClient Response body: $responseBody")
            }
        }.join()

    print("Done")
}