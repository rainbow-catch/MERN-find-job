import React from "react";
import "../../styles/ErrorComponent.css";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
export default function ErrorComponent() {
  const navigate = useNavigate();
  return (
    <>
      <div className="error-component-div">
        <h2>Sorry, can't find anything at this address</h2>
      </div>
      <div className="error-component-div">
        <Button onClick={()=>navigate('/')}>GO TO MAIN PAGE</Button>
      </div>
    </>
  );
}
