import React from "react";

const Footer = () => {
  const style = {
    backgroundColor: "#ffc2c2",
    borderTop: "1px solid #E7E7E7",
    textAlign: "center",
    padding: "20px",
    position: "fixed",
    left: "0",
    bottom: "0",
    height: "60px",
    width: "100%",
  };

  const invisible = {
    display: "block",
    padding: "20px",
    height: "60px",
    width: "100%",
  };

  return (
    <div>
      <div style={invisible}>
        <div style={style}>
          <span>From pet parents to you</span>
          <button>delete account</button>
        </div>
      </div>
    </div>
  );
};

export default Footer;
