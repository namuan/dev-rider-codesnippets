import {Link, Outlet} from "@tanstack/react-router";

export function Root() {
    return (
        <div>
            <nav>
                <Link to="/">Home</Link>
            </nav>
            <hr/>
            <Outlet/>
        </div>
    )
}