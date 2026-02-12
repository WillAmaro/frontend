"use client";

import { useState } from "react";
import { Box, Fade, Slide } from "@mui/material";
import ModernLogin from "./login/Login";
import Register from "./register/Register";

export default function ModernAuthentication() {
  const [view, setView] = useState<"login" | "register">("login");

  const onSwitchRegister = () => {
    setView("register");
  };

  const onSwitchLogin = () => {
    setView("login");
  };

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow:"auto",
        
      }}
    >
      {/* Login View */}
      <Fade
        in={view === "login"}
        timeout={500}
        style={{
          position: view === "login" ? "relative" : "absolute",
          width: "100%",
          height: "100%",
          zIndex: view === "login" ? 1 : 0,
          // margin:5
        }}
        unmountOnExit
      >
        <Box >
          <ModernLogin  />
        </Box>
      </Fade>

      {/* Register View */}
      {/* <Fade
        in={view === "register"}
        timeout={500}
        style={{
          position: view === "register" ? "relative" : "absolute",
          width: "100%",
          height: "100%",
          zIndex: view === "register" ? 1 : 0,
        }}
        unmountOnExit
      >
        <Box>
          <Register onSwitch={onSwitchLogin} />
        </Box>
      </Fade> */}
    </Box>
  );
}