package kt.snippets.otof

import org.http4k.core.HttpHandler
import org.http4k.server.Jetty
import org.http4k.server.asServer

fun main() {
    val handler: HttpHandler = Zettai()
    handler.asServer(Jetty(9000)).start()
}

