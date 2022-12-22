import subprocess

from manim import *


# command line to run scene with manim
# manim -p -ql manim_gpt.py GPT

class GptScene(Scene):
    def construct(self):
        # Create the first rectangle
        rectangle1 = Rectangle(height=1, width=2)
        title1 = Text("Service A", font_size=20)

        # Create the second rectangle
        rectangle2 = Rectangle(height=1, width=2)
        title2 = Text("Service B", font_size=20)

        rectangle1.to_edge(UL)
        title1.next_to(rectangle1, DOWN)
        rectangle2.to_edge(DL)
        title2.next_to(rectangle2, UP)

        # Add the rectangles and titles to the scene
        self.add(rectangle1)
        self.add(title1)
        self.add(rectangle2)
        self.add(title2)

        # Create a database icon
        database = SVGMobject("manim_assets/database.svg")
        # change color of svg
        database.set_fill(color=YELLOW_A, opacity=0.5)
        database.scale(0.5)
        database.to_edge(UP)
        self.add(database)

        # Create the circle and animate between rectangles
        circle = Circle(radius=0.1, color=YELLOW)
        circle.move_to(rectangle1.get_center())
        self.add(circle)
        self.play(circle.animate.move_to(rectangle2.get_center()))

        self.wait(1)


if __name__ == '__main__':
    subprocess.run(["manim", "-p", "-ql", "manim_gpt.py", "GptScene"])
