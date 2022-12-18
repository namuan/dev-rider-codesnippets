package kt.snippets

import com.google.gson.Gson


data class User(var name: String, var age: Int)

fun main() {

    val newUser = User(name = "John", age = 30)

    val newUserJson = Gson().toJson(newUser)
    println("newUserJson = ${newUserJson}")

    val existingUserJson = """{"name": "John", "age": 30}"""
    val existingUser = Gson().fromJson(existingUserJson, User::class.java)
    println("existingUser = ${existingUser}")
}