import { Routes, Route, Navigate } from "react-router-dom"; // Make sure to use react-router-dom
import SignUpPage from "../views/signupPage";
import LoginPage from "../views/loginPage";
import Dashboard from "../views/dashboard";

function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    );
}

export default AppRouter;
