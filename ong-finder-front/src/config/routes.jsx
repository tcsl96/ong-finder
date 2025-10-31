import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home";

import AuthPage from "../pages/AuthPage/AuthPage";

import Impact from "../components/Impact/Impact";

const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            <Route path="/" element={<RootLayout />} >
                <Route path="/" element={<Home />} />
            </Route>

            {/* Rota para a página de autenticação( login-cadastro)  */}
            <Route path="/auth" element={<AuthPage />} />

            <Route path="/test" element={<Impact />} />
        </>
    )
)

export default router;