import {Link} from "@tanstack/react-router";

type User = {
    id: number
    email: string
}

export type HomeLoaderData = {
    users: User[]
}

export function Home({loaderData}: { loaderData: HomeLoaderData }) {
    const {users} = loaderData

    if (users.length === 0) {
        return <p>No Users Found</p>
    }

    return (
        <div>
            <h1>Welcome to Home</h1>
            <p>This is a basic TanStack home page</p>
            <h2>Users</h2>
            <ul>
                {users.map((user) => (
                        <li key={user.id}>
                            <Link to="/profile/$userId" params={{userId: user.id}} preload="intent">
                                <p>{user.email}</p>
                            </Link>
                        </li>
                    )
                )}
            </ul>
        </div>
    )
}