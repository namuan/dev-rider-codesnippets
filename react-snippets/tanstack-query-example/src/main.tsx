import React from "react";
import ReactDOM from "react-dom/client";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import App from "./App.tsx";
import "./index.css";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {setApiClientQueryClient} from "./api/apiClient.ts";

const queryClient = new QueryClient();
setApiClientQueryClient(queryClient);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <App/>
            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
    </React.StrictMode>,
);
