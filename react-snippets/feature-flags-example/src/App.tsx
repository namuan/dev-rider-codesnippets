import './App.css'
import {FeatureFlagProvider} from "./context/FeatureFlagContext.tsx";
import FeatureToggle from "./components/FeatureToggle.tsx";

const App = () => (
    <FeatureFlagProvider>
        <h1> Feature Flag Demo</h1>
        <FeatureToggle/>
    </FeatureFlagProvider>
)

export default App;
