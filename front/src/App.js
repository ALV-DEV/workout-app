import AppRouter from "./components/common/AppRouter/AppRouter"
import Header from "./components/common/header/Header"
import Home from "./components/pages/home/Home"

function App() {
    return (
        <div className=''>
            <Header />
            <AppRouter />
        </div>
    )
}

export default App
