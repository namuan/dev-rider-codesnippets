import {useFeatureFlag} from "../context/FeatureFlagContext.tsx";
import NewFeature from "./NewFeature.tsx";
import OldFeature from "./OldFeature.tsx";

const FeatureToggle = () => {

    const isNewFeatureEnabled = useFeatureFlag('newFeature');
    const checkoutVariant = useFeatureFlag("checkoutVariant");

    return (
        <div>
            {isNewFeatureEnabled ? <NewFeature/> : <OldFeature/>}
            <p>Checkout variable {checkoutVariant}</p>
        </div>
    )
}

export default FeatureToggle;