package kt.snippets.otof

import org.http4k.core.*
import org.http4k.routing.bind
import org.http4k.routing.path
import org.http4k.routing.routes

data class User(val name: String)
data class ToDoItem(val description: String)
data class ToDoList(val listName: ListName, val items: List<ToDoItem>)
data class ListName(val name: String)
data class HtmlPage(val raw: String)

fun extractListData(req: Request): Pair<User, ListName> {
    val user = req.path("user").orEmpty()
    val listName = req.path("list").orEmpty()
    return User(user) to ListName(listName)
}

fun fetchListContent(listId: Pair<User, ListName>): ToDoList {
    return ToDoList(
        ListName(listId.second.name),
        listOf(ToDoItem("apple"), ToDoItem("orange"), ToDoItem("tomatores"))
    )
}

fun renderHtml(list: ToDoList): HtmlPage {
    return HtmlPage(
        """
            <!DOCTYPE html>
            <html lang="">
            <head>
                <title>Zettai</title>
            </head>
            <body>
                <h1>Zettai</h1>
                <h2>${list.listName.name}</h2>
                <table>
                    <tbody>
                        ${renderToDoListItem(list.items)}
                    </tbody>
                </table>
                
            </body>
            </html>
            """.trimIndent()
    )
}

fun renderToDoListItem(items: List<ToDoItem>): String {
    return items.map {
        """<tr><td> ${it.description} </td></tr>""".trimIndent()
    }.joinToString("")
}

fun createResponse(html: HtmlPage): Response = Response(Status.OK).body(html.raw)


typealias FUN<A, B> = (A) -> B

infix fun <A, B, C> FUN<A, B>.andThen(other: FUN<B, C>): FUN<A, C> {
    return { x -> other(this(x)) }
}

class Zettai : HttpHandler {
    val routes = routes(
        "/todo/{user}/{list}" bind Method.GET to ::getToDoList
    )

    override fun invoke(req: Request): Response = routes(req)

    val getToDoListProcess = ::extractListData andThen
            ::fetchListContent andThen
            ::renderHtml andThen
            ::createResponse

    private fun getToDoList(req: Request): Response = getToDoListProcess(req)
}
