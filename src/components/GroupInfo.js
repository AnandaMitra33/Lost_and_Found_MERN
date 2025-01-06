import React from "react";

const GroupInfo = () => {
  const groupInfoStyle = {
    backgroundColor: "#f0f0f0",
    padding: "20px",
    borderRadius: "5px",
    maxWidth: "96%",
    marginTop: "auto",
  };

  const groupTitleStyle = {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "10px",
  };

  const memberListStyle = {
    listStyleType: "none",
    padding: 0,
  };

  const memberItemStyle = {
    margin: "10px 0",
  };

  return (
    <div style={groupInfoStyle}>
      <h2 style={groupTitleStyle}>Group 10:</h2>
      <ul style={memberListStyle}>
        <li style={memberItemStyle}>
          Ananda Mitra (21101268) -{" "}
          <a href="ananda.mitra@g.bracu.ac.bd">
          ananda.mitra@g.bracu.ac.bd
          </a>
        </li>
        <li style={memberItemStyle}>
          Sadman Zahin (21101100) -{" "}
          <a href="sadman.zahin@g.bracu.ac.bd">
          sadman.zahin@g.bracu.ac.bd
          </a>
        </li>
        <li style={memberItemStyle}>
          AL Mamunur Rashid Emon (19301146) -{" "}
          <a href="al.mamunur.rashid.emon@g.bracu.ac.bd">
          al.mamunur.rashid.emon@g.bracu.ac.bd
          </a>
        </li>
        <li style={memberItemStyle}>
          Umma Faria Rahman (id mone nai) -{" "}
          <a href="umma.faria.rahman@g.bracu.ac.bd">
          umma.faria.rahman@g.bracu.ac.bd
          </a>
        </li>
      </ul>
    </div>
  );
};

export default GroupInfo;
