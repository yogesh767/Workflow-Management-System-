import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./components/login/Login";
import WorkflowTable from "./components/workflowTable/WorkflowTable";
import WorkflowCreator from "./components/workflowCreater/WorkflowCreator";
import { AuthProvider, useAuth } from "./context/AuthContext";

const AuthRedirector = () => {
    const { loggedIn } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (loggedIn) {
            navigate("/workFlowTable", { replace: true });
        } else {
            navigate("/", { replace: true });
        }
    }, [loggedIn]);

    return null;
};

const AppRoutes = () => {
    const { loggedIn } = useAuth();  // 🔹 Access loggedIn here
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/workFlowTable" element={loggedIn ? <WorkflowTable /> : <Navigate to="/" />} />
            <Route path="/workflowCreator" element={loggedIn ? <WorkflowCreator /> : <Navigate to="/" />} />
            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <AuthRedirector />  {/* Handles redirection after refresh */}
                <AppRoutes />  {/* Separate component for Routes */}
            </Router>
        </AuthProvider>
    );
};

export default App;
