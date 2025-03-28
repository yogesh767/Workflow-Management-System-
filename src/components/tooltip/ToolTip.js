import React, { useEffect, useState } from "react";
import { Button, Form, Overlay, Tooltip } from "react-bootstrap";

const NewOverlay = ({ index, setshow, show, addNode, target }) => {
  const [nodeType, setNodeType] = useState(null)
  const [nodeData, setNodeData] = useState({})

  useEffect(()=>{
    return()=>{
      setNodeType(null);
      setNodeData({})
    }
  },[])
  return (
    <>
      <Overlay target={target.current} show={show} placement="right">
        {({
          placement: _placement,
          arrowProps: _arrowProps,
          show: _show,
          popper: _popper,
          hasDoneInitialMeasure: _hasDoneInitialMeasure,
          ...props
        }) => (
          <div
            {...props}
            className="tooltip"
            style={{
              position: 'absolute',
              backgroundColor: 'white',
              padding: "20px",
              color: 'black',
              borderRadius: 3,
              ...props.style,
              left: "80px",
              width: "300px"
            }}
          >
            {nodeType !== null ?
              <>
                {nodeType === "Api Call" ? <React.Fragment className="p-5">
                  <Form.Group className="mt-2">
                    <Form.Label>Method</Form.Label>
                    <Form.Select value={nodeData?.method}>
                      <option value="GET">GET</option>
                      <option value="POST">POST</option>
                      <option value="PUT">PUT</option>
                      <option value="DELETE">DELETE</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group className="mt-2">
                    <Form.Label>URL</Form.Label>
                    <Form.Control type="text" placeholder="Enter API URL..." value={nodeData?.URL} onChange={(e) => setNodeData({ ...nodeData, URL: e.target.value })} />
                  </Form.Group>
                  <Form.Group className="mt-2">
                    <Form.Label>Headers</Form.Label>
                    <Form.Control type="text" placeholder="Enter API Headers..." value={nodeData?.Headers} onChange={(e) => setNodeData({ ...nodeData, Headers: e.target.value })} />
                  </Form.Group>

                  <Form.Group className="mt-2">
                    <Form.Label>Body</Form.Label>
                    <Form.Control as="textarea" rows={3} placeholder="Enter API body..." value={nodeData?.Body} onChange={(e) => setNodeData({ ...nodeData, Body: e.target.value })} />
                  </Form.Group>
                  <Button className="mt-4 me-4" onClick={() => {
                    setshow(false);
                    addNode(index, nodeType, nodeData)
                  }}>Add</Button>
                  <Button variant="danger" className="mt-4" onClick={() => setNodeType(null)}>Change type</Button>
                </React.Fragment> :
                  nodeType === "Email" ? <React.Fragment>
                    <Form.Group className="mt-2">
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" placeholder="Enter email..." value={nodeData?.Email} onChange={(e) => setNodeData({ ...nodeData, Email: e.target.value })} />
                    </Form.Group>
                    <Button className="mt-4 me-4" onClick={() => {
                      setshow(false);
                      addNode(index, nodeType, nodeData)
                    }}>Add</Button>
                    <Button variant="danger" className="mt-4" onClick={() => setNodeType(null)}>Change type</Button>
                  </React.Fragment> :
                    <React.Fragment>
                      <Form.Group className="mt-2">
                        <Form.Label>Message</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Enter Memage..." value={nodeData?.Message} onChange={(e) => setNodeData({ ...nodeData, Message: e.target.value })} />
                      </Form.Group>
                      <Button className="mt-4 me-4" onClick={() => {
                        setshow(false);
                        addNode(index, nodeType, nodeData)
                      }}>Add</Button>
                      <Button variant="danger" className="mt-4" onClick={() => setNodeType(null)}>Change type</Button>
                    </React.Fragment>
                }

              </> :

              <>
                <div className="mt-2">
                  <button className="rounded me-2" onClick={() => {
                    setNodeType("Api Call")
                  }}> Api Call</button>
                  <button className="rounded" onClick={() => {
                    setNodeType("Email")
                  }}> Email</button>
                </div>
                <div className="mt-2 mb-2">
                  <button className="rounded" onClick={() => {
                    setNodeType("Text box")
                  }} > Text box</button>
                </div>

                <div className="mt-2 mb-2">
                  <button className="rounded" onClick={() => {
                    setshow(false);
                  }} > Cancel</button>
                </div>
              </>

            }




          </div>
        )}

      </Overlay>
    </>
  )
}
export default NewOverlay