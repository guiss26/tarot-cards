//Router.jsx
import { createBrowserRouter } from "react-router-dom";
import App from "../App"
import CardDetailPage from "../pages/CardDetailPage.jsx"
import Layout from "../layout/Layout"
import ReadingPage from "../pages/ReadingPage";

const routerTarot = createBrowserRouter([{
    path: "/",
    element: <Layout/>,
    children: [
        {
            index: true,
            element: <App></App>
        },
        {
            path: "/detalle-carta/:id",
            element: <CardDetailPage></CardDetailPage>
        },
        {
            path: "/lectura-tarot",
            element: <ReadingPage></ReadingPage>
        }
    ]
}])

export default routerTarot