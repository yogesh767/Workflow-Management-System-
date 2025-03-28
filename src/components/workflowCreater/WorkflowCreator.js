import React, { useCallback, useEffect, useRef, useState } from "react";
import "./workflowCreater.css";
import NewOverlay from "../tooltip/ToolTip";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Form, Modal } from "react-bootstrap";
import { db, doc, setDoc } from "../../utils/firebaseConfig";
import { v4 as uuidv4 } from "uuid";
import { Timestamp, updateDoc } from "firebase/firestore";


const initialNodes = [
    { data: { label: "Start" } },
    { data: { label: "End" } },
];

const WorkflowCreator = () => {
    const data = useLocation().state
    const navigate = useNavigate();
    const [nodes, setNodes] = useState(initialNodes);
    const [visibleTooltip, setVisibleTooltip] = useState(null);
    const [modalShow, setModalShow] = useState(false);
    const [description, setDescription] = useState()
    const [workflowName, setWorkflowName] = useState()
    let [id, setId] = useState(null)
    const nodeRefs = useRef({});

    useEffect(() => {
        if (data) {
            setWorkflowName(data.name || "");
            setDescription(data.description || "");
            setNodes(data.nodes || []);
            setId(data.id || null);
        }

    }, [data])
    // 🔹 Zoom State
    const [zoomLevel, setZoomLevel] = useState(1);
    const containerRef = useRef(null);

    // 🔹 Handle Zoom
    const handleZoom = (factor) => {
        let newZoom = Math.max(0.5, Math.min(zoomLevel + factor, 2)); // Limits zoom between 50% and 200%
        setZoomLevel(newZoom);

        if (containerRef.current) {
            containerRef.current.style.transform = `scale(${newZoom})`;
            containerRef.current.style.transformOrigin = "center center";
        }
    };


    const addNode = (index, label, data) => {
        let newNodes = [...nodes];
        newNodes.splice(index, 0, { data: { label, ...data } });
        setNodes(newNodes);
        setVisibleTooltip(null);
    };


    const deleteNode = (index) => {
        setNodes(nodes.filter((_, _i) => index !== _i));
    };


    const saveWorkflowToFirebase = async (name, desc) => {
        setModalShow(false);

        if (!name?.length) {
            alert("Please enter a workflow name.");
            return;
        }

        if (nodes.length === 2) {
            alert("Please add nodes to the workflow before saving.");
            return;
        }

        try {
            if (id) {
                const workflowRef = doc(db, "workflows", id);
                await updateDoc(workflowRef, {
                    id,
                    nodes,
                    name,
                    description: desc,
                    timestamp: Timestamp.fromDate(new Date()),
                });

                console.log("Workflow updated successfully:", id);
                navigate("/workFlowTable");
            } else {
                const workflowId = uuidv4();
                const workflowRef = doc(db, "workflows", workflowId);

                await setDoc(workflowRef, {
                    id: workflowId,
                    nodes,
                    name,
                    description: desc,
                    timestamp: Timestamp.fromDate(new Date()),
                });

                console.log("Workflow saved with ID:", workflowId);
                setId(workflowId);
                navigate("/workFlowTable");
            }
        } catch (error) {
            console.error("Error saving workflow:", error);
        }
    };



    const openModal = () => {
        setModalShow(true);
    }


    const MyVerticallyCenteredModal = useCallback(function ({ 
        show, 
        onHide, 
        workflowName, 
        setWorkflowName, 
        description, 
        setDescription, 
        saveWorkflowToFirebase 
    }) {
        return (
            <Modal show={show} onHide={onHide} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">Save your workflow</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <Form.Group className="mb-3 col-6">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter workflow name..."
                                value={workflowName}
                                onChange={(e) => setWorkflowName(e.target.value)}
                            />
                        </Form.Group>
    
                        <Form.Group className="mb-3">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                placeholder="Enter description..."
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Form.Group>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={saveWorkflowToFirebase} variant="danger">
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }, []);
    


    return (
        <div className="container_new">
            <div className="header">
                <button className="back-button" onClick={() => navigate("/workFlowTable")}>
                    ← Go Back
                </button>
                <span className="title me-3">Workflow Creator - CREATE NEW PROCESS</span>
                {nodes.length && <img src="/assets/images/save.svg" onClick={openModal} />}
            </div>


            <div className="workflow-container d-flex justify-content-center align-items-center flex-column" ref={containerRef}>
                {nodes.map((item, index) => {
                    if (!nodeRefs.current[index]) {
                        nodeRefs.current[index] = React.createRef();
                    }

                    return (
                        <React.Fragment key={index}>
                            {item.data.label !== "Start" && (
                                <>
                                    <NewOverlay
                                        index={index}
                                        setshow={() => setVisibleTooltip(null)}
                                        show={visibleTooltip === index}
                                        target={nodeRefs.current[index]}
                                        addNode={addNode}
                                    />
                                    <img
                                        src="/assets/images/add.svg"
                                        className="me-2"
                                        ref={nodeRefs.current[index]}
                                        onClick={() => setVisibleTooltip(visibleTooltip === index ? null : index)}
                                    />
                                </>
                            )}

                            {item.data.label === "Start" ? (
                                <img src="/assets/images/start.svg" className="me-2" />
                            ) : item.data.label === "End" ? (
                                <img src="/assets/images/end.svg" className="me-2" />
                            ) : (
                                <div className="existing">
                                    {item.data.label}{" "}
                                    <img src="/assets/images/delete.svg" onClick={() => deleteNode(index)} />
                                </div>
                            )}
                        </React.Fragment>
                    );
                })}
            </div>

            <div className="zoom-controls">
            <img src="/assets/images/zoom.svg" />
                <button onClick={() => handleZoom(-0.1)}>-</button>
                <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.1"
                    value={zoomLevel}
                    onChange={(e) => handleZoom(parseFloat(e.target.value) - zoomLevel)}
                />
                <button onClick={() => handleZoom(0.1)}>+</button>
            </div>

            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                workflowName={workflowName}
                setWorkflowName={setWorkflowName}
                description={description}
                setDescription={setDescription}
                saveWorkflowToFirebase={() => saveWorkflowToFirebase(workflowName, description)}
            />

        </div>
    );
};

export default WorkflowCreator;
