// components/DrawerMenu.tsx
"use client";

import { JSX, useState } from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useTheme } from "@mui/material";
import { usePathname } from "next/navigation";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import ReportIcon from "@mui/icons-material/Report";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import MiscellaneousServicesIcon from "@mui/icons-material/MiscellaneousServices";
import { useSelector } from "react-redux";
import { RootState } from "@/src/store/Store";
import React from "react";

export type MenuItem = {
  label: string;
  path: string;
  icon?: React.ElementType;
  children?: MenuItem[];
  badge?: string;
};

export const iconMap: Record<string, JSX.Element> = {
  home: <HomeIcon />,
  users: <PersonIcon />,
  settings: <SettingsIcon />,
  report: <ReportIcon />,
  truck: <LocalShippingIcon />,
  service: <MiscellaneousServicesIcon />,
};

// config/menuConfig.tsx
export const menuConfig: MenuItem[] = [
  { label: "Inicio", path: "/", icon: HomeIcon },
  {
    label: "Usuarios",
    path: "/usuarios",
    icon: PersonIcon,
  },
  {
    label: "Roles",
    path: "/roles",
    icon: ReportIcon,
  },
  {
    label: "Servicios",
    path: "/servicios",
    icon: MiscellaneousServicesIcon,
    children: [
      { label: "Asignar Servicios", path: "/servicios/asignar-servicios" },
      { label: "Mis Servicios", path: "/servicios/mis-servicios" },
    ],
  },
  { label: "Configuración", path: "/settings", icon: SettingsIcon },
];

function MenuItemComponent({
  item,
  level = 0,
}: {
  item: MenuItem;
  level?: number;
}) {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const pathname = usePathname();

  const hasChildren = item.children && item.children.length > 0;
  const isActive =
    pathname === item.path || pathname.startsWith(item.path + "/");

  const hasActiveChild = (children: MenuItem[]): boolean => {
    return children.some(
      (child) =>
        pathname === child.path ||
        pathname.startsWith(child.path + "/") ||
        (child.children ? hasActiveChild(child.children) : false)
    );
  };

  const shouldOpenInitially = hasChildren && hasActiveChild(item.children!);

  const [initialized, setInitialized] = useState(false);
  if (shouldOpenInitially && !initialized) {
    setOpen(true);
    setInitialized(true);
  }

  const handleClick = () => {
    if (hasChildren) {
      setOpen((prev) => !prev);
    } else if (item.path) {
      window.location.href = item.path;
    }
  };

  const IconComponent = item.icon
    ? iconMap[item.icon as keyof typeof iconMap]
    : null;
  const paddingLeft = level === 0 ? "16px" : `${24 + level * 16}px`;

  return (
    <div className="w-full">
      {/* Menu Item */}
      <div
        onClick={handleClick}
        className={`
          relative flex items-center justify-between w-full cursor-pointer
          transition-all duration-200 ease-in-out group
          ${level === 0 ? "mx-3 rounded-lg" : "mx-0"}
          ${
            isActive
              ? "bg-purple-50 text-purple-700 border-r-3 border-purple-700"
              : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
          }
        `}
        style={{
          paddingLeft,
          paddingRight: "16px",
          paddingTop: "12px",
          paddingBottom: "12px",
          minHeight: "44px",
        }}
      >
        {/* Active Indicator */}
        {isActive && level === 0 && (
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-purple-700 rounded-r-lg" />
        )}

        <div className="flex items-center gap-3 flex-1 min-w-0">
          {/* Icon */}
          {IconComponent && level === 0 && (
            <div
              className={`
              flex-shrink-0 w-5 h-5 flex items-center justify-center
              ${
                isActive
                  ? "text-purple-700"
                  : "text-gray-500 group-hover:text-gray-700"
              }
            `}
            >
              <span>{IconComponent}</span>
            </div>
          )}

          {/* Dot for children */}
          {level > 0 && (
            <div
              className={`
              flex-shrink-0 w-2 h-2 rounded-full
              ${
                isActive
                  ? "bg-purple-700"
                  : "bg-gray-300 group-hover:bg-gray-400"
              }
            `}
            />
          )}

          {/* Label */}
          <span
            className={`
            font-medium text-sm truncate
            ${
              isActive
                ? "text-purple-700"
                : "text-gray-700 group-hover:text-gray-900"
            }
          `}
          >
            {item.label}
          </span>

          {/* Badge */}
          {item.badge && (
            <span className="flex-shrink-0 px-2 py-0.5 text-xs font-medium bg-red-100 text-red-600 rounded-full">
              {item.badge}
            </span>
          )}
        </div>

        {/* Expand/Collapse Icon */}
        {hasChildren && (
          <div
            className={`
            flex-shrink-0 ml-2 transition-transform duration-200
            ${open ? "transform rotate-90" : ""}
            ${
              isActive
                ? "text-purple-700"
                : "text-gray-400 group-hover:text-gray-600"
            }
          `}
          >
            <KeyboardArrowRightIcon sx={{ fontSize: 16 }} />
          </div>
        )}
      </div>

      {/* Children */}
      {hasChildren && (
        <div
          className={`
            overflow-hidden transition-all duration-300 ease-in-out
            ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}
          `}
        >
          <div className="py-1">
            {item.children!.map((child) => (
              <MenuItemComponent
                key={child.path}
                item={child}
                level={level + 1}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export const DrawerMenu = React.memo(function DrawerMenu() {
  const drawer = useSelector((state: RootState) => state.drawer);
  
  // const routes = [
  //   {
  //     id: 1,
  //     label: "Logistica",
  //     path: "",
  //     children: [
  //       {
  //         id: 1,
  //         label: "Altas",
  //         path: "",
  //         children: [
  //           {
  //             id: 1,
  //             label: "Kardex",
  //             path: "/logistica/altas/kardex",
  //           },
  //           {
  //             id: 2,
  //             label: "Abastecimiento",
  //             path: "/logistica/altas/solicitud-abastecimiento",
  //           },
  //           {
  //             id: 3,
  //             label: "Recepción Materiales",
  //             path: "/logistica/altas/gestion-materiales",
  //           },
  //           {
  //             id: 4,
  //             label: "Despacho cuadrillas",
  //             path: "/logistica/altas/despacho-cuadrillas",
  //           },
  //            {
  //             id: 5,
  //             label: "Liquidación",
  //             path: "/logistica/altas/liquidacion",
  //           },
  //             {
  //             id: 6,
  //             label: "Gestion SOT",
  //             path: "/logistica/altas/gestion-sot",
  //           },
  //              {
  //             id: 7,
  //             label: "Mis liquidaciones",
  //             path: "/logistica/altas/mis-liquidaciones",
  //           }
  //         ],
  //       },
  //     ],
  //   },
  // ];
  return (
    <nav className="flex flex-col gap-1 w-full py-2">
      {drawer.routes.map((item,index) => (
        <MenuItemComponent key={`${item.path}-${index}`} item={item} />
      ))}
    </nav>
  );
});
