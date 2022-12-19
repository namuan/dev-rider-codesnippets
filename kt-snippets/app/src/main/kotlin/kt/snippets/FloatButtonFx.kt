import javafx.application.Application
import javafx.geometry.Pos.TOP_RIGHT
import javafx.scene.Scene
import javafx.scene.control.Button
import javafx.scene.control.TextArea
import javafx.scene.layout.StackPane
import javafx.stage.Stage

class Main : Application() {
    override fun start(primaryStage: Stage) {
        val textArea = TextArea("Type something here...")
        val button = Button("Click me")

        val root = StackPane(textArea, button)

        root.alignment = TOP_RIGHT

        val scene = Scene(root, 300.0, 250.0)

        primaryStage.title = "Button"
        primaryStage.scene = scene

        primaryStage.show()
    }
}

fun main(args: Array<String>) {
    Application.launch(Main::class.java, *args)
}
