import React, { useEffect, useState } from 'react';
import { useAuthState } from '../hooks/useAuth';
import { useApi } from '../hooks/useApi';
import { IUser } from '../services/auth.service';

const ProfilePage = () => {
    const { user: authUser, isAuthenticated } = useAuthState(); // Get user from auth state
    const apiService = useApi();
    const [profileData, setProfileData] = useState<IUser | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isAuthenticated) {
            setLoading(true);
            setError(null);
            apiService.fetchUserProfile()
                .then(data => setProfileData(data))
                .catch(err => setError(err.message || 'Failed to fetch profile'))
                .finally(() => setLoading(false));
        } else {
            // This should ideally be handled by ProtectedRoute, but good to have a fallback
            setError("Not authenticated. Cannot fetch profile.");
            setLoading(false);
        }
    }, [apiService, isAuthenticated]); // Re-fetch if auth state changes (e.g., token expires and logs out)

    if (loading) return <p>Loading profile...</p>;
    if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
    if (!profileData && !authUser) return <p>No profile data available.</p>;

    const displayUser = profileData || authUser; // Prefer API fetched data if available

    return (
        <div>
            <h2>User Profile</h2>
            {displayUser ? (
                <>
                    <p><strong>ID:</strong> {displayUser.id}</p>
                    <p><strong>Name:</strong> {displayUser.name}</p>
                    <p><strong>Email:</strong> {displayUser.email}</p>
                </>
            ) : (
                <p>Could not load user details.</p>
            )}
        </div>
    );
};

export default ProfilePage;