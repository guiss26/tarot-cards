import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../App"
import CardDetailPage from "../pages/CardDetailPage.jsx"
import Layout from "../layout/Layout"
import ReadingPage from "../pages/ReadingPage";
import WelcomeScreen from "../components/WelcomeScreen.jsx";

function RootRedirect() {
    const hasVisited = sessionStorage.getItem('hasVisitedWelcome');
    
    if (!hasVisited) {
        return <Navigate to="/welcome-screen" replace />;
    }
    
    return <Navigate to="/home" replace />;
}

const routerTarot = createBrowserRouter([
    {
        path: "/",
        element: <RootRedirect />
    },
    {
        path: "/welcome-screen",
        element: <WelcomeScreen />
    },
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/home",
                element: <App></App>
            },
            {
                path: "/detalle-carta/:id",
                element: <CardDetailPage></CardDetailPage>
            },
            {
                path: "/lectura-tarot",
                element: <ReadingPage></ReadingPage>
            },
        ]
    }
])

export default routerTarot