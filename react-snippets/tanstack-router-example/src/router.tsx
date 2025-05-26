import {createRootRoute, createRoute, createRouter} from "@tanstack/react-router";
import {Root} from "./components/Root.tsx";
import {Home, type HomeLoaderData} from "./components/Home.tsx";
import {Profile, type ProfileData} from "./components/Profile.tsx";

const rootRoute = createRootRoute({
    component: Root
})

const homeRoute = createRoute({
    getParentRoute: () => rootRoute,
    loader: async (): Promise<HomeLoaderData> => {
        const response = await fetch("https://dummyjson.com/users");
        const data = await response.json();
        return {users: data.users};
    },
    component: () => {
        const data = homeRoute.useLoaderData();
        return <Home loaderData={data}/>
    },
    path: "/",
})

const profileRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: `/profile/$userId`,
    loader: async ({params}): Promise<ProfileData> => {
        if (!params?.userId || params.userId === 'unknown') {
            throw new Error('Invalid user ID'); // Or return a default ProfileData
        }
        const response = await fetch(`https://dummyjson.com/users/${params.userId}`);
        const data = await response.json();
        return {user: {id: data.id, firstName: data.firstName}};
    },
    staleTime: 5 * 60 * 1000,
    component: () => {
        const data = profileRoute.useLoaderData();
        return <Profile profileData={data}/>;
    },
});

const routeTree = rootRoute.addChildren([homeRoute, profileRoute]);

export const router = createRouter({routeTree})
