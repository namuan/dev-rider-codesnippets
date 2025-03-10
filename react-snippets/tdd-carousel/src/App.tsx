import './App.css'
import Carousel from "./Carousel.tsx";
import slides from "./slides.tsx";

function App() {
    return <Carousel autoAdvanceInterval={5_000} slides={slides} />
}

export default App
