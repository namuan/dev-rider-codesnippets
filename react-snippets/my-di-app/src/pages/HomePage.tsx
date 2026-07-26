import React, { useEffect, useState } from 'react';
import { useApi } from '../hooks/useApi';

const HomePage = () => {
    const apiService = useApi();
    const [publicData, setPublicData] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        apiService.fetchSomePublicData()
            .then(data => setPublicData(data.message))
            .catch(err => setPublicData(`Error: ${err.message}`))
            .finally(() => setLoading(false));
    }, [apiService]);

    return (
        <div>
            <h2>Welcome to the DI App!</h2>
            <p>This is the public home page.</p>
            {loading && <p>Loading public data...</p>}
            {publicData && <p><strong>Public API Says:</strong> {publicData}</p>}
        </div>
    );
};

export default HomePage;
