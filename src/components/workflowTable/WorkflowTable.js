import React, { useEffect, useState } from "react";
import './workFlowTable.css';
import Pagination from "../pagination/Pagination";
import { useNavigate } from "react-router-dom";
import { db } from "../../utils/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";

const WorkflowTable = () => {
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [workflows, setWorkflows] = useState([]);
    const [favorites, setFavorites] = useState([])
    const navigate = useNavigate();
    const perPage = 5;
    useEffect(() => {
        fetchWorkflows();
    }, []);
    console.log("workflows", workflows)

    const fetchWorkflows = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "workflows"));
            const workflows = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setWorkflows(workflows);
        } catch (error) {
            console.error("Error fetching workflows:", error);
        }
    };

    // Convert Firestore Timestamp to Readable Date
    const convertToDate = (data) => {
        if (!data.timestamp || !data.timestamp.toDate) return "Invalid Date";
        return data.timestamp.toDate().toLocaleString();
    };

    // Filter workflows based on search query
    const filteredWorkflows = workflows.filter(
        (wf) =>
            wf.name.toLowerCase().includes(search.toLowerCase()) ||
            wf.id.includes(search)
    );

    // Calculate total pages
    const totalPages = Math.ceil(filteredWorkflows.length / perPage);

    // Paginate filtered workflows
    const paginatedWorkflows = filteredWorkflows.slice(
        (page - 1) * perPage,
        page * perPage
    );

    return (
        <div className="container mx-auto p-6">
            <div className="flex items-center mb-4">
                <img src="/assets/images/humburger.svg" className="me-2" />
                <h2 className="text-2xl font-bold d-inline">Workflow Builder</h2>
            </div>
            <div className="d-flex justify-content-between create">
                <div className="position-relative searchbar">
                    <input
                        type="text"
                        placeholder="Search By Workflow Name/ID"
                        className="form-control rounded"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                <button className="bg-black text-white px-4 py-2 rounded" onClick={() => navigate("/workflowCreator")}>
                    + Create New Process
                </button>
            </div>

            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="w-100 text-left border-collapse overflow-scroll table">
                    <thead className="table-header w-100">
                        <tr className="bg-gray-100">
                            <th className="p-2 border-b">Workflow Name</th>
                            <th className="p-2 border-b">ID</th>
                            <th className="p-2 border-b">Last Edited On</th>
                            <th className="p-2 border-b">Description</th>
                            <th className="p-2 border-b"></th>
                        </tr>
                    </thead>
                    <tbody className="w-100">
                        {paginatedWorkflows.map((workflow, index) => (
                            <tr key={index} className="table-body">
                                <td className="p-2 name">{workflow.name}</td>
                                <td className="p-2 id">{workflow.id}</td>
                                <td className="p-2 lastEdited">{convertToDate(workflow)}</td>
                                <td className="p-2 description">{workflow.description}</td>
                                <td className="p-2 d-flex justify-content-between">
                                    <img src={favorites.includes(workflow.id) ? "/assets/images/pinYellow.svg" : "/assets/images/pinWhite.svg"} className="me-2"
                                        onClick={() => {
                                            if (favorites.includes(workflow.id))
                                                setFavorites(favorites.filter(item => item !== workflow.id))
                                            else setFavorites([...favorites, workflow.id])
                                        }} />
                                    <button className="px-3 py-1 rounded me-2">Execute</button>
                                    <button className="px-3 py-1 rounded me-2" onClick={() => navigate("/workflowCreator", { state: workflow })}>Edit</button>
                                    <img src="/assets/images/edit.svg" className="me-2" />
                                    <img src="/assets/images/download.svg" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Component */}
            <Pagination totalPages={totalPages} currentPage={page} setPage={setPage} />
        </div>
    );
};

export default WorkflowTable;
