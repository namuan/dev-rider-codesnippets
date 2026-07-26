import {useNavigate} from "@tanstack/react-router";

export type ProfileData = {
    user: {
        id: string;
        firstName: string;
    };
};

export function Profile({profileData}: { profileData: ProfileData }) {
    const {user} = profileData;
    const navigate = useNavigate();

    return (
        <div>
            <h1>Profile Data</h1>
            <p>ID: {user.id}</p>
            <p>Name: {user.firstName}</p>
            <button onClick={() => navigate({to: "/"})}>Go Home</button>
        </div>
    )
}