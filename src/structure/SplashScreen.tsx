import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

const SplashScreen: React.FC = () => {
  const styleWrapper: React.CSSProperties = {
    textAlign: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  return (
    <div style={styleWrapper}>
      <CircularProgress color="primary" />
    </div>
  );
};

export default SplashScreen;
