// // 'use client'

// // import React, { useState } from "react";
// // import {
// //   Smartphone,
// //   Users,
// //   Car,
// //   FileText,
// //   MapPin,
// //   Camera,
// //   MessageSquare,
// //   Bell,
// //   CheckCircle,
// //   Clock,
// //   AlertTriangle,
// //   ChevronRight,
// //   Settings,
// //   Shield,
// //   Database,
// //   Cloud,
// // } from "lucide-react";

// // // Componente Principal
// // function PresentacionMVP() {
// //   const [activeTab, setActiveTab] = useState("resumen");

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
// //       {/* Header */}
// //       <header className="bg-white shadow-lg">
// //         <div className="max-w-7xl mx-auto px-4 py-6">
// //           <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
// //             <Smartphone className="text-blue-600" size={40} />
// //             MVP - Sistema de Gestión de Incidencias Vehiculares
// //           </h1>
// //           <p className="text-gray-600 mt-2">
// //             Presentación Técnica del Proyecto
// //           </p>
// //         </div>
// //       </header>

// //       {/* Navegación por Tabs */}
// //       <nav className="bg-white shadow-sm sticky top-0 z-10">
// //         <div className="max-w-7xl mx-auto px-4">
// //           <div className="flex space-x-1 overflow-x-auto">
// //             {[
// //               { id: "resumen", label: "Resumen", icon: FileText },
// //               { id: "timeline", label: "Timeline", icon: Clock },
// //               { id: "roles", label: "Roles", icon: Users },
// //               { id: "flujos", label: "Flujos", icon: ChevronRight },
// //               { id: "arquitectura", label: "Arquitectura", icon: Database },
// //               { id: "stack", label: "Stack", icon: Cloud },
// //               { id: "comparativa", label: "Comparativa", icon: CheckCircle },
// //             ].map((tab) => {
// //               const Icon = tab.icon;
// //               return (
// //                 <button
// //                   key={tab.id}
// //                   onClick={() => setActiveTab(tab.id)}
// //                   className={`flex items-center gap-2 px-6 py-4 font-medium transition-all ${
// //                     activeTab === tab.id
// //                       ? "border-b-4 border-blue-600 text-blue-600"
// //                       : "text-gray-600 hover:text-gray-900"
// //                   }`}
// //                 >
// //                   <Icon size={20} />
// //                   {tab.label}
// //                 </button>
// //               );
// //             })}
// //           </div>
// //         </div>
// //       </nav>

// //       {/* Contenido */}
// //       <main className="max-w-7xl mx-auto px-4 py-8">
// //         {activeTab === "resumen" && <ResumenTab />}
// //         {activeTab === "timeline" && <TimelineTab />}
// //         {activeTab === "roles" && <RolesTab />}
// //         {activeTab === "flujos" && <FlujosTab />}
// //         {activeTab === "arquitectura" && <ArquitecturaTab />}
// //         {activeTab === "stack" && <StackTab />}
// //         {activeTab === "comparativa" && <ComparativaTab />}
// //       </main>
// //     </div>
// //   );
// // }

// // // Tab: Resumen
// // function ResumenTab() {
// //   return (
// //     <div className="space-y-6 animate-fade-in">
// //       <div className="bg-white rounded-xl shadow-lg p-8">
// //         <h2 className="text-3xl font-bold text-gray-900 mb-4">
// //           📋 Resumen Ejecutivo
// //         </h2>
// //         <div className="prose max-w-none">
// //           <p className="text-lg text-gray-700 mb-4">
// //             Aplicación móvil desarrollada en{" "}
// //             <strong>Expo (React Native)</strong> para la gestión integral de
// //             incidencias vehiculares con dos roles principales:{" "}
// //             <strong>Cliente</strong> y <strong>Operario</strong>.
// //           </p>

// //           <div className="grid md:grid-cols-2 gap-6 mt-6">
// //             <div className="bg-blue-50 p-6 rounded-lg">
// //               <h3 className="text-xl font-semibold text-blue-900 mb-3 flex items-center gap-2">
// //                 <Users size={24} />
// //                 Actores del Sistema
// //               </h3>
// //               <ul className="space-y-2 text-gray-700">
// //                 <li>
// //                   <strong>Cliente:</strong> Reporta y da seguimiento a
// //                   incidencias
// //                 </li>
// //                 <li>
// //                   <strong>Operario:</strong> Atiende y resuelve incidencias
// //                 </li>
// //               </ul>
// //             </div>

// //             <div className="bg-green-50 p-6 rounded-lg">
// //               <h3 className="text-xl font-semibold text-green-900 mb-3 flex items-center gap-2">
// //                 <CheckCircle size={24} />
// //                 Características Clave
// //               </h3>
// //               <ul className="space-y-2 text-gray-700">
// //                 <li>✅ Múltiples vehículos y pólizas</li>
// //                 <li>✅ Geolocalización GPS</li>
// //                 <li>✅ Notificaciones Push (FCM)</li>
// //                 <li>✅ Timeline de estados</li>
// //               </ul>
// //             </div>
// //           </div>
// //         </div>
// //       </div>

// //       <div className="grid md:grid-cols-3 gap-6">
// //         <StatCard
// //           title="Estimación Total"
// //           value="10-14 semanas"
// //           subtitle="Con 2 desarrolladores"
// //           icon={Clock}
// //           color="blue"
// //         />
// //         <StatCard
// //           title="Pantallas Cliente"
// //           value="12-15"
// //           subtitle="Pantallas principales"
// //           icon={Smartphone}
// //           color="green"
// //         />
// //         <StatCard
// //           title="Pantallas Operario"
// //           value="8-10"
// //           subtitle="Pantallas principales"
// //           icon={Users}
// //           color="purple"
// //         />
// //       </div>
// //     </div>
// //   );
// // }

// // // Tab: Timeline
// // function TimelineTab() {
// //   const fases = [
// //     {
// //       fase: "Setup Inicial",
// //       duracion: "1-2 días",
// //       items: [
// //         "Configuración Expo",
// //         "Estructura de carpetas",
// //         "Firebase setup",
// //         "Navegación base",
// //       ],
// //       color: "blue",
// //     },
// //     {
// //       fase: "Autenticación y Roles",
// //       duracion: "2-3 días",
// //       items: [
// //         "Login/Registro",
// //         "Firebase Auth",
// //         "Sistema de roles",
// //         "Guards de navegación",
// //       ],
// //       color: "green",
// //     },
// //     {
// //       fase: "Frontend Cliente",
// //       duracion: "27-36 días",
// //       items: [
// //         "Perfil y gestión",
// //         "Vehículos y pólizas",
// //         "Registro de incidencia",
// //         "Lista y detalles",
// //       ],
// //       color: "purple",
// //     },
// //     {
// //       fase: "Frontend Operario",
// //       duracion: "26-35 días",
// //       items: [
// //         "Dashboard 3 tabs",
// //         "Pool de incidencias",
// //         "Gestión de estados",
// //         "Comentarios y mapas",
// //       ],
// //       color: "orange",
// //     },
// //     {
// //       fase: "Integración",
// //       duracion: "14-21 días",
// //       items: [
// //         "Componentes compartidos",
// //         "Notificaciones FCM",
// //         "Testing E2E",
// //         "Optimización",
// //       ],
// //       color: "red",
// //     },
// //   ];

// //   return (
// //     <div className="space-y-6 animate-fade-in">
// //       <div className="bg-white rounded-xl shadow-lg p-8">
// //         <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
// //           <Clock size={32} />
// //           Timeline del Proyecto
// //         </h2>

// //         <div className="relative">
// //           <div className="absolute left-8 top-0 bottom-0 w-1 bg-gray-200"></div>

// //           <div className="space-y-8">
// //             {fases.map((fase, index) => (
// //               <div key={index} className="relative pl-20">
// //                 <div
// //                   className={`absolute left-4 w-9 h-9 rounded-full bg-${fase.color}-500 flex items-center justify-center text-white font-bold shadow-lg`}
// //                 >
// //                   {index + 1}
// //                 </div>

// //                 <div
// //                   className={`bg-${fase.color}-50 rounded-lg p-6 shadow-md hover:shadow-xl transition-shadow`}
// //                 >
// //                   <div className="flex items-center justify-between mb-3">
// //                     <h3 className="text-xl font-bold text-gray-900">
// //                       {fase.fase}
// //                     </h3>
// //                     <span
// //                       className={`px-4 py-1 rounded-full bg-${fase.color}-200 text-${fase.color}-800 font-semibold text-sm`}
// //                     >
// //                       {fase.duracion}
// //                     </span>
// //                   </div>
// //                   <ul className="space-y-2">
// //                     {fase.items.map((item, i) => (
// //                       <li
// //                         key={i}
// //                         className="flex items-center gap-2 text-gray-700"
// //                       >
// //                         <ChevronRight
// //                           size={16}
// //                           className={`text-${fase.color}-600`}
// //                         />
// //                         {item}
// //                       </li>
// //                     ))}
// //                   </ul>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // // Tab: Roles
// // function RolesTab() {
// //   return (
// //     <div className="space-y-6 animate-fade-in">
// //       <div className="grid md:grid-cols-2 gap-6">
// //         {/* Cliente */}
// //         <div className="bg-white rounded-xl shadow-lg p-8">
// //           <div className="flex items-center gap-3 mb-6">
// //             <div className="bg-blue-100 p-3 rounded-full">
// //               <Users className="text-blue-600" size={32} />
// //             </div>
// //             <div>
// //               <h3 className="text-2xl font-bold text-gray-900">Cliente</h3>
// //               <p className="text-gray-600">Usuario que reporta incidencias</p>
// //             </div>
// //           </div>

// //           <div className="space-y-4">
// //             <Section title="Puede hacer:" icon={CheckCircle}>
// //               <ul className="space-y-2 text-gray-700">
// //                 <li>✅ Registrar incidencias vehiculares</li>
// //                 <li>✅ Gestionar múltiples vehículos y pólizas</li>
// //                 <li>✅ Ver estado de sus incidencias en tiempo real</li>
// //                 <li>✅ Recibir notificaciones de actualizaciones</li>
// //                 <li>✅ Cancelar incidencias (con justificación)</li>
// //                 <li>✅ Ver historial completo</li>
// //               </ul>
// //             </Section>

// //             <Section title="No puede hacer:" icon={AlertTriangle}>
// //               <ul className="space-y-2 text-gray-700">
// //                 <li>❌ Ver incidencias de otros clientes</li>
// //                 <li>❌ Cambiar estados (excepto cancelar)</li>
// //                 <li>❌ Asignarse operarios</li>
// //               </ul>
// //             </Section>
// //           </div>
// //         </div>

// //         {/* Operario */}
// //         <div className="bg-white rounded-xl shadow-lg p-8">
// //           <div className="flex items-center gap-3 mb-6">
// //             <div className="bg-green-100 p-3 rounded-full">
// //               <Shield className="text-green-600" size={32} />
// //             </div>
// //             <div>
// //               <h3 className="text-2xl font-bold text-gray-900">Operario</h3>
// //               <p className="text-gray-600">Personal que atiende incidencias</p>
// //             </div>
// //           </div>

// //           <div className="space-y-4">
// //             <Section title="Puede hacer:" icon={CheckCircle}>
// //               <ul className="space-y-2 text-gray-700">
// //                 <li>✅ Ver pool de incidencias disponibles</li>
// //                 <li>✅ Tomar/asignarse incidencias</li>
// //                 <li>✅ Cambiar estados de incidencias</li>
// //                 <li>✅ Agregar comentarios y actualizaciones</li>
// //                 <li>✅ Ver datos completos del cliente</li>
// //                 <li>✅ Marcar incidencias como resueltas</li>
// //                 <li>✅ Ver mapa con todas sus incidencias activas</li>
// //               </ul>
// //             </Section>

// //             <Section title="No puede hacer:" icon={AlertTriangle}>
// //               <ul className="space-y-2 text-gray-700">
// //                 <li>❌ Editar datos del cliente</li>
// //                 <li>❌ Eliminar incidencias</li>
// //                 <li>❌ Crear incidencias</li>
// //               </ul>
// //             </Section>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // // Tab: Flujos
// // function FlujosTab() {
// //   const [selectedFlow, setSelectedFlow] = useState<string>("");

// //   const flujos: any = {
// //     cliente_registra: {
// //       title: "Cliente Registra Incidencia",
// //       color: "blue",
// //       steps: [
// //         { icon: Smartphone, text: "Cliente abre la app y hace login" },
// //         { icon: Car, text: "Selecciona vehículo (si tiene múltiples)" },
// //         { icon: MapPin, text: "Confirma ubicación GPS automática" },
// //         { icon: Camera, text: "Toma fotos de evidencia (min 2)" },
// //         { icon: FileText, text: "Escribe descripción detallada" },
// //         { icon: Users, text: "[Opcional] Agrega datos de terceros" },
// //         { icon: CheckCircle, text: "Revisa resumen y confirma" },
// //         { icon: Cloud, text: "App sube fotos con barra de progreso" },
// //         { icon: Bell, text: 'Incidencia creada - Estado: "Registrada"' },
// //         { icon: Smartphone, text: "Cliente recibe confirmación" },
// //       ],
// //     },
// //     gestion_vehiculos: {
// //       title: "Gestión de Vehículos y Pólizas",
// //       color: "purple",
// //       steps: [
// //         { icon: Car, text: "Cliente va a Perfil > Mis Vehículos" },
// //         { icon: CheckCircle, text: "Ve lista de vehículos registrados" },
// //         { icon: FileText, text: "Tap en (+) para agregar nuevo vehículo" },
// //         { icon: Camera, text: "Completa datos: placa, marca, modelo, año" },
// //         { icon: Shield, text: "Asocia póliza al vehículo" },
// //         { icon: Cloud, text: "Sube documento de póliza (PDF)" },
// //         { icon: CheckCircle, text: "Sistema valida vigencia de póliza" },
// //         { icon: Bell, text: "Recibe alertas antes de vencimiento" },
// //       ],
// //     },
// //     operario_atiende: {
// //       title: "Operario Atiende Incidencia",
// //       color: "green",
// //       steps: [
// //         { icon: Smartphone, text: "Operario abre Dashboard" },
// //         {
// //           icon: AlertTriangle,
// //           text: 'Tab "Disponibles" > Ve pool de incidencias',
// //         },
// //         { icon: MapPin, text: "Selecciona incidencia cercana" },
// //         {
// //           icon: FileText,
// //           text: "Revisa detalle completo (cliente, fotos, ubicación)",
// //         },
// //         { icon: CheckCircle, text: 'Tap "Tomar incidencia" > Confirmación' },
// //         {
// //           icon: Bell,
// //           text: 'Estado → "Asignada" (cliente recibe notificación)',
// //         },
// //         { icon: Clock, text: 'Tap "Iniciar atención" → Estado: "En atención"' },
// //         { icon: MessageSquare, text: "Agrega comentarios y fotos de progreso" },
// //         {
// //           icon: Bell,
// //           text: "Cliente recibe notificaciones de actualizaciones",
// //         },
// //         { icon: CheckCircle, text: 'Tap "Marcar como resuelta"' },
// //         { icon: FileText, text: "Llena formulario de cierre + fotos finales" },
// //         { icon: CheckCircle, text: 'Estado → "Resuelta" (cliente notificado)' },
// //       ],
// //     },
// //   };

// //   return (
// //     <div className="space-y-6 animate-fade-in">
// //       <div className="bg-white rounded-xl shadow-lg p-8">
// //         <h2 className="text-3xl font-bold text-gray-900 mb-6">
// //           🔄 Flujos Principales
// //         </h2>

// //         <div className="grid md:grid-cols-3 gap-4 mb-8">
// //           {/* {Object.entries(flujos).map(([key, flow]) => (
// //             <button
// //               key={key}
// //               onClick={() => setSelectedFlow(key)}
// //               className={`p-6 rounded-lg border-2 transition-all hover:shadow-lg ${
// //                 selectedFlow === key 
// //                   ? `border-${flow.color}-500 bg-${flow.color}-50` 
// //                   : 'border-gray-200 hover:border-gray-300'
// //               }`}
// //             >
// //               <h3 className="font-bold text-lg text-gray-900">{flow.title}</h3>
// //             </button>
// //           ))} */}
// //           {Object.entries(flujos).map(([key, flow]: [string, any]) => (
// //             <button
// //               key={key}
// //               onClick={() => setSelectedFlow(key)}
// //               className={`p-6 rounded-lg border-2 transition-all hover:shadow-lg ${
// //                 selectedFlow === key
// //                   ? `border-${flow.color}-500 bg-${flow.color}-50`
// //                   : "border-gray-200 hover:border-gray-300"
// //               }`}
// //             >
// //               <h3 className="font-bold text-lg text-gray-900">{flow.title}</h3>
// //             </button>
// //           ))}
// //         </div>

// //         {selectedFlow && (
// //           <div className="animate-fade-in">
// //             <h3 className="text-2xl font-bold text-gray-900 mb-6">
// //               {flujos[selectedFlow].title}
// //             </h3>
// //             <div className="relative">
// //               <div className="absolute left-6 top-0 bottom-0 w-1 bg-gray-200"></div>

// //               <div className="space-y-4">
// //                 {flujos[selectedFlow].steps.map((step: any, index: number) => {
// //                   const StepIcon = step.icon;
// //                   return (
// //                     <div
// //                       key={index}
// //                       className="relative pl-16 flex items-start gap-4"
// //                     >
// //                       <div
// //                         className={`absolute left-2 w-9 h-9 rounded-full bg-${flujos[selectedFlow].color}-500 flex items-center justify-center shadow-lg z-10`}
// //                       >
// //                         <StepIcon className="text-white" size={20} />
// //                       </div>
// //                       <div className="flex-1 bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
// //                         <p className="text-gray-900 font-medium">{step.text}</p>
// //                       </div>
// //                     </div>
// //                   );
// //                 })}
// //               </div>
// //             </div>
// //           </div>
// //         )}

// //         {!selectedFlow && (
// //           <div className="text-center text-gray-500 py-12">
// //             <ChevronRight size={48} className="mx-auto mb-4 opacity-50" />
// //             <p>Selecciona un flujo para ver el detalle paso a paso</p>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // // Tab: Arquitectura
// // function ArquitecturaTab() {
// //   return (
// //     <div className="space-y-6 animate-fade-in">
// //       <div className="bg-white rounded-xl shadow-lg p-8">
// //         <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
// //           <Database size={32} />
// //           Arquitectura de la Aplicación
// //         </h2>

// //         <div className="space-y-8">
// //           <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8">
// //             <div className="flex flex-col items-center space-y-6">
// //               <div className="w-full max-w-2xl">
// //                 <h3 className="text-center font-bold text-lg mb-4">
// //                   📱 Aplicación Móvil (Expo)
// //                 </h3>
// //                 <div className="grid grid-cols-2 gap-4">
// //                   <div className="bg-blue-100 p-4 rounded-lg text-center">
// //                     <Users className="mx-auto mb-2 text-blue-600" size={32} />
// //                     <p className="font-bold">Cliente Stack</p>
// //                     <p className="text-sm text-gray-600">12-15 pantallas</p>
// //                   </div>
// //                   <div className="bg-green-100 p-4 rounded-lg text-center">
// //                     <Shield className="mx-auto mb-2 text-green-600" size={32} />
// //                     <p className="font-bold">Operario Stack</p>
// //                     <p className="text-sm text-gray-600">8-10 pantallas</p>
// //                   </div>
// //                 </div>
// //               </div>

// //               <div className="text-gray-400">
// //                 <ChevronRight size={32} className="rotate-90" />
// //               </div>

// //               <div className="w-full max-w-2xl">
// //                 <h3 className="text-center font-bold text-lg mb-4">
// //                   ☁️ Firebase Services
// //                 </h3>
// //                 <div className="grid grid-cols-3 gap-4">
// //                   <div className="bg-orange-100 p-4 rounded-lg text-center">
// //                     <Shield
// //                       className="mx-auto mb-2 text-orange-600"
// //                       size={24}
// //                     />
// //                     <p className="font-semibold text-sm">Auth</p>
// //                   </div>
// //                   <div className="bg-orange-100 p-4 rounded-lg text-center">
// //                     <Database
// //                       className="mx-auto mb-2 text-orange-600"
// //                       size={24}
// //                     />
// //                     <p className="font-semibold text-sm">Firestore</p>
// //                   </div>
// //                   <div className="bg-orange-100 p-4 rounded-lg text-center">
// //                     <Bell className="mx-auto mb-2 text-orange-600" size={24} />
// //                     <p className="font-semibold text-sm">Messaging</p>
// //                   </div>
// //                 </div>
// //               </div>

// //               <div className="text-gray-400">
// //                 <ChevronRight size={32} className="rotate-90" />
// //               </div>

// //               <div className="w-full max-w-2xl">
// //                 <h3 className="text-center font-bold text-lg mb-4">
// //                   💾 Backend API
// //                 </h3>
// //                 <div className="bg-purple-100 p-4 rounded-lg text-center">
// //                   <Cloud className="mx-auto mb-2 text-purple-600" size={32} />
// //                   <p className="font-semibold">Node.js / Firebase Functions</p>
// //                   <p className="text-sm text-gray-600">
// //                     Por definir en siguiente fase
// //                   </p>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>

// //           <div className="bg-gray-50 rounded-lg p-6">
// //             <h3 className="font-bold text-xl mb-4">
// //               🗺️ Estructura de Navegación
// //             </h3>
// //             <div className="space-y-4 font-mono text-sm">
// //               <div>
// //                 <p className="font-bold">📦 App Root</p>
// //                 <div className="ml-4 mt-2 space-y-1">
// //                   <p>├── 🔐 Auth Stack (Login, Registro, Recuperar)</p>
// //                   <p>├── 👤 Cliente Stack</p>
// //                   <p className="ml-4">│ ├── Home (Lista incidencias)</p>
// //                   <p className="ml-4">│ ├── Nueva Incidencia (Wizard)</p>
// //                   <p className="ml-4">
// //                     │ └── Perfil (Datos, Vehículos, Pólizas)
// //                   </p>
// //                   <p>└── 🛡️ Operario Stack</p>
// //                   <p className="ml-4"> ├── Dashboard (3 tabs)</p>
// //                   <p className="ml-4"> ├── Historial</p>
// //                   <p className="ml-4"> └── Perfil</p>
// //                 </div>
// //               </div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // // Tab: Stack
// // function StackTab() {
// //   const techStack = {
// //     frontend: [
// //       {
// //         name: "React Native",
// //         version: "0.73",
// //         category: "Core",
// //         color: "blue",
// //       },
// //       { name: "Expo", version: "~50.0", category: "Core", color: "blue" },
// //       { name: "TypeScript", version: "^5.3", category: "Core", color: "blue" },
// //       {
// //         name: "React Navigation",
// //         version: "^6.1",
// //         category: "Navegación",
// //         color: "purple",
// //       },
// //       { name: "Zustand", version: "^4.4", category: "Estado", color: "green" },
// //     ],
// //     firebase: [
// //       {
// //         name: "Firebase Auth",
// //         version: "^19.0",
// //         category: "Autenticación",
// //         color: "orange",
// //       },
// //       {
// //         name: "Firestore",
// //         version: "^19.0",
// //         category: "Base de Datos",
// //         color: "orange",
// //       },
// //       {
// //         name: "Firebase Storage",
// //         version: "^19.0",
// //         category: "Almacenamiento",
// //         color: "orange",
// //       },
// //       {
// //         name: "Firebase Messaging",
// //         version: "^19.0",
// //         category: "Notificaciones",
// //         color: "orange",
// //       },
// //     ],
// //     utilities: [
// //       {
// //         name: "React Native Maps",
// //         version: "1.10",
// //         category: "Mapas",
// //         color: "red",
// //       },
// //       {
// //         name: "Expo Location",
// //         version: "~16.5",
// //         category: "GPS",
// //         color: "red",
// //       },
// //       {
// //         name: "Expo Image Picker",
// //         version: "~14.7",
// //         category: "Multimedia",
// //         color: "red",
// //       },
// //       {
// //         name: "React Hook Form",
// //         version: "^7.49",
// //         category: "Formularios",
// //         color: "yellow",
// //       },
// //     ],
// //   };

// //   return (
// //     <div className="space-y-6 animate-fade-in">
// //       <div className="bg-white rounded-xl shadow-lg p-8">
// //         <h2 className="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
// //           <Cloud size={32} />
// //           Stack Tecnológico
// //         </h2>

// //         <div className="space-y-8">
// //           <div>
// //             <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
// //               <Smartphone size={24} className="text-blue-600" />
// //               Frontend (React Native - Expo)
// //             </h3>
// //             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
// //               {techStack.frontend.map((tech, index) => (
// //                 <TechCard key={index} tech={tech} />
// //               ))}
// //             </div>
// //           </div>

// //           <div>
// //             <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
// //               <Cloud size={24} className="text-orange-600" />
// //               Firebase Services
// //             </h3>
// //             <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
// //               {techStack.firebase.map((tech, index) => (
// //                 <TechCard key={index} tech={tech} />
// //               ))}
// //             </div>
// //           </div>

// //           <div>
// //             <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
// //               <Settings size={24} className="text-gray-600" />
// //               Librerías y Utilidades
// //             </h3>
// //             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
// //               {techStack.utilities.map((tech, index) => (
// //                 <TechCard key={index} tech={tech} />
// //               ))}
// //             </div>
// //           </div>

// //           <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6">
// //             <h3 className="text-xl font-bold mb-2 flex items-center gap-2 text-yellow-800">
// //               <AlertTriangle size={24} />
// //               Backend (Por definir)
// //             </h3>
// //             <p className="text-gray-700">
// //               Opciones sugeridas: <strong>Node.js + Express</strong>,{" "}
// //               <strong>Firebase Functions</strong>,
// //               <strong> Python + FastAPI</strong> o <strong>NestJS</strong>
// //             </p>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // // Tab: Comparativa
// // function ComparativaTab() {
// //   const features = [
// //     {
// //       feature: "Ver incidencias",
// //       cliente: "Solo las propias",
// //       operario: "Todas (disponibles + asignadas)",
// //     },
// //     { feature: "Crear incidencia", cliente: "✅ Sí", operario: "❌ No" },
// //     {
// //       feature: "Cambiar estados",
// //       cliente: "❌ Solo cancelar",
// //       operario: "✅ Todos los cambios",
// //     },
// //     {
// //       feature: "Gestión vehículos/pólizas",
// //       cliente: "✅ CRUD completo",
// //       operario: "❌ Solo visualización",
// //     },
// //     {
// //       feature: "Ver datos del cliente",
// //       cliente: "❌ No",
// //       operario: "✅ Información completa",
// //     },
// //     {
// //       feature: "Mapa",
// //       cliente: "Solo su incidencia",
// //       operario: "Todas sus activas",
// //     },
// //     {
// //       feature: "Agregar comentarios",
// //       cliente: "❌ No (en MVP)",
// //       operario: "✅ Sí",
// //     },
// //     {
// //       feature: "Llamadas telefónicas",
// //       cliente: "Al operario asignado",
// //       operario: "A cualquier cliente",
// //     },
// //     {
// //       feature: "Notificaciones",
// //       cliente: "✅ Push en tiempo real",
// //       operario: "✅ Push en tiempo real",
// //     },
// //     {
// //       feature: "Historial",
// //       cliente: "Sus incidencias",
// //       operario: "Incidencias atendidas",
// //     },
// //   ];

// //   return (
// //     <div className="space-y-6 animate-fade-in">
// //       <div className="bg-white rounded-xl shadow-lg p-8">
// //         <h2 className="text-3xl font-bold text-gray-900 mb-6">
// //           ⚖️ Comparativa Cliente vs Operario
// //         </h2>

// //         <div className="overflow-x-auto">
// //           <table className="w-full">
// //             <thead>
// //               <tr className="bg-gray-100">
// //                 <th className="px-6 py-4 text-left font-bold text-gray-900">
// //                   Funcionalidad
// //                 </th>
// //                 <th className="px-6 py-4 text-left font-bold text-blue-900">
// //                   <div className="flex items-center gap-2">
// //                     <Users size={20} />
// //                     Cliente
// //                   </div>
// //                 </th>
// //                 <th className="px-6 py-4 text-left font-bold text-green-900">
// //                   <div className="flex items-center gap-2">
// //                     <Shield size={20} />
// //                     Operario
// //                   </div>
// //                 </th>
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {features.map((item, index) => (
// //                 <tr
// //                   key={index}
// //                   className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
// //                 >
// //                   <td className="px-6 py-4 font-medium text-gray-900">
// //                     {item.feature}
// //                   </td>
// //                   <td className="px-6 py-4 text-gray-700">{item.cliente}</td>
// //                   <td className="px-6 py-4 text-gray-700">{item.operario}</td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>
// //       </div>

// //       <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl shadow-lg p-8">
// //         <h3 className="text-2xl font-bold text-gray-900 mb-4">
// //           🚀 Fase 2 (Post-MVP)
// //         </h3>
// //         <div className="grid md:grid-cols-2 gap-4">
// //           <div className="bg-white rounded-lg p-4">
// //             <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
// //               <MessageSquare size={20} className="text-purple-600" />
// //               Chat en Tiempo Real
// //             </h4>
// //             <p className="text-gray-600">Sistema de mensajería con Firestore</p>
// //           </div>
// //           <div className="bg-white rounded-lg p-4">
// //             <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
// //               <Cloud size={20} className="text-blue-600" />
// //               Modo Offline
// //             </h4>
// //             <p className="text-gray-600">Guardar borradores sin conexión</p>
// //           </div>
// //           <div className="bg-white rounded-lg p-4">
// //             <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
// //               <CheckCircle size={20} className="text-green-600" />
// //               Sistema de Rating
// //             </h4>
// //             <p className="text-gray-600">Calificaciones mutuas</p>
// //           </div>
// //           <div className="bg-white rounded-lg p-4">
// //             <h4 className="font-bold text-lg mb-2 flex items-center gap-2">
// //               <Settings size={20} className="text-orange-600" />
// //               Dashboard Admin Web
// //             </h4>
// //             <p className="text-gray-600">Gestión y métricas</p>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // // Componentes auxiliares
// // function StatCard({ title, value, subtitle, icon: Icon, color }: any) {
// //   return (
// //     <div
// //       className={`bg-${color}-50 rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow`}
// //     >
// //       <div className="flex items-center gap-3 mb-2">
// //         <div className={`bg-${color}-100 p-2 rounded-lg`}>
// //           <Icon className={`text-${color}-600`} size={24} />
// //         </div>
// //         <h3 className="font-semibold text-gray-700">{title}</h3>
// //       </div>
// //       <p className={`text-3xl font-bold text-${color}-600 mb-1`}>{value}</p>
// //       <p className="text-sm text-gray-600">{subtitle}</p>
// //     </div>
// //   );
// // }

// // function Section({ title, icon: Icon, children }: any) {
// //   return (
// //     <div className="border-l-4 border-blue-500 pl-4">
// //       <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
// //         <Icon size={18} />
// //         {title}
// //       </h4>
// //       {children}
// //     </div>
// //   );
// // }

// // function TechCard({ tech }: any) {
// //   return (
// //     <div
// //       className={`bg-${tech.color}-50 border-2 border-${tech.color}-200 rounded-lg p-4 hover:shadow-md transition-shadow`}
// //     >
// //       <h4 className="font-bold text-gray-900 mb-1">{tech.name}</h4>
// //       <p className="text-sm text-gray-600 mb-2">{tech.category}</p>
// //       <span
// //         className={`inline-block px-2 py-1 text-xs rounded bg-${tech.color}-200 text-${tech.color}-800 font-mono`}
// //       >
// //         {tech.version}
// //       </span>
// //     </div>
// //   );
// // }

// // export default PresentacionMVP;

// 'use client'
// import React, { useState } from 'react';
// import { toast } from 'react-toastify';
// import { 
//   Shield, 
//   Car, 
//   Phone, 
//   Camera, 
//   MapPin, 
//   FileText, 
//   AlertCircle,
//   ChevronDown,
//   X
// } from 'lucide-react';

// interface Poliza {
//   id: string;
//   numero: string;
//   tipo: string;
//   vigenciaHasta: string;
// }

// interface Vehiculo {
//   id: string;
//   placa: string;
//   marca: string;
//   modelo: string;
//   anio: number;
// }

// interface IncidentFormData {
//   polizaId: string;
//   vehiculoId: string;
//   tipoIncidente: string;
//   descripcion: string;
//   ubicacion: string;
//   referencia: string;
//   fotos: File[];
// }

// const RegistroIncidencia: React.FC = () => {
//   // Mock data - en producción vendría de tu API
//   const polizas: Poliza[] = [
//     { id: '1', numero: 'POL-2024-001234', tipo: 'Todo Riesgo', vigenciaHasta: '2025-12-31' },
//     { id: '2', numero: 'POL-2024-005678', tipo: 'Contra Terceros', vigenciaHasta: '2025-06-30' },
//   ];

//   const vehiculos: Vehiculo[] = [
//     { id: '1', placa: 'ABC-123', marca: 'Toyota', modelo: 'Corolla', anio: 2022 },
//     { id: '2', placa: 'XYZ-789', marca: 'Honda', modelo: 'Civic', anio: 2023 },
//   ];

//   const tiposIncidente = [
//     'Choque',
//     'Robo/Hurto',
//     'Daño por terceros',
//     'Volcadura',
//     'Incendio',
//     'Desastre natural',
//     'Otros'
//   ];

//   const [formData, setFormData] = useState<IncidentFormData>({
//     polizaId: '',
//     vehiculoId: '',
//     tipoIncidente: '',
//     descripcion: '',
//     ubicacion: '',
//     referencia: '',
//     fotos: []
//   });

//   const [showPolizaDropdown, setShowPolizaDropdown] = useState(false);
//   const [showVehiculoDropdown, setShowVehiculoDropdown] = useState(false);
//   const [showTipoDropdown, setShowTipoDropdown] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleEmergencyCall = (type: 'policia' | 'bomberos') => {
//     const phoneNumbers = {
//       policia: '105',
//       bomberos: '116'
//     };
    
//     if (window.confirm(`¿Deseas llamar a ${type === 'policia' ? 'la Policía' : 'Bomberos'}?`)) {
//       window.location.href = `tel:${phoneNumbers[type]}`;
//       toast.info(`Llamando a ${type}...`);
//     }
//   };

//   const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (files) {
//       const fileArray = Array.from(files);
      
//       if (formData.fotos.length + fileArray.length > 6) {
//         toast.warning('Máximo 6 fotos permitidas');
//         return;
//       }

//       setFormData(prev => ({
//         ...prev,
//         fotos: [...prev.fotos, ...fileArray]
//       }));
//       toast.success(`${fileArray.length} foto(s) agregada(s)`);
//     }
//   };

//   const removePhoto = (index: number) => {
//     setFormData(prev => ({
//       ...prev,
//       fotos: prev.fotos.filter((_, i) => i !== index)
//     }));
//   };

//   const getCurrentLocation = () => {
//     if (navigator.geolocation) {
//       toast.info('Obteniendo ubicación...');
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const { latitude, longitude } = position.coords;
//           setFormData(prev => ({
//             ...prev,
//             ubicacion: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
//           }));
//           toast.success('Ubicación obtenida');
//         },
//         () => {
//           toast.error('No se pudo obtener la ubicación');
//         }
//       );
//     } else {
//       toast.error('Geolocalización no disponible');
//     }
//   };

//   const validateForm = (): boolean => {
//     if (!formData.polizaId) {
//       toast.error('Selecciona una póliza');
//       return false;
//     }
//     if (!formData.vehiculoId) {
//       toast.error('Selecciona un vehículo');
//       return false;
//     }
//     if (!formData.tipoIncidente) {
//       toast.error('Selecciona el tipo de incidente');
//       return false;
//     }
//     if (!formData.descripcion.trim()) {
//       toast.error('Ingresa una descripción del incidente');
//       return false;
//     }
//     if (formData.descripcion.trim().length < 20) {
//       toast.error('La descripción debe tener al menos 20 caracteres');
//       return false;
//     }
//     return true;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!validateForm()) return;

//     setIsSubmitting(true);

//     try {
//       // Simular llamada API
//       await new Promise(resolve => setTimeout(resolve, 2000));
      
//       // Aquí iría tu llamada real a la API
//       // const response = await api.post('/incidencias', formData);
      
//       toast.success('Incidencia registrada exitosamente');
      
//       // Reset form
//       setFormData({
//         polizaId: '',
//         vehiculoId: '',
//         tipoIncidente: '',
//         descripcion: '',
//         ubicacion: '',
//         referencia: '',
//         fotos: []
//       });
      
//     } catch (error) {
//       toast.error('Error al registrar la incidencia');
//       console.error(error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const selectedPoliza = polizas.find(p => p.id === formData.polizaId);
//   const selectedVehiculo = vehiculos.find(v => v.id === formData.vehiculoId);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4 md:p-6">
//       <div className="max-w-3xl mx-auto">
//         {/* Header */}
//         <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
//           <div className="flex items-center gap-3 mb-2">
//             <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
//               <AlertCircle className="w-6 h-6 text-white" />
//             </div>
//             <div>
//               <h1 className="text-2xl font-bold text-slate-800">Registrar Incidencia</h1>
//               <p className="text-sm text-slate-500">Complete los datos del siniestro</p>
//             </div>
//           </div>
//         </div>

//         {/* Emergency Calls */}
//         <div className="grid grid-cols-2 gap-4 mb-6">
//           <button
//             onClick={() => handleEmergencyCall('policia')}
//             className="bg-blue-600 hover:bg-blue-700 text-white rounded-2xl p-6 shadow-lg transition-all duration-200 active:scale-95"
//           >
//             <Phone className="w-8 h-8 mx-auto mb-3" />
//             <p className="font-semibold text-lg">Policía</p>
//             <p className="text-sm opacity-90">105</p>
//           </button>
          
//           <button
//             onClick={() => handleEmergencyCall('bomberos')}
//             className="bg-red-600 hover:bg-red-700 text-white rounded-2xl p-6 shadow-lg transition-all duration-200 active:scale-95"
//           >
//             <Phone className="w-8 h-8 mx-auto mb-3" />
//             <p className="font-semibold text-lg">Bomberos</p>
//             <p className="text-sm opacity-90">116</p>
//           </button>
//         </div>

//         {/* Form */}
//         <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6 space-y-6">
          
//           {/* Póliza Selection */}
//           <div>
//             <label className="block text-sm font-semibold text-slate-700 mb-2">
//               <Shield className="w-4 h-4 inline mr-2" />
//               Póliza
//             </label>
//             <div className="relative">
//               <button
//                 type="button"
//                 onClick={() => setShowPolizaDropdown(!showPolizaDropdown)}
//                 className="w-full px-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-xl text-left flex items-center justify-between hover:border-blue-400 transition-colors"
//               >
//                 <span className={selectedPoliza ? 'text-slate-800' : 'text-slate-400'}>
//                   {selectedPoliza ? (
//                     <span>
//                       <span className="font-semibold">{selectedPoliza.numero}</span>
//                       <span className="text-sm text-slate-500 ml-2">({selectedPoliza.tipo})</span>
//                     </span>
//                   ) : 'Seleccionar póliza'}
//                 </span>
//                 <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${showPolizaDropdown ? 'rotate-180' : ''}`} />
//               </button>
              
//               {showPolizaDropdown && (
//                 <div className="absolute z-10 w-full mt-2 bg-white border-2 border-slate-200 rounded-xl shadow-xl max-h-64 overflow-y-auto">
//                   {polizas.map((poliza) => (
//                     <button
//                       key={poliza.id}
//                       type="button"
//                       onClick={() => {
//                         setFormData(prev => ({ ...prev, polizaId: poliza.id }));
//                         setShowPolizaDropdown(false);
//                       }}
//                       className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors border-b border-slate-100 last:border-0"
//                     >
//                       <p className="font-semibold text-slate-800">{poliza.numero}</p>
//                       <p className="text-sm text-slate-500">{poliza.tipo} - Vigente hasta {poliza.vigenciaHasta}</p>
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Vehículo Selection */}
//           <div>
//             <label className="block text-sm font-semibold text-slate-700 mb-2">
//               <Car className="w-4 h-4 inline mr-2" />
//               Vehículo
//             </label>
//             <div className="relative">
//               <button
//                 type="button"
//                 onClick={() => setShowVehiculoDropdown(!showVehiculoDropdown)}
//                 className="w-full px-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-xl text-left flex items-center justify-between hover:border-blue-400 transition-colors"
//               >
//                 <span className={selectedVehiculo ? 'text-slate-800' : 'text-slate-400'}>
//                   {selectedVehiculo ? (
//                     <span>
//                       <span className="font-semibold">{selectedVehiculo.placa}</span>
//                       <span className="text-sm text-slate-500 ml-2">
//                         {selectedVehiculo.marca} {selectedVehiculo.modelo} ({selectedVehiculo.anio})
//                       </span>
//                     </span>
//                   ) : 'Seleccionar vehículo'}
//                 </span>
//                 <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${showVehiculoDropdown ? 'rotate-180' : ''}`} />
//               </button>
              
//               {showVehiculoDropdown && (
//                 <div className="absolute z-10 w-full mt-2 bg-white border-2 border-slate-200 rounded-xl shadow-xl max-h-64 overflow-y-auto">
//                   {vehiculos.map((vehiculo) => (
//                     <button
//                       key={vehiculo.id}
//                       type="button"
//                       onClick={() => {
//                         setFormData(prev => ({ ...prev, vehiculoId: vehiculo.id }));
//                         setShowVehiculoDropdown(false);
//                       }}
//                       className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors border-b border-slate-100 last:border-0"
//                     >
//                       <p className="font-semibold text-slate-800">{vehiculo.placa}</p>
//                       <p className="text-sm text-slate-500">
//                         {vehiculo.marca} {vehiculo.modelo} ({vehiculo.anio})
//                       </p>
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Tipo de Incidente */}
//           <div>
//             <label className="block text-sm font-semibold text-slate-700 mb-2">
//               <FileText className="w-4 h-4 inline mr-2" />
//               Tipo de Incidente
//             </label>
//             <div className="relative">
//               <button
//                 type="button"
//                 onClick={() => setShowTipoDropdown(!showTipoDropdown)}
//                 className="w-full px-4 py-4 bg-slate-50 border-2 border-slate-200 rounded-xl text-left flex items-center justify-between hover:border-blue-400 transition-colors"
//               >
//                 <span className={formData.tipoIncidente ? 'text-slate-800 font-medium' : 'text-slate-400'}>
//                   {formData.tipoIncidente || 'Seleccionar tipo'}
//                 </span>
//                 <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${showTipoDropdown ? 'rotate-180' : ''}`} />
//               </button>
              
//               {showTipoDropdown && (
//                 <div className="absolute z-10 w-full mt-2 bg-white border-2 border-slate-200 rounded-xl shadow-xl">
//                   {tiposIncidente.map((tipo) => (
//                     <button
//                       key={tipo}
//                       type="button"
//                       onClick={() => {
//                         setFormData(prev => ({ ...prev, tipoIncidente: tipo }));
//                         setShowTipoDropdown(false);
//                       }}
//                       className="w-full px-4 py-3 text-left hover:bg-blue-50 transition-colors border-b border-slate-100 last:border-0 font-medium text-slate-700"
//                     >
//                       {tipo}
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Descripción */}
//           <div>
//             <label className="block text-sm font-semibold text-slate-700 mb-2">
//               Descripción del Incidente
//             </label>
//             <textarea
//               value={formData.descripcion}
//               onChange={(e) => setFormData(prev => ({ ...prev, descripcion: e.target.value }))}
//               placeholder="Describa detalladamente lo ocurrido..."
//               rows={5}
//               className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-blue-400 focus:outline-none resize-none"
//             />
//             <p className="text-xs text-slate-500 mt-1">Mínimo 20 caracteres</p>
//           </div>

//           {/* Ubicación */}
//           <div>
//             <label className="block text-sm font-semibold text-slate-700 mb-2">
//               <MapPin className="w-4 h-4 inline mr-2" />
//               Ubicación
//             </label>
//             <div className="flex gap-2">
//               <input
//                 type="text"
//                 value={formData.ubicacion}
//                 onChange={(e) => setFormData(prev => ({ ...prev, ubicacion: e.target.value }))}
//                 placeholder="Dirección o coordenadas"
//                 className="flex-1 px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-blue-400 focus:outline-none"
//               />
//               <button
//                 type="button"
//                 onClick={getCurrentLocation}
//                 className="px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
//               >
//                 <MapPin className="w-5 h-5" />
//               </button>
//             </div>
//           </div>

//           {/* Referencia */}
//           <div>
//             <label className="block text-sm font-semibold text-slate-700 mb-2">
//               Referencia (opcional)
//             </label>
//             <input
//               type="text"
//               value={formData.referencia}
//               onChange={(e) => setFormData(prev => ({ ...prev, referencia: e.target.value }))}
//               placeholder="Ej: Frente al parque central"
//               className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:border-blue-400 focus:outline-none"
//             />
//           </div>

//           {/* Fotos */}
//           <div>
//             <label className="block text-sm font-semibold text-slate-700 mb-2">
//               <Camera className="w-4 h-4 inline mr-2" />
//               Fotografías ({formData.fotos.length}/6)
//             </label>
            
//             <input
//               type="file"
//               accept="image/*"
//               multiple
//               onChange={handlePhotoUpload}
//               className="hidden"
//               id="photo-upload"
//             />
            
//             <label
//               htmlFor="photo-upload"
//               className="block w-full px-4 py-8 bg-slate-50 border-2 border-dashed border-slate-300 rounded-xl text-center cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors"
//             >
//               <Camera className="w-12 h-12 mx-auto mb-2 text-slate-400" />
//               <p className="text-slate-600 font-medium">Toca para agregar fotos</p>
//               <p className="text-xs text-slate-500 mt-1">Máximo 6 imágenes</p>
//             </label>

//             {/* Preview de fotos */}
//             {formData.fotos.length > 0 && (
//               <div className="grid grid-cols-3 gap-3 mt-4">
//                 {formData.fotos.map((foto, index) => (
//                   <div key={index} className="relative aspect-square rounded-lg overflow-hidden bg-slate-100">
//                     <img
//                       src={URL.createObjectURL(foto)}
//                       alt={`Foto ${index + 1}`}
//                       className="w-full h-full object-cover"
//                     />
//                     <button
//                       type="button"
//                       onClick={() => removePhoto(index)}
//                       className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
//                     >
//                       <X className="w-4 h-4" />
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={isSubmitting}
//             className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {isSubmitting ? (
//               <span className="flex items-center justify-center gap-2">
//                 <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin" />
//                 Registrando...
//               </span>
//             ) : (
//               'Registrar Incidencia'
//             )}
//           </button>
//         </form>

//         {/* Info Footer */}
//         <div className="mt-6 bg-blue-50 border border-blue-200 rounded-2xl p-4">
//           <p className="text-sm text-blue-800">
//             <AlertCircle className="w-4 h-4 inline mr-1" />
//             Los datos serán revisados por nuestro equipo en un plazo máximo de 24 horas.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RegistroIncidencia;

'use client'
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { 
  Shield, 
  Car, 
  Phone, 
  Camera, 
  MapPin, 
  FileText, 
  AlertCircle,
  ChevronDown,
  X,
  Check,
  Upload,
  Loader2,
  Info,
  Calendar,
  Hash,
  AlertTriangle,
  CheckCircle2,
  Home,
  Copy,
  Download,
  Share2,
  Clock
} from 'lucide-react';

interface Poliza {
  id: string;
  numero: string;
  tipo: string;
  vigenciaHasta: string;
  estado: 'vigente' | 'por-vencer' | 'vencida';
}

interface Vehiculo {
  id: string;
  placa: string;
  marca: string;
  modelo: string;
  anio: number;
  color: string;
}

interface IncidentFormData {
  polizaId: string;
  vehiculoId: string;
  tipoIncidente: string;
  descripcion: string;
  ubicacion: string;
  referencia: string;
  fotos: File[];
}

interface IncidenciaRegistrada {
  codigo: string;
  fecha: string;
  hora: string;
  estado: string;
}

const RegistroIncidencia: React.FC = () => {
  const polizas: Poliza[] = [
    { id: '1', numero: 'POL-2024-001234', tipo: 'Todo Riesgo', vigenciaHasta: '2025-12-31', estado: 'vigente' },
    { id: '2', numero: 'POL-2024-005678', tipo: 'Contra Terceros', vigenciaHasta: '2025-06-30', estado: 'vigente' },
    { id: '3', numero: 'POL-2023-009876', tipo: 'Todo Riesgo Plus', vigenciaHasta: '2025-03-15', estado: 'por-vencer' },
  ];

  const vehiculos: Vehiculo[] = [
    { id: '1', placa: 'ABC-123', marca: 'Toyota', modelo: 'Corolla', anio: 2022, color: 'Plateado' },
    { id: '2', placa: 'XYZ-789', marca: 'Honda', modelo: 'Civic', anio: 2023, color: 'Negro' },
    { id: '3', placa: 'DEF-456', marca: 'Nissan', modelo: 'Sentra', anio: 2021, color: 'Blanco' },
  ];

  const tiposIncidente = [
    { value: 'choque', label: 'Choque', icon: '🚗', color: 'text-orange-600' },
    { value: 'robo', label: 'Robo/Hurto', icon: '🚨', color: 'text-red-600' },
    { value: 'danio-terceros', label: 'Daño por terceros', icon: '⚠️', color: 'text-yellow-600' },
    { value: 'volcadura', label: 'Volcadura', icon: '🔄', color: 'text-purple-600' },
    { value: 'incendio', label: 'Incendio', icon: '🔥', color: 'text-red-700' },
    { value: 'desastre', label: 'Desastre natural', icon: '🌊', color: 'text-blue-600' },
    { value: 'otros', label: 'Otros', icon: '📋', color: 'text-gray-600' },
  ];

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);
  const [formData, setFormData] = useState<IncidentFormData>({
    polizaId: '',
    vehiculoId: '',
    tipoIncidente: '',
    descripcion: '',
    ubicacion: '',
    referencia: '',
    fotos: []
  });

  const [incidenciaRegistrada, setIncidenciaRegistrada] = useState<IncidenciaRegistrada | null>(null);
  const [showPolizaDropdown, setShowPolizaDropdown] = useState(false);
  const [showVehiculoDropdown, setShowVehiculoDropdown] = useState(false);
  const [showTipoDropdown, setShowTipoDropdown] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [gettingLocation, setGettingLocation] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleEmergencyCall = (type: 'policia' | 'bomberos') => {
    const contacts = {
      policia: { number: '105', name: 'Policía Nacional' },
      bomberos: { number: '116', name: 'Bomberos' }
    };
    
    const contact = contacts[type];
    
    const confirmation = window.confirm(
      `¿Desea llamar a ${contact.name} al número ${contact.number}?`
    );
    
    if (confirmation) {
      window.location.href = `tel:${contact.number}`;
      toast.info(`Iniciando llamada a ${contact.name}`, {
        position: 'top-center'
      });
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const fileArray = Array.from(files);
    const remainingSlots = 6 - formData.fotos.length;
    
    if (fileArray.length > remainingSlots) {
      toast.warning(`Solo puedes agregar ${remainingSlots} foto(s) más`, {
        position: 'top-center'
      });
      return;
    }

    const oversizedFiles = fileArray.filter(file => file.size > 5 * 1024 * 1024);
    if (oversizedFiles.length > 0) {
      toast.error('Algunas fotos exceden el tamaño máximo de 5MB', {
        position: 'top-center'
      });
      return;
    }

    setFormData(prev => ({
      ...prev,
      fotos: [...prev.fotos, ...fileArray]
    }));

    toast.success(`${fileArray.length} foto(s) agregada(s) correctamente`, {
      position: 'top-center'
    });
  };

  const removePhoto = (index: number) => {
    setFormData(prev => ({
      ...prev,
      fotos: prev.fotos.filter((_, i) => i !== index)
    }));
    toast.info('Foto eliminada', { position: 'top-center' });
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast.error('Tu dispositivo no soporta geolocalización', {
        position: 'top-center'
      });
      return;
    }

    setGettingLocation(true);
    toast.info('Obteniendo tu ubicación actual...', {
      position: 'top-center',
      autoClose: 2000
    });

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setFormData(prev => ({
          ...prev,
          ubicacion: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
        }));
        setGettingLocation(false);
        toast.success('Ubicación obtenida exitosamente', {
          position: 'top-center'
        });
      },
      (error) => {
        setGettingLocation(false);
        let errorMessage = 'No se pudo obtener la ubicación';
        
        switch(error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = 'Permiso de ubicación denegado';
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = 'Ubicación no disponible';
            break;
          case error.TIMEOUT:
            errorMessage = 'Tiempo de espera agotado';
            break;
        }
        
        toast.error(errorMessage, { position: 'top-center' });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  };

  const validateStep = (step: number): boolean => {
    if (step === 1) {
      if (!formData.polizaId) {
        toast.error('Por favor selecciona una póliza', { position: 'top-center' });
        return false;
      }
      if (!formData.vehiculoId) {
        toast.error('Por favor selecciona un vehículo', { position: 'top-center' });
        return false;
      }
      if (!formData.tipoIncidente) {
        toast.error('Por favor selecciona el tipo de incidente', { position: 'top-center' });
        return false;
      }
      return true;
    }
    
    if (step === 2) {
      if (!formData.descripcion.trim()) {
        toast.error('Por favor ingresa una descripción', { position: 'top-center' });
        return false;
      }
      if (formData.descripcion.trim().length < 30) {
        toast.error('La descripción debe tener al menos 30 caracteres', { position: 'top-center' });
        return false;
      }
      if (!formData.ubicacion.trim()) {
        toast.error('Por favor ingresa la ubicación del incidente', { position: 'top-center' });
        return false;
      }
      return true;
    }
    
    return true;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4) as 1 | 2 | 3 | 4);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1) as 1 | 2 | 3 | 4);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const generateCodigoIncidencia = () => {
    const year = new Date().getFullYear();
    const random = Math.floor(Math.random() * 900000) + 100000;
    return `INC-${year}-${random}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(2)) return;

    setIsSubmitting(true);
    setUploadProgress(0);

    try {
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      await new Promise(resolve => setTimeout(resolve, 2500));
      
      clearInterval(progressInterval);
      setUploadProgress(100);
      
      // Generar datos de la incidencia registrada
      const now = new Date();
      const incidencia: IncidenciaRegistrada = {
        codigo: generateCodigoIncidencia(),
        fecha: now.toLocaleDateString('es-PE', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        }),
        hora: now.toLocaleTimeString('es-PE', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        estado: 'En Revisión'
      };
      
      setIncidenciaRegistrada(incidencia);
      
      await new Promise(resolve => setTimeout(resolve, 500));
      
      toast.success('¡Incidencia registrada exitosamente!', {
        position: 'top-center',
        autoClose: 3000
      });
      
      // Cambiar al paso 4 (confirmación)
      setCurrentStep(4);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
    } catch (error) {
      toast.error('Error al registrar la incidencia. Por favor intenta nuevamente.', {
        position: 'top-center'
      });
      console.error(error);
    } finally {
      setIsSubmitting(false);
      setUploadProgress(0);
    }
  };

  const handleCopyCodigo = () => {
    if (incidenciaRegistrada) {
      navigator.clipboard.writeText(incidenciaRegistrada.codigo);
      toast.success('Código copiado al portapapeles', {
        position: 'top-center'
      });
    }
  };

  const handleNuevaIncidencia = () => {
    setFormData({
      polizaId: '',
      vehiculoId: '',
      tipoIncidente: '',
      descripcion: '',
      ubicacion: '',
      referencia: '',
      fotos: []
    });
    setIncidenciaRegistrada(null);
    setCurrentStep(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const selectedPoliza = polizas.find(p => p.id === formData.polizaId);
  const selectedVehiculo = vehiculos.find(v => v.id === formData.vehiculoId);
  const selectedTipo = tiposIncidente.find(t => t.value === formData.tipoIncidente);

  const getEstadoBadge = (estado: string) => {
    const badges = {
      'vigente': 'bg-emerald-100 text-emerald-700 border-emerald-200',
      'por-vencer': 'bg-amber-100 text-amber-700 border-amber-200',
      'vencida': 'bg-red-100 text-red-700 border-red-200'
    };
    return badges[estado as keyof typeof badges] || badges.vigente;
  };

  const progress = currentStep === 4 ? 100 : (currentStep / 3) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Header Fixed */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                {currentStep === 4 ? (
                  <CheckCircle2 className="w-5 h-5 text-white" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-white" />
                )}
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-800">
                  {currentStep === 4 ? 'Incidencia Registrada' : 'Registrar Incidencia'}
                </h1>
                <p className="text-xs text-slate-500">
                  {currentStep === 4 ? 'Confirmación exitosa' : `Paso ${currentStep} de 3`}
                </p>
              </div>
            </div>
            {incidenciaRegistrada && currentStep === 4 ? (
              <div className="text-right">
                <p className="text-xs text-slate-500">Código de Incidencia</p>
                <p className="text-sm font-mono font-bold text-blue-600">{incidenciaRegistrada.codigo}</p>
              </div>
            ) : (
              <div className="text-right">
                <p className="text-xs text-slate-500">Folio temporal</p>
                <p className="text-sm font-mono font-semibold text-slate-700">#TMP-{Date.now().toString().slice(-6)}</p>
              </div>
            )}
          </div>
          
          {/* Progress Bar */}
          <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ease-out ${
                currentStep === 4 ? 'bg-gradient-to-r from-green-600 to-green-500' : 'bg-gradient-to-r from-blue-600 to-blue-500'
              }`}
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 pb-24">
        
        {/* Emergency Calls - Solo mostrar si no está en paso 4 */}
        {currentStep !== 4 && !isSubmitting && (
          <div className="grid grid-cols-2 gap-3 mb-6 sticky top-[100px] z-40">
            <button
              onClick={() => handleEmergencyCall('policia')}
              className="group bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 border border-blue-500"
            >
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-lg">Policía</p>
                  <p className="text-sm opacity-90 font-medium">105</p>
                </div>
              </div>
            </button>
            
            <button
              onClick={() => handleEmergencyCall('bomberos')}
              className="group bg-gradient-to-br from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-2xl p-5 shadow-lg hover:shadow-xl transition-all duration-300 active:scale-95 border border-red-500"
            >
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Phone className="w-6 h-6" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-lg">Bomberos</p>
                  <p className="text-sm opacity-90 font-medium">116</p>
                </div>
              </div>
            </button>
          </div>
        )}

        {/* Form Card o Confirmación */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200 overflow-hidden">
          
          {/* Step 1: Datos de Póliza y Vehículo */}
          {currentStep === 1 && (
            <div className="p-6 space-y-6 animate-fadeIn">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Shield className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-800">Información del Seguro</h2>
                  <p className="text-sm text-slate-500">Selecciona la póliza y vehículo afectado</p>
                </div>
              </div>

              {/* Póliza Selection */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                  <Shield className="w-4 h-4 text-blue-600" />
                  Póliza de Seguro
                  <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowPolizaDropdown(!showPolizaDropdown)}
                    className={`w-full px-5 py-4 bg-slate-50 border-2 rounded-2xl text-left flex items-center justify-between transition-all duration-200 ${
                      showPolizaDropdown ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-blue-300'
                    } ${selectedPoliza ? 'bg-white border-slate-300' : ''}`}
                  >
                    {selectedPoliza ? (
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Shield className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-slate-800 flex items-center gap-2">
                            {selectedPoliza.numero}
                            <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${getEstadoBadge(selectedPoliza.estado)}`}>
                              {selectedPoliza.estado === 'vigente' ? 'Vigente' : selectedPoliza.estado === 'por-vencer' ? 'Por vencer' : 'Vencida'}
                            </span>
                          </p>
                          <p className="text-sm text-slate-500 flex items-center gap-2 mt-1">
                            {selectedPoliza.tipo}
                            <span className="text-slate-400">•</span>
                            <Calendar className="w-3 h-3" />
                            Hasta {selectedPoliza.vigenciaHasta}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <span className="text-slate-400 flex items-center gap-2">
                        <Shield className="w-4 h-4" />
                        Seleccionar póliza
                      </span>
                    )}
                    <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${showPolizaDropdown ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {showPolizaDropdown && (
                    <div className="absolute z-50 w-full mt-2 bg-white border-2 border-slate-200 rounded-2xl shadow-2xl max-h-80 overflow-y-auto animate-slideDown">
                      {polizas.map((poliza, index) => (
                        <button
                          key={poliza.id}
                          type="button"
                          onClick={() => {
                            setFormData(prev => ({ ...prev, polizaId: poliza.id }));
                            setShowPolizaDropdown(false);
                          }}
                          className={`w-full px-5 py-4 text-left hover:bg-blue-50 transition-all duration-200 flex items-center gap-3 ${
                            index !== polizas.length - 1 ? 'border-b border-slate-100' : ''
                          } ${formData.polizaId === poliza.id ? 'bg-blue-50' : ''}`}
                        >
                          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                            <Shield className="w-5 h-5 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-slate-800 flex items-center gap-2">
                              {poliza.numero}
                              <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${getEstadoBadge(poliza.estado)}`}>
                                {poliza.estado === 'vigente' ? 'Vigente' : poliza.estado === 'por-vencer' ? 'Por vencer' : 'Vencida'}
                              </span>
                            </p>
                            <p className="text-sm text-slate-500 mt-1">{poliza.tipo}</p>
                            <p className="text-xs text-slate-400 flex items-center gap-1 mt-1">
                              <Calendar className="w-3 h-3" />
                              Vigente hasta {poliza.vigenciaHasta}
                            </p>
                          </div>
                          {formData.polizaId === poliza.id && (
                            <Check className="w-5 h-5 text-blue-600" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Vehículo Selection */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                  <Car className="w-4 h-4 text-blue-600" />
                  Vehículo Asegurado
                  <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowVehiculoDropdown(!showVehiculoDropdown)}
                    className={`w-full px-5 py-4 bg-slate-50 border-2 rounded-2xl text-left flex items-center justify-between transition-all duration-200 ${
                      showVehiculoDropdown ? 'border-blue-500 bg-blue-50' : 'border-slate-200 hover:border-blue-300'
                    } ${selectedVehiculo ? 'bg-white border-slate-300' : ''}`}
                  >
                    {selectedVehiculo ? (
                      <div className="flex items-center gap-3 flex-1">
                        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Car className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-slate-800">{selectedVehiculo.placa}</p>
                          <p className="text-sm text-slate-500 mt-1">
                            {selectedVehiculo.marca} {selectedVehiculo.modelo} {selectedVehiculo.anio}
                          </p>
                          <p className="text-xs text-slate-400 mt-1">Color: {selectedVehiculo.color}</p>
                        </div>
                      </div>
                    ) : (
                      <span className="text-slate-400 flex items-center gap-2">
                        <Car className="w-4 h-4" />
                        Seleccionar vehículo
                      </span>
                    )}
                    <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${showVehiculoDropdown ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {showVehiculoDropdown && (
                    <div className="absolute z-50 w-full mt-2 bg-white border-2 border-slate-200 rounded-2xl shadow-2xl max-h-80 overflow-y-auto animate-slideDown">
                      {vehiculos.map((vehiculo, index) => (
                        <button
                          key={vehiculo.id}
                          type="button"
                          onClick={() => {
                            setFormData(prev => ({ ...prev, vehiculoId: vehiculo.id }));
                            setShowVehiculoDropdown(false);
                          }}
                          className={`w-full px-5 py-4 text-left hover:bg-blue-50 transition-all duration-200 flex items-center gap-3 ${
                            index !== vehiculos.length - 1 ? 'border-b border-slate-100' : ''
                          } ${formData.vehiculoId === vehiculo.id ? 'bg-blue-50' : ''}`}
                        >
                          <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                            <Car className="w-5 h-5 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-slate-800">{vehiculo.placa}</p>
                            <p className="text-sm text-slate-600 mt-1">
                              {vehiculo.marca} {vehiculo.modelo}
                            </p>
                            <p className="text-xs text-slate-400 mt-1">
                              {vehiculo.anio} • {vehiculo.color}
                            </p>
                          </div>
                          {formData.vehiculoId === vehiculo.id && (
                            <Check className="w-5 h-5 text-blue-600" />
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Tipo de Incidente */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                  <FileText className="w-4 h-4 text-blue-600" />
                  Tipo de Incidente
                  <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {tiposIncidente.map((tipo) => (
                    <button
                      key={tipo.value}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, tipoIncidente: tipo.value }))}
                      className={`p-4 rounded-2xl border-2 transition-all duration-200 text-left ${
                        formData.tipoIncidente === tipo.value
                          ? 'border-blue-500 bg-blue-50 shadow-md'
                          : 'border-slate-200 bg-white hover:border-blue-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{tipo.icon}</span>
                        <div className="flex-1">
                          <p className={`font-semibold ${formData.tipoIncidente === tipo.value ? 'text-blue-700' : 'text-slate-700'}`}>
                            {tipo.label}
                          </p>
                        </div>
                        {formData.tipoIncidente === tipo.value && (
                          <Check className="w-5 h-5 text-blue-600" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Detalles del Incidente */}
          {currentStep === 2 && (
            <div className="p-6 space-y-6 animate-fadeIn">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-800">Detalles del Incidente</h2>
                  <p className="text-sm text-slate-500">Describe lo sucedido y la ubicación</p>
                </div>
              </div>

              {/* Resumen de selección anterior */}
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
                <p className="text-xs font-semibold text-blue-700 mb-2 uppercase tracking-wide">Resumen</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="w-4 h-4 text-blue-600" />
                    <span className="text-slate-700">
                      <span className="font-semibold">Póliza:</span> {selectedPoliza?.numero}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Car className="w-4 h-4 text-blue-600" />
                    <span className="text-slate-700">
                      <span className="font-semibold">Vehículo:</span> {selectedVehiculo?.placa} - {selectedVehiculo?.marca} {selectedVehiculo?.modelo}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-xl">{selectedTipo?.icon}</span>
                    <span className="text-slate-700">
                      <span className="font-semibold">Tipo:</span> {selectedTipo?.label}
                    </span>
                  </div>
                </div>
              </div>

              {/* Descripción */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                  <FileText className="w-4 h-4 text-blue-600" />
                  Descripción del Incidente
                  <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <textarea
                    value={formData.descripcion}
                    onChange={(e) => setFormData(prev => ({ ...prev, descripcion: e.target.value }))}
                    placeholder="Describe detalladamente qué sucedió, cómo ocurrió el incidente, quiénes estuvieron involucrados y cualquier detalle relevante..."
                    rows={6}
                    maxLength={1000}
                    className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:border-blue-500 focus:bg-white focus:outline-none resize-none transition-all duration-200 text-slate-700"
                  />
                  <div className="absolute bottom-3 right-3 text-xs text-slate-400 bg-white px-2 py-1 rounded-lg">
                    {formData.descripcion.length}/1000
                  </div>
                </div>
                <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                  <Info className="w-3 h-3" />
                  Mínimo 30 caracteres - Sé lo más específico posible
                </p>
              </div>

              {/* Ubicación */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  Ubicación del Incidente
                  <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={formData.ubicacion}
                    onChange={(e) => setFormData(prev => ({ ...prev, ubicacion: e.target.value }))}
                    placeholder="Ingresa la dirección o coordenadas"
                    className="flex-1 px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:border-blue-500 focus:bg-white focus:outline-none transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={getCurrentLocation}
                    disabled={gettingLocation}
                    className="px-5 py-4 bg-blue-600 text-white rounded-2xl hover:bg-blue-700 transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-medium shadow-lg shadow-blue-200"
                  >
                    {gettingLocation ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <MapPin className="w-5 h-5" />
                    )}
                    <span className="hidden sm:inline">GPS</span>
                  </button>
                </div>
              </div>

              {/* Referencia */}
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                  <Info className="w-4 h-4 text-slate-500" />
                  Referencia Adicional
                  <span className="text-xs text-slate-400 font-normal">(Opcional)</span>
                </label>
                <input
                  type="text"
                  value={formData.referencia}
                  onChange={(e) => setFormData(prev => ({ ...prev, referencia: e.target.value }))}
                  placeholder="Ej: Frente al centro comercial, cerca del parque principal..."
                  maxLength={200}
                  className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:border-blue-500 focus:bg-white focus:outline-none transition-all duration-200"
                />
              </div>
            </div>
          )}

          {/* Step 3: Fotos y Confirmación */}
          {currentStep === 3 && (
            <div className="p-6 space-y-6 animate-fadeIn">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-200">
                <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Camera className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-slate-800">Evidencia Fotográfica</h2>
                  <p className="text-sm text-slate-500">Agrega fotos del incidente (opcional)</p>
                </div>
              </div>

              {/* Upload Area */}
              <div>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoUpload}
                  className="hidden"
                  id="photo-upload"
                  disabled={formData.fotos.length >= 6}
                />
                
                <label
                  htmlFor="photo-upload"
                  className={`block w-full px-6 py-10 bg-gradient-to-br from-slate-50 to-blue-50 border-2 border-dashed rounded-3xl text-center cursor-pointer transition-all duration-300 ${
                    formData.fotos.length >= 6
                      ? 'border-slate-300 opacity-50 cursor-not-allowed'
                      : 'border-slate-300 hover:border-blue-400 hover:from-blue-50 hover:to-blue-100'
                  }`}
                >
                  <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Upload className="w-8 h-8 text-blue-600" />
                  </div>
                  <p className="text-slate-700 font-semibold mb-1">
                    {formData.fotos.length >= 6 ? 'Máximo de fotos alcanzado' : 'Toca para agregar fotos'}
                  </p>
                  <p className="text-sm text-slate-500">
                    {formData.fotos.length}/6 fotos • Máx. 5MB por imagen
                  </p>
                  <p className="text-xs text-slate-400 mt-2">
                    JPG, PNG, HEIC, WebP
                  </p>
                </label>
              </div>

              {/* Fotos Preview */}
              {formData.fotos.length > 0 && (
                <div>
                  <p className="text-sm font-semibold text-slate-700 mb-3">Fotos agregadas ({formData.fotos.length})</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {formData.fotos.map((foto, index) => (
                      <div key={index} className="relative group aspect-square rounded-2xl overflow-hidden bg-slate-100 shadow-md">
                        <img
                          src={URL.createObjectURL(foto)}
                          alt={`Foto ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() => removePhoto(index)}
                            className="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-all duration-200 active:scale-90 shadow-lg"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                        <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded-lg font-medium">
                          #{index + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Resumen Final */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-3xl p-6">
                <div className="flex items-center gap-2 mb-4">
                  <AlertCircle className="w-5 h-5 text-blue-600" />
                  <h3 className="font-bold text-slate-800">Resumen de tu Incidencia</h3>
                </div>
                <div className="space-y-3">
                  <div className="bg-white rounded-xl p-3 shadow-sm">
                    <p className="text-xs text-slate-500 font-semibold mb-1">PÓLIZA</p>
                    <p className="text-sm text-slate-800 font-semibold">{selectedPoliza?.numero}</p>
                    <p className="text-xs text-slate-600">{selectedPoliza?.tipo}</p>
                  </div>
                  <div className="bg-white rounded-xl p-3 shadow-sm">
                    <p className="text-xs text-slate-500 font-semibold mb-1">VEHÍCULO</p>
                    <p className="text-sm text-slate-800 font-semibold">{selectedVehiculo?.placa}</p>
                    <p className="text-xs text-slate-600">{selectedVehiculo?.marca} {selectedVehiculo?.modelo} {selectedVehiculo?.anio}</p>
                  </div>
                  <div className="bg-white rounded-xl p-3 shadow-sm">
                    <p className="text-xs text-slate-500 font-semibold mb-1">TIPO DE INCIDENTE</p>
                    <p className="text-sm text-slate-800 font-semibold flex items-center gap-2">
                      <span>{selectedTipo?.icon}</span>
                      {selectedTipo?.label}
                    </p>
                  </div>
                  <div className="bg-white rounded-xl p-3 shadow-sm">
                    <p className="text-xs text-slate-500 font-semibold mb-1">UBICACIÓN</p>
                    <p className="text-sm text-slate-800 line-clamp-2">{formData.ubicacion}</p>
                    {formData.referencia && (
                      <p className="text-xs text-slate-600 mt-1">Ref: {formData.referencia}</p>
                    )}
                  </div>
                  <div className="bg-white rounded-xl p-3 shadow-sm">
                    <p className="text-xs text-slate-500 font-semibold mb-1">FOTOS ADJUNTAS</p>
                    <p className="text-sm text-slate-800 font-semibold">{formData.fotos.length} imagen{formData.fotos.length !== 1 ? 'es' : ''}</p>
                  </div>
                </div>
              </div>

              {/* Info importante */}
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                <div className="flex gap-3">
                  <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-amber-900 mb-1">Información Importante</p>
                    <p className="text-xs text-amber-800 leading-relaxed">
                      Al enviar esta incidencia, confirmas que la información proporcionada es veraz y completa. 
                      Nuestro equipo revisará tu caso en un plazo máximo de 24 horas hábiles.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Confirmación y Detalle */}
          {currentStep === 4 && incidenciaRegistrada && (
            <div className="p-6 space-y-6 animate-fadeIn">
              {/* Success Header */}
              <div className="text-center py-8">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-2xl shadow-green-200 animate-bounce">
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">¡Incidencia Registrada!</h2>
                <p className="text-slate-600">Tu caso ha sido registrado exitosamente en nuestro sistema</p>
              </div>

              {/* Código de Incidencia */}
              <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-6 text-white shadow-2xl">
                <div className="text-center">
                  <p className="text-sm opacity-90 mb-2">Código de Incidencia</p>
                  <div className="flex items-center justify-center gap-3 mb-4">
                    <Hash className="w-6 h-6" />
                    <p className="text-3xl font-bold font-mono tracking-wider">{incidenciaRegistrada.codigo}</p>
                  </div>
                  <button
                    onClick={handleCopyCodigo}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white/20 hover:bg-white/30 rounded-xl transition-all duration-200 active:scale-95 font-medium backdrop-blur-sm"
                  >
                    <Copy className="w-4 h-4" />
                    Copiar Código
                  </button>
                </div>
              </div>

              {/* Información de Registro */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    <p className="text-xs text-slate-500 font-semibold uppercase">Fecha</p>
                  </div>
                  <p className="text-sm font-semibold text-slate-800">{incidenciaRegistrada.fecha}</p>
                </div>
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-5 h-5 text-blue-600" />
                    <p className="text-xs text-slate-500 font-semibold uppercase">Hora</p>
                  </div>
                  <p className="text-sm font-semibold text-slate-800">{incidenciaRegistrada.hora}</p>
                </div>
              </div>

              {/* Estado */}
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                    <Clock className="w-5 h-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-xs text-amber-700 font-semibold uppercase mb-1">Estado Actual</p>
                    <p className="text-sm font-bold text-amber-900">{incidenciaRegistrada.estado}</p>
                  </div>
                </div>
              </div>

              {/* Detalle Completo de la Incidencia */}
              <div className="border-t-2 border-slate-200 pt-6">
                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  Detalle de la Incidencia
                </h3>
                
                <div className="space-y-4">
                  {/* Póliza */}
                  <div className="bg-white border-2 border-slate-200 rounded-2xl p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Shield className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-slate-500 font-semibold uppercase mb-1">Póliza de Seguro</p>
                        <p className="text-sm font-bold text-slate-800">{selectedPoliza?.numero}</p>
                        <p className="text-xs text-slate-600 mt-1">{selectedPoliza?.tipo}</p>
                        <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                          <Calendar className="w-3 h-3" />
                          Vigente hasta {selectedPoliza?.vigenciaHasta}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Vehículo */}
                  <div className="bg-white border-2 border-slate-200 rounded-2xl p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Car className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-slate-500 font-semibold uppercase mb-1">Vehículo Afectado</p>
                        <p className="text-sm font-bold text-slate-800">{selectedVehiculo?.placa}</p>
                        <p className="text-xs text-slate-600 mt-1">
                          {selectedVehiculo?.marca} {selectedVehiculo?.modelo} ({selectedVehiculo?.anio})
                        </p>
                        <p className="text-xs text-slate-500 mt-1">Color: {selectedVehiculo?.color}</p>
                      </div>
                    </div>
                  </div>

                  {/* Tipo de Incidente */}
                  <div className="bg-white border-2 border-slate-200 rounded-2xl p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl">
                        {selectedTipo?.icon}
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-slate-500 font-semibold uppercase mb-1">Tipo de Incidente</p>
                        <p className="text-sm font-bold text-slate-800">{selectedTipo?.label}</p>
                      </div>
                    </div>
                  </div>

                  {/* Descripción */}
                  <div className="bg-white border-2 border-slate-200 rounded-2xl p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <FileText className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-slate-500 font-semibold uppercase mb-2">Descripción</p>
                        <p className="text-sm text-slate-700 leading-relaxed">{formData.descripcion}</p>
                      </div>
                    </div>
                  </div>

                  {/* Ubicación */}
                  <div className="bg-white border-2 border-slate-200 rounded-2xl p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-slate-500 font-semibold uppercase mb-1">Ubicación</p>
                        <p className="text-sm text-slate-700">{formData.ubicacion}</p>
                        {formData.referencia && (
                          <p className="text-xs text-slate-500 mt-2">
                            <span className="font-semibold">Referencia:</span> {formData.referencia}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Fotos */}
                  {formData.fotos.length > 0 && (
                    <div className="bg-white border-2 border-slate-200 rounded-2xl p-4">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Camera className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-slate-500 font-semibold uppercase">Evidencia Fotográfica</p>
                          <p className="text-sm text-slate-700">{formData.fotos.length} imagen{formData.fotos.length !== 1 ? 'es' : ''} adjunta{formData.fotos.length !== 1 ? 's' : ''}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-3 gap-2 mt-3">
                        {formData.fotos.map((foto, index) => (
                          <div key={index} className="relative aspect-square rounded-xl overflow-hidden bg-slate-100">
                            <img
                              src={URL.createObjectURL(foto)}
                              alt={`Foto ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-1 left-1 bg-black/70 text-white text-xs px-2 py-0.5 rounded-lg font-medium">
                              #{index + 1}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Información de Seguimiento */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-3xl p-6">
                <div className="flex gap-3">
                  <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-blue-900 mb-2">Próximos Pasos</p>
                    <ul className="space-y-2 text-xs text-blue-800">
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 flex-shrink-0"></span>
                        <span>Nuestro equipo revisará tu caso en un plazo máximo de 24 horas hábiles</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 flex-shrink-0"></span>
                        <span>Recibirás notificaciones sobre el estado de tu incidencia</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-1.5 flex-shrink-0"></span>
                        <span>Usa el código <strong>{incidenciaRegistrada.codigo}</strong> para consultar el estado</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Botones de Acción */}
              <div className="grid grid-cols-1 gap-3 pt-4">
                <button
                  onClick={handleNuevaIncidencia}
                  className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-200 hover:shadow-xl transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
                >
                  <Home className="w-5 h-5" />
                  Registrar Nueva Incidencia
                </button>
              </div>
            </div>
          )}

          {/* Navigation Buttons - Solo para pasos 1, 2 y 3 */}
          {currentStep !== 4 && (
            <div className="p-6 bg-slate-50 border-t border-slate-200">
              <div className="flex gap-3">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    disabled={isSubmitting}
                    className="flex-1 py-4 px-6 bg-white border-2 border-slate-300 text-slate-700 font-semibold rounded-2xl hover:bg-slate-50 transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Anterior
                  </button>
                )}
                
                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="flex-1 py-4 px-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-2xl hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-200 hover:shadow-xl transition-all duration-200 active:scale-95"
                  >
                    Continuar
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="flex-1 py-4 px-6 bg-gradient-to-r from-green-600 to-green-700 text-white font-semibold rounded-2xl hover:from-green-700 hover:to-green-800 shadow-lg shadow-green-200 hover:shadow-xl transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-700">
                          <div 
                            className="h-full bg-green-800 transition-all duration-300"
                            style={{ width: `${uploadProgress}%` }}
                          />
                        </div>
                        <span className="relative flex items-center justify-center gap-2">
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Enviando... {uploadProgress}%
                        </span>
                      </>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Check className="w-5 h-5" />
                        Enviar Incidencia
                      </span>
                    )}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer Info - Solo mostrar si no está en paso 4 */}
        {currentStep !== 4 && (
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-500 flex items-center justify-center gap-2">
              <Shield className="w-4 h-4" />
              Tus datos están protegidos y encriptados
            </p>
          </div>
        )}
      </div>

      {/* CSS para animaciones */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-slideDown {
          animation: slideDown 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default RegistroIncidencia;