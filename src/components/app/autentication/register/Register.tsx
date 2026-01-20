"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../../../../store/slices/UserSlice";
import { AppDispatch } from "@/src/store/Store";
import ButtonBase from "@/src/components/base/ButtonBase";
import { userService } from "@/src/services/api/UserService";
import TextFieldBase from "@/src/components/base/TextfieldBase";

type RegisterProps ={
    onSwitch : () => void;
}

export default function Register({onSwitch}:RegisterProps) {
  const dispatch = useDispatch<AppDispatch>();

  //  Estado para manejar los datos del registro
  const [userRegister, setUserRegister] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    role_id: 1,
  });

  const handleChange = (
    field: keyof typeof userRegister,
    value: string | number
  ) => {
    setUserRegister((prev) => ({
      ...prev,
      [field]: String(value),
    }));
  };

  const handleRegister = async () => {
    try {
      // const response = await userService.register(userRegister);

      // dispatch(
      //   setUser({
      //     name: response.user.name,
      //     lastName: "", // si tu API lo manda, lo agregas
      //     phone: "", // si tu API lo manda, lo agregas
      //     role: response.user.role_id.toString(),
      //     token: response.token,
      //     refreshToken: "", // si manejas refresh lo agregas aquí
      //   })
      // );

      // console.log("✅ Registro exitoso:", response);
    } catch (error) {
      console.error("❌ Error en registro:", error);
      alert("Error al registrar usuario");
    }
  };

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      {/* Imagen de fondo global */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: "url('/puerto-embarque.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 0,
        }}
      ></div>

      {/* Panel izquierdo sin blur */}
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Puedes poner un logo o dejar vacío */}
      </div>

      {/* Panel derecho con blur progresivo */}
      <div
        style={{
          flex: 1,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          padding: "2rem",
          overflow: "auto",
          zIndex: 1,
          justifyContent: "center",
        }}
      >
        {/* Capa de blur progresivo con degradado */}
        <div
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "100%",
            height: "100%",
            backdropFilter: "blur(10px)",
            background:
              "linear-gradient(to right, rgba(45, 11, 11, 0.25), rgba(255,255,255,0))",
            zIndex: 0,
          }}
        ></div>

        {/* Contenido encima del blur */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            width: "100%",
            justifyContent: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
              width: "400px",
            }}
          >
            <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>
              Registro
            </h2>

            <TextFieldBase
              label="Nombre"
              value={userRegister.name}
              onChange={(value) => handleChange("name", value)}
            />
            <TextFieldBase
              label="Correo Electrónico"
              value={userRegister.email}
              onChange={(value) => handleChange("email", value)}
            />
            <TextFieldBase
              label="Contraseña"
              type="password"
              value={userRegister.password}
              onChange={(value) => handleChange("password", value)}
            />
            <TextFieldBase
              label="Confirmar Contraseña"
              type="password"
              value={userRegister.password_confirmation}
              onChange={(value) =>
                handleChange("password_confirmation", value)
              }
            />

            <ButtonBase label={"Registrarse"} onClick={handleRegister} />

            <div
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <span>
                ¿Ya tienes una cuenta? <strong onClick={onSwitch}>Inicia sesión aquí</strong>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}