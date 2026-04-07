"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const exchangeCode = async () => {
      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");

      if (!code) return;

      const codeVerifier = localStorage.getItem("pkce_code_verifier");

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_COGNITO_DOMAIN}/oauth2/token`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              grant_type: "authorization_code",
              client_id: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!,
              code,
              redirect_uri: process.env.NEXT_PUBLIC_COGNITO_REDIRECT_URI!,
              code_verifier: codeVerifier!,
            }),
          }
        );

        const data = await res.json();

        if (data.error) throw new Error(data.error_description);

        // 🔥 Tokens
        const { access_token, id_token, refresh_token } = data;

        // 👉 Guardar tokens (puedes usar Redux aquí)
        localStorage.setItem("access_token", access_token);
        localStorage.setItem("id_token", id_token);
        localStorage.setItem("refresh_token", refresh_token);

        // 👉 (Opcional) decodificar usuario
        const payload = JSON.parse(atob(id_token.split(".")[1]));
        const cognitoUserId = payload.sub;

        // 👉 Tu lógica actual
        // const sessionData = await authService.checkUserSession(cognitoUserId);

        router.push("/");
      } catch (err: any) {
        console.error(err);
        router.push("/login");
      }
    };

    exchangeCode();
  }, [router]);

  return <p>Autenticando...</p>;
}