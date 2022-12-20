package kt.snippets

import javafx.application.Application
import javafx.geometry.Insets
import javafx.geometry.Pos
import javafx.scene.Scene
import javafx.scene.control.Button
import javafx.scene.control.Label
import javafx.scene.control.TextField
import javafx.scene.layout.HBox
import javafx.scene.layout.VBox
import javafx.scene.paint.Color
import javafx.stage.Stage

class ApiKeyDialog(val stage: Stage) {
    // Create a VBox layout for the dialog
    val root = VBox()

    // Create a label for the API key prompt
    val apiKeyPrompt = Label("Please enter your API key:")

    // Create a text field for the user to enter their API key
    val apiKeyField = TextField()

    // Create a button for the user to submit their API key
    val submitButton = Button("Submit")

    // Create a label to display any error messages
    val errorLabel = Label()

    fun showAndWait() {
// Set up the layout of the dialog
        root.padding = Insets(10.0)
        root.spacing = 10.0

        // Create an HBox layout for the prompt, text field, and submit button
        val inputRow = HBox()
        inputRow.spacing = 10.0
        inputRow.alignment = Pos.CENTER
        inputRow.children.addAll(apiKeyPrompt, apiKeyField, submitButton)

        // Configure error label
        errorLabel.textFill = Color.RED

        // Add the input row and error label to the root VBox layout
        root.children.addAll(inputRow, errorLabel)

        // Set the action for the submit button
        submitButton.setOnAction {
            val apiKey = apiKeyField.text
            if (apiKey.isEmpty()) {
                errorLabel.text = "Enter a valid API key"
            } else {
                // Validate the API key and close the dialog
                // if it is valid
            }
        }

        // Set up the stage for the dialog
        stage.title = "API Key"
        stage.scene = Scene(root)
        stage.show()

    }
}

class Main : Application() {
    override fun start(primaryStage: Stage) {
        val stage = Stage()
        val dialog = ApiKeyDialog(stage)
        dialog.showAndWait()
    }
}

fun main(args: Array<String>) {
    Application.launch(Main::class.java, *args)
}
