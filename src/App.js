import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./components/login/Login";
import WorkflowTable from "./components/workflowTable/WorkflowTable";
import WorkflowCreator from "./components/workflowCreater/WorkflowCreator";
import { AuthProvider, useAuth } from "./context/AuthContext";



const App = () => {
    const { loggedIn } = useAuth()
    const navigate = useNavigate()
    useEffect(() => {
        console.log("loggedIn", loggedIn)
        if (!loggedIn) navigate("/")
        else navigate("workFlowTable")
    }, [loggedIn])
    return (
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/workFlowTable" element={<WorkflowTable />} />
                <Route path="/workflowCreator" element={<WorkflowCreator />} />
            </Routes>
    );
};

export default App;
