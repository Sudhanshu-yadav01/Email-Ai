import React from "react";
import Amongus from "./Amongus";
import Linkedin from "./Linkedin";

const Navbar = () => {
  return (
    <>
      
    
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "10px",
        
        height: "60px",
      }}
    >
      <div style={{height: "100%", display: "flex", alignItems: "center"}}>
        <Amongus />
      </div>
    </div>
    </>
  );
};

export default Navbar;
