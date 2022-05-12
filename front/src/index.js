import React from "react"
import ReactDOM from "react-dom/client"
import "./styles/index.scss"
import App from "./App"
import { BrowserRouter } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "react-query"
import { ReactQueryDevtools } from "react-query/devtools"
import AppProvider from "./providers/appProvider"

const quryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <BrowserRouter>
        <QueryClientProvider client={quryClient}>
            <AppProvider>
                <App />
                <ReactQueryDevtools initialIsOpen={false} />
            </AppProvider>
        </QueryClientProvider>
    </BrowserRouter>
)
