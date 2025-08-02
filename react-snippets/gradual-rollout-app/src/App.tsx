import React, { useState } from 'react';
import { isFeatureEnabled, simpleHash } from './featureFlags';

const App: React.FC = () => {
    const [userId, setUserId] = useState<string>("user123"); // Default user ID
    const rolloutPercentage = 10; // Roll out the feature to 10% of users

    const handleUserIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserId(event.target.value);
    };

    const maxValue = 100;
    const hashValue = simpleHash(userId, maxValue);
    const featureEnabled = isFeatureEnabled(userId, rolloutPercentage);

    return (
        <div>
            <h1>Welcome to My React App with TypeScript</h1>
            <div>
                <label htmlFor="userIdInput">Enter User ID: </label>
                <input
                    id="userIdInput"
                    type="text"
                    value={userId}
                    onChange={handleUserIdChange}
                    placeholder="Enter user ID"
                />
            </div>
            <div>
                <h2>Feature Flag Details</h2>
                <p><strong>User ID:</strong> {userId}</p>
                <p><strong>Hash Value:</strong> {hashValue}</p>
                <p><strong>Rollout Percentage:</strong> {rolloutPercentage}%</p>
                <p><strong>Feature Enabled:</strong> {featureEnabled ? 'Yes' : 'No'}</p>
            </div>
            {featureEnabled && (
                <div>
                    <p>This is a gradually rolled out feature. You are lucky!</p>
                </div>
            )}
        </div>
    );
};

export default App;
