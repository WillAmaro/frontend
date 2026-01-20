"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation"; // 👈 para redirección
import { RootState } from "@/src/store/Store";

import AppLayout from "@/src/components/site/container/AppLayout";
import CustomThemeProvider from "../theme";
import { DrawerRoute, setRoutes } from "@/src/store/slices/DrawerSlices";
import { userService } from "@/src/services/api/UserService";

export default function Layout({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector((state: RootState) => state.user);

  // useEffect(() => {
  //   //  Redirigir al login si no hay token
  //   if (!user.token) {
  //     router.push("/login");
  //     return; // salimos para que no cargue nada más
  //   }

  //   const loadDrawerRoutes = async () => {
  //     if (!user.role_id) return;

  //     try {
  //       const response = await userService.getModulesByRole(
  //         user.role_id,
  //         user.token
  //       );

  //       if (!response.success) return;

  //       const mapDrawerRoutes = (modules: any[]): DrawerRoute[] =>
  //         modules.map((m, index) => ({
  //           id: index + 1,
  //           label: m.label,
  //           path: m.path,
  //           icon: m.icon,
  //           children:
  //             m.children && m.children.length > 0
  //               ? mapDrawerRoutes(m.children)
  //               : undefined,
  //         }));

  //       const drawerRoutes = mapDrawerRoutes(response.data);
  //       dispatch(setRoutes(drawerRoutes));
  //     } catch (err) {
  //       console.error("Error cargando rutas del drawer:", err);
  //     }
  //   };

  //   loadDrawerRoutes();
  // }, [dispatch, router, user.token, user.role_id]);

  return (
    <CustomThemeProvider>
      <AppLayout mode={undefined} setMode={undefined}>
        {children}
      </AppLayout>
    </CustomThemeProvider>
  );
}