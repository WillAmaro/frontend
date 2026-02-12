
// // "use client";

// // import {
// //   Box,
// //   Typography,
// //   IconButton,
// //   TextField,
// //   Snackbar,
// //   Alert,
// //   Chip,
// //   Avatar,
// // } from "@mui/material";
// // import { useState } from "react";
// // import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
// // import EventNoteIcon from "@mui/icons-material/EventNote";
// // import PersonIcon from "@mui/icons-material/Person";

// // import {
// //   Technician,
// //   ServiceOrder,
// //   Attention,
// // } from "@/src/types/schedule.types";
// // import AttentionCard from "./AttentionCard";
// // import ServiceOrderCard from "./ServicesOrderCard";

// // // ========== DATOS MOCK ==========
// // const mockTechnicians: Technician[] = [
// //   {
// //     id: "tech-1",
// //     name: "Carlos",
// //     lastName: "Rodríguez",
// //     specialization: "Instalación HFC",
// //     isAvailable: true,
// //     color: "#2196F3",
// //   },
// //   {
// //     id: "tech-2",
// //     name: "María",
// //     lastName: "González",
// //     specialization: "Reparación FTTH",
// //     isAvailable: true,
// //     color: "#4CAF50",
// //   },
// //   {
// //     id: "tech-3",
// //     name: "Jorge",
// //     lastName: "Martínez",
// //     specialization: "Instalación DTH",
// //     isAvailable: false,
// //     color: "#FF9800",
// //   },
// //   {
// //     id: "tech-4",
// //     name: "Ana",
// //     lastName: "López",
// //     specialization: "Soporte LTE",
// //     isAvailable: true,
// //     color: "#9C27B0",
// //   },
// // ];

// // const createMockServiceOrders = (): ServiceOrder[] => [
// //   {
// //     id: "so-1",
// //     code: "OS-2024-001",
// //     clientName: "Juan Pérez",
// //     address: "Av. Javier Prado Este 123",
// //     serviceType: "Instalación HFC",
// //     priority: "alta",
// //     estimatedDuration: 134,
// //     materials: ["Cable coaxial", "Modem"],
// //   },
// //   {
// //     id: "so-2",
// //     code: "OS-2024-002",
// //     clientName: "María Torres",
// //     address: "Calle Los Olivos 456",
// //     serviceType: "Reparación",
// //     priority: "media",
// //     estimatedDuration: 120,
// //     materials: ["Conector F"],
// //   },
// //   {
// //     id: "so-3",
// //     code: "OS-2024-003",
// //     clientName: "Roberto Sánchez",
// //     address: "Jr. Las Flores 789",
// //     serviceType: "Instalación FTTH",
// //     priority: "alta",
// //     estimatedDuration: 90,
// //     materials: ["Fibra óptica"],
// //   },
// // ];

// // const generateHours = () => {
// //   const hours = [];
// //   for (let i = 7; i <= 22; i++) {
// //     hours.push(i);
// //   }
// //   return hours;
// // };

// // const HOURS = generateHours();
// // const HOUR_WIDTH = 120;

// // export default function SchedulePage() {
// //   const [selectedDate, setSelectedDate] = useState(
// //     new Date().toISOString().split("T")[0],
// //   );
// //   const [technicians] = useState<Technician[]>(mockTechnicians);
// //   const [serviceOrders, setServiceOrders] = useState<ServiceOrder[]>(
// //     createMockServiceOrders(),
// //   );
// //   const [attentions, setAttentions] = useState<Attention[]>([
// //     {
// //       id: "att-1",
// //       serviceOrderId: "so-1",
// //       technicianId: "tech-1",
// //       date: new Date().toISOString().split("T")[0],
// //       startTime: "09:15",
// //       endTime: "11:29",
// //       status: "programada",
// //       serviceOrder: createMockServiceOrders()[0],
// //     },
// //     {
// //       id: "att-2",
// //       serviceOrderId: "so-2",
// //       technicianId: "tech-1",
// //       date: new Date().toISOString().split("T")[0],
// //       startTime: "13:00",
// //       endTime: "15:00",
// //       status: "programada",
// //       serviceOrder: createMockServiceOrders()[1],
// //     },
// //   ]);

// //   const [draggedOrder, setDraggedOrder] = useState<ServiceOrder | null>(null);
// //   const [dragOverSlot, setDragOverSlot] = useState<{
// //     technicianId: string;
// //     hour: number;
// //   } | null>(null);
// //   const [snackbar, setSnackbar] = useState({
// //     open: false,
// //     message: "",
// //     severity: "success" as "success" | "error" | "info" | "warning",
// //   });

// //   const timeToMinutes = (time: string): number => {
// //     const [hours, minutes] = time.split(":").map(Number);
// //     return hours * 60 + minutes;
// //   };

// //   const getAttentionStyle = (attention: Attention) => {
// //     const startMinutes = timeToMinutes(attention.startTime);
// //     const endMinutes = timeToMinutes(attention.endTime);
// //     const duration = endMinutes - startMinutes;

// //     const startOfDay = 7 * 60;
// //     const leftOffset = ((startMinutes - startOfDay) / 60) * HOUR_WIDTH;
// //     const width = (duration / 60) * HOUR_WIDTH;

// //     return {
// //       left: `${leftOffset}px`,
// //       width: `${width}px`,
// //       position: "absolute" as const,
// //       height: "calc(100% - 8px)",
// //       top: "4px",
// //     };
// //   };

// //   const getPreviewStyle = (hour: number, duration: number) => {
// //     const startOfDay = 7 * 60;
// //     const leftOffset = ((hour * 60 - startOfDay) / 60) * HOUR_WIDTH;
// //     const width = (duration / 60) * HOUR_WIDTH;

// //     return {
// //       left: `${leftOffset}px`,
// //       width: `${width}px`,
// //       position: "absolute" as const,
// //       height: "calc(100% - 8px)",
// //       top: "4px",
// //     };
// //   };

// //   const getPriorityColor = (priority: string) => {
// //     switch (priority) {
// //       case "alta":
// //         return "#F44336";
// //       case "media":
// //         return "#FF9800";
// //       case "baja":
// //         return "#4CAF50";
// //       default:
// //         return "#2196F3";
// //     }
// //   };

// //   const handleDragEnter = (technicianId: string, hour: number) => {
// //     if (draggedOrder) {
// //       setDragOverSlot({ technicianId, hour });
// //     }
// //   };

// //   const handleDragLeave = () => {
// //     setDragOverSlot(null);
// //   };

// //   const handleDrop = (technicianId: string, hour: number) => {
// //     if (!draggedOrder) return;

// //     const startTime = `${hour.toString().padStart(2, "0")}:00`;
// //     const durationHours = draggedOrder.estimatedDuration / 60;
// //     const endHour = hour + durationHours;
// //     const endMinutes = (durationHours % 1) * 60;
// //     const endTime = `${Math.floor(endHour)
// //       .toString()
// //       .padStart(2, "0")}:${Math.floor(endMinutes).toString().padStart(2, "0")}`;

// //     const newAttention: Attention = {
// //       id: `att-${Date.now()}`,
// //       serviceOrderId: draggedOrder.id,
// //       technicianId,
// //       date: selectedDate,
// //       startTime,
// //       endTime,
// //       status: "programada",
// //       serviceOrder: draggedOrder,
// //     };

// //     setAttentions([...attentions, newAttention]);
// //     setServiceOrders(serviceOrders.filter((o) => o.id !== draggedOrder.id));
// //     setDraggedOrder(null);
// //     setDragOverSlot(null);

// //     setSnackbar({
// //       open: true,
// //       message: "✅ Atención programada",
// //       severity: "success",
// //     });
// //   };

// //   const handleStartAttention = (attention: Attention) => {
// //     const updated = attentions.map((att) =>
// //       att.id === attention.id ? { ...att, status: "en_curso" as const } : att,
// //     );
// //     setAttentions(updated);
// //     setSnackbar({
// //       open: true,
// //       message: "🔄 Atención iniciada",
// //       severity: "info",
// //     });
// //   };

// //   const handleCompleteAttention = (attention: Attention) => {
// //     const updated = attentions.map((att) =>
// //       att.id === attention.id ? { ...att, status: "completada" as const } : att,
// //     );
// //     setAttentions(updated);
// //     setSnackbar({ open: true, message: "✅ Completada", severity: "success" });
// //   };

// //   const handleDeleteAttention = (attention: Attention) => {
// //     if (!confirm("¿Cancelar atención?")) return;
// //     setServiceOrders([...serviceOrders, attention.serviceOrder]);
// //     setAttentions(attentions.filter((att) => att.id !== attention.id));
// //     setSnackbar({ open: true, message: "🗑️ Cancelada", severity: "info" });
// //   };

// //   return (
// //     <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
// //       {/* Sidebar */}
// //       <Box
// //         sx={{
// //           flexShrink: 0,
// //           p: 2,
// //           width: 300,
// //           background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
// //           borderRight: "1px solid rgba(255, 255, 255, 0.1)",
// //         }}
// //       >
// //         <Typography variant="h6" fontWeight={700} gutterBottom color="white">
// //           📋 Órdenes Pendientes
// //         </Typography>
// //         <Typography variant="caption" color="white">
// //           Arrastra al calendario
// //         </Typography>
// //         <Box
// //           sx={{ mt: 2, maxHeight: "calc(100vh - 150px)", overflowY: "auto" }}
// //         >
// //           {serviceOrders.map((order) => (
// //             <ServiceOrderCard
// //               key={order.id}
// //               serviceOrder={order}
// //               onDragStart={setDraggedOrder}
// //               onDragEnd={() => setDragOverSlot(null)}
// //             />
// //           ))}
// //           {serviceOrders.length === 0 && (
// //             <Box sx={{ textAlign: "center", py: 4, color: "text.secondary" }}>
// //               <EventNoteIcon sx={{ fontSize: 48, opacity: 0.3 }} />
// //               <Typography variant="body2">Sin órdenes</Typography>
// //             </Box>
// //           )}
// //         </Box>
// //       </Box>

// //       {/* Main Content */}
// //       <Box
// //         sx={{
// //           flex: 1,
// //           display: "flex",
// //           flexDirection: "column",
// //           overflow: "hidden",
// //         }}
// //       >
// //         {/* Header */}
// //         <Box
// //           sx={{
// //             background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
// //             p: 2,
// //             borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
// //           }}
// //         >
// //           <Box
// //             display="flex"
// //             justifyContent="space-between"
// //             alignItems="center"
// //           >
// //             <Box display="flex" alignItems="center" gap={2}>
// //               <CalendarTodayIcon sx={{ fontSize: 28, color: "primary.main" }} />
// //               <Box>
// //                 <Typography variant="h5" fontWeight={700} color="white">
// //                   Planificación de OTS
// //                 </Typography>
// //                 <Typography variant="caption" color="white">
// //                   Vista horizontal por horas
// //                 </Typography>
// //               </Box>
// //             </Box>
// //             <TextField
// //               type="date"
// //               value={selectedDate}
// //               onChange={(e) => setSelectedDate(e.target.value)}
// //               size="small"
// //               sx={{
// //                 background: "white",
// //                 borderRadius: "12px",
// //               }}
// //             />
// //           </Box>
// //         </Box>

// //         {/* Calendar Grid */}
// //         <Box sx={{ flex: 1, overflow: "auto" }}>
// //           <Box sx={{ minWidth: "max-content" }}>
// //             {/* Hour Headers */}
// //             <Box sx={{ display: "flex", position: "sticky", top: 0, zIndex: 10 }}>
// //               <Box
// //                 sx={{
// //                   width: 200,
// //                   background: "rgba(26, 26, 46, 0.95)",
// //                   borderRight: "2px solid rgba(255, 255, 255, 0.1)",
// //                   borderBottom: "2px solid rgba(255, 255, 255, 0.1)",
// //                   p: 1,
// //                   color: "white",
// //                 }}
// //               >
// //                 <Typography variant="subtitle2" fontWeight={700}>
// //                   Técnicos
// //                 </Typography>
// //               </Box>
// //               {HOURS.map((hour) => (
// //                 <Box
// //                   key={hour}
// //                   sx={{
// //                     width: HOUR_WIDTH,
// //                     borderRight: "1px solid rgba(255, 255, 255, 0.05)",
// //                     borderBottom: "2px solid rgba(255, 255, 255, 0.1)",
// //                     background: "rgba(26, 26, 46, 0.95)",
// //                     display: "flex",
// //                     alignItems: "center",
// //                     justifyContent: "center",
// //                   }}
// //                 >
// //                   <Typography variant="body2" fontWeight={600} color="white">
// //                     {hour}:00
// //                   </Typography>
// //                 </Box>
// //               ))}
// //             </Box>

// //             {/* Technician Rows */}
// //             {technicians.map((tech) => (
// //               <Box
// //                 key={tech.id}
// //                 sx={{
// //                   display: "flex",
// //                   position: "relative",
// //                   borderBottom: "1px solid #e0e0e0",
// //                 }}
// //               >
// //                 {/* Technician Column */}
// //                 <Box
// //                   sx={{
// //                     width: 200,
// //                     minHeight: 100,
// //                     borderRight: "2px solid rgba(255, 255, 255, 0.1)",
// //                     borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
// //                     p: 1.5,
// //                     background: "rgba(255, 255, 255, 0.02)",
// //                   }}
// //                 >
// //                   <Box display="flex" alignItems="center" gap={1}>
// //                     <Avatar sx={{ bgcolor: tech.color, width: 36, height: 36 }}>
// //                       <PersonIcon fontSize="small" />
// //                     </Avatar>
// //                     <Box>
// //                       <Typography variant="body2" fontWeight={700}>
// //                         {tech.name} {tech.lastName}
// //                       </Typography>
// //                       <Typography variant="caption" color="text.secondary">
// //                         {tech.specialization}
// //                       </Typography>
// //                     </Box>
// //                   </Box>
// //                   <Chip
// //                     label={tech.isAvailable ? "Disponible" : "Ocupado"}
// //                     size="small"
// //                     color={tech.isAvailable ? "success" : "default"}
// //                     sx={{ mt: 1, fontSize: "0.7rem" }}
// //                   />
// //                 </Box>

// //                 {/* Hour Grid */}
// //                 <Box sx={{ display: "flex", position: "relative", flex: 1 }}>
// //                   {HOURS.map((hour) => (
// //                     <Box
// //                       key={hour}
// //                       onDragOver={(e) => e.preventDefault()}
// //                       onDragEnter={() => handleDragEnter(tech.id, hour)}
// //                       onDragLeave={handleDragLeave}
// //                       onDrop={() => handleDrop(tech.id, hour)}
// //                       sx={{
// //                         width: HOUR_WIDTH,
// //                         minHeight: 100,
// //                         borderRight: "1px solid rgba(255, 255, 255, 0.05)",
// //                         borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
// //                         background:
// //                           dragOverSlot?.technicianId === tech.id &&
// //                           dragOverSlot?.hour === hour
// //                             ? "rgba(33, 150, 243, 0.15)"
// //                             : "transparent",
// //                         transition: "background 0.2s ease",
// //                         "&:hover": {
// //                           background: draggedOrder
// //                             ? "rgba(255, 255, 255, 0.05)"
// //                             : "rgba(255, 255, 255, 0.02)",
// //                         },
// //                       }}
// //                     />
// //                   ))}

// //                   {/* Preview Ghost cuando está por soltar */}
// //                   {draggedOrder &&
// //                     dragOverSlot?.technicianId === tech.id &&
// //                     dragOverSlot?.hour && (
// //                       <Box
// //                         sx={{
// //                           ...getPreviewStyle(
// //                             dragOverSlot.hour,
// //                             draggedOrder.estimatedDuration,
// //                           ),
// //                           background: `linear-gradient(135deg, ${getPriorityColor(
// //                             draggedOrder.priority,
// //                           )}40 0%, ${getPriorityColor(draggedOrder.priority)}60 100%)`,
// //                           border: `3px dashed ${getPriorityColor(draggedOrder.priority)}`,
// //                           borderRadius: 2,
// //                           p: 1.5,
// //                           pointerEvents: "none",
// //                           animation: "pulse 1.5s ease-in-out infinite",
// //                           "@keyframes pulse": {
// //                             "0%, 100%": {
// //                               opacity: 0.6,
// //                             },
// //                             "50%": {
// //                               opacity: 0.9,
// //                             },
// //                           },
// //                         }}
// //                       >
// //                         <Typography variant="body2" fontWeight={700} color="white">
// //                           {draggedOrder.code}
// //                         </Typography>
// //                         <Typography variant="caption" color="white">
// //                           {draggedOrder.clientName}
// //                         </Typography>
// //                         <Box
// //                           display="flex"
// //                           gap={0.5}
// //                           mt={0.5}
// //                           sx={{
// //                             background: "rgba(0,0,0,0.3)",
// //                             p: 0.5,
// //                             borderRadius: 1,
// //                           }}
// //                         >
// //                           <Typography variant="caption" fontWeight={600} color="white">
// //                             {dragOverSlot.hour}:00 -{" "}
// //                             {Math.floor(
// //                               dragOverSlot.hour + draggedOrder.estimatedDuration / 60,
// //                             )}
// //                             :
// //                             {Math.floor(
// //                               ((draggedOrder.estimatedDuration / 60) % 1) * 60,
// //                             )
// //                               .toString()
// //                               .padStart(2, "0")}
// //                           </Typography>
// //                         </Box>
// //                       </Box>
// //                     )}

// //                   {/* Actual Attentions */}
// //                   {attentions
// //                     .filter(
// //                       (att) =>
// //                         att.technicianId === tech.id && att.date === selectedDate,
// //                     )
// //                     .map((attention) => (
// //                       <Box key={attention.id} sx={getAttentionStyle(attention)}>
// //                         <AttentionCard
// //                           attention={attention}
// //                           technicianColor={tech.color}
// //                           onEdit={() => console.log("Edit")}
// //                           onDelete={() => handleDeleteAttention(attention)}
// //                           onStart={() => handleStartAttention(attention)}
// //                           onComplete={() => handleCompleteAttention(attention)}
// //                         />
// //                       </Box>
// //                     ))}
// //                 </Box>
// //               </Box>
// //             ))}
// //           </Box>
// //         </Box>
// //       </Box>

// //       {/* Snackbar */}
// //       <Snackbar
// //         open={snackbar.open}
// //         autoHideDuration={3000}
// //         onClose={() => setSnackbar({ ...snackbar, open: false })}
// //         anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
// //       >
// //         <Alert
// //           onClose={() => setSnackbar({ ...snackbar, open: false })}
// //           severity={snackbar.severity}
// //           variant="filled"
// //         >
// //           {snackbar.message}
// //         </Alert>
// //       </Snackbar>
// //     </Box>
// //   );
// // }
// "use client";

// import {
//   Box,
//   Typography,
//   IconButton,
//   TextField,
//   Snackbar,
//   Alert,
//   Chip,
//   Avatar,
// } from "@mui/material";
// import { useState } from "react";
// import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
// import EventNoteIcon from "@mui/icons-material/EventNote";
// import PersonIcon from "@mui/icons-material/Person";

// import {
//   Technician,
//   ServiceOrder,
//   Attention,
// } from "@/src/types/schedule.types";
// import AttentionCard from "./AttentionCard";
// import ServiceOrderCard from "./ServicesOrderCard";

// // ========== DATOS MOCK EXPANDIDOS ==========
// const mockTechnicians: Technician[] = [
//   {
//     id: "tech-1",
//     name: "Carlos",
//     lastName: "Rodríguez",
//     specialization: "Instalación HFC",
//     isAvailable: true,
//     color: "#2196F3",
//   },
//   {
//     id: "tech-2",
//     name: "María",
//     lastName: "González",
//     specialization: "Reparación FTTH",
//     isAvailable: true,
//     color: "#4CAF50",
//   },
//   {
//     id: "tech-3",
//     name: "Jorge",
//     lastName: "Martínez",
//     specialization: "Instalación DTH",
//     isAvailable: true,
//     color: "#FF9800",
//   },
//   {
//     id: "tech-4",
//     name: "Ana",
//     lastName: "López",
//     specialization: "Soporte LTE",
//     isAvailable: true,
//     color: "#9C27B0",
//   },
//   {
//     id: "tech-5",
//     name: "Pedro",
//     lastName: "Ramírez",
//     specialization: "Instalación HFC",
//     isAvailable: true,
//     color: "#E91E63",
//   },
//   {
//     id: "tech-6",
//     name: "Laura",
//     lastName: "Fernández",
//     specialization: "Mantenimiento FTTH",
//     isAvailable: true,
//     color: "#00BCD4",
//   },
//   {
//     id: "tech-7",
//     name: "Roberto",
//     lastName: "Silva",
//     specialization: "Instalación LTE",
//     isAvailable: true,
//     color: "#FF5722",
//   },
//   {
//     id: "tech-8",
//     name: "Carmen",
//     lastName: "Vargas",
//     specialization: "Reparación DTH",
//     isAvailable: true,
//     color: "#673AB7",
//   },
// ];

// const createMockServiceOrders = (): ServiceOrder[] => [
//   // Órdenes para asignar (pendientes)
//   {
//     id: "so-pending-1",
//     code: "OS-025",
//     clientName: "Ricardo Flores",
//     address: "Av. Colonial 891",
//     serviceType: "Instalación HFC",
//     priority: "alta",
//     estimatedDuration: 90,
//     materials: ["Cable coaxial", "Modem", "Splitter"],
//   },
//   {
//     id: "so-pending-2",
//     code: "OS-026",
//     clientName: "Sofía Mendoza",
//     address: "Calle San Martín 234",
//     serviceType: "Reparación",
//     priority: "media",
//     estimatedDuration: 60,
//     materials: ["Conector F"],
//   },
//   {
//     id: "so-pending-3",
//     code: "OS-027",
//     clientName: "Luis Castro",
//     address: "Jr. Tacna 567",
//     serviceType: "Instalación FTTH",
//     priority: "alta",
//     estimatedDuration: 120,
//     materials: ["Fibra óptica", "ONT"],
//   },
//   {
//     id: "so-pending-4",
//     code: "OS-028",
//     clientName: "Patricia Rojas",
//     address: "Av. Brasil 1234",
//     serviceType: "Mantenimiento",
//     priority: "baja",
//     estimatedDuration: 45,
//     materials: ["Herramientas"],
//   },
//   {
//     id: "so-pending-5",
//     code: "OS-029",
//     clientName: "Miguel Ángel Torres",
//     address: "Calle Lima 890",
//     serviceType: "Instalación DTH",
//     priority: "media",
//     estimatedDuration: 75,
//     materials: ["Antena", "Decodificador"],
//   },
  
//   // Órdenes ya programadas (para crear attentions)
//   {
//     id: "so-1",
//     code: "OS-001",
//     clientName: "Juan Pérez",
//     address: "Av. Javier Prado Este 123",
//     serviceType: "Instalación HFC",
//     priority: "alta",
//     estimatedDuration: 120,
//     materials: ["Cable coaxial", "Modem"],
//   },
//   {
//     id: "so-2",
//     code: "OS-002",
//     clientName: "María Torres",
//     address: "Calle Los Olivos 456",
//     serviceType: "Reparación",
//     priority: "media",
//     estimatedDuration: 90,
//     materials: ["Conector F"],
//   },
//   {
//     id: "so-3",
//     code: "OS-003",
//     clientName: "Roberto Sánchez",
//     address: "Jr. Las Flores 789",
//     serviceType: "Instalación FTTH",
//     priority: "alta",
//     estimatedDuration: 150,
//     materials: ["Fibra óptica"],
//   },
//   {
//     id: "so-4",
//     code: "OS-004",
//     clientName: "Elena Morales",
//     address: "Av. Arequipa 321",
//     serviceType: "Mantenimiento",
//     priority: "baja",
//     estimatedDuration: 60,
//     materials: ["Cable", "Conectores"],
//   },
//   {
//     id: "so-5",
//     code: "OS-005",
//     clientName: "Fernando Díaz",
//     address: "Calle Miraflores 654",
//     serviceType: "Instalación LTE",
//     priority: "alta",
//     estimatedDuration: 105,
//     materials: ["Router LTE", "Antena"],
//   },
//   {
//     id: "so-6",
//     code: "OS-006",
//     clientName: "Gabriela Ruiz",
//     address: "Jr. Puno 987",
//     serviceType: "Reparación",
//     priority: "media",
//     estimatedDuration: 75,
//     materials: ["Splitter"],
//   },
//   {
//     id: "so-7",
//     code: "OS-007",
//     clientName: "Andrés Vega",
//     address: "Av. La Marina 456",
//     serviceType: "Instalación DTH",
//     priority: "alta",
//     estimatedDuration: 90,
//     materials: ["Antena parabólica", "Decodificador"],
//   },
//   {
//     id: "so-8",
//     code: "OS-008",
//     clientName: "Valeria Campos",
//     address: "Calle Benavides 789",
//     serviceType: "Soporte técnico",
//     priority: "media",
//     estimatedDuration: 120,
//     materials: [],
//   },
//   {
//     id: "so-9",
//     code: "OS-009",
//     clientName: "Daniel Herrera",
//     address: "Av. Universitaria 234",
//     serviceType: "Instalación FTTH",
//     priority: "alta",
//     estimatedDuration: 135,
//     materials: ["Fibra óptica", "ONT", "Router"],
//   },
//   {
//     id: "so-10",
//     code: "OS-010",
//     clientName: "Isabel Paredes",
//     address: "Jr. Cusco 567",
//     serviceType: "Reparación",
//     priority: "media",
//     estimatedDuration: 60,
//     materials: ["Cable coaxial"],
//   },
//   {
//     id: "so-11",
//     code: "OS-011",
//     clientName: "Raúl Méndez",
//     address: "Av. Venezuela 890",
//     serviceType: "Instalación HFC",
//     priority: "alta",
//     estimatedDuration: 105,
//     materials: ["Modem", "Cable"],
//   },
//   {
//     id: "so-12",
//     code: "OS-012",
//     clientName: "Claudia Quispe",
//     address: "Calle Grau 123",
//     serviceType: "Mantenimiento",
//     priority: "baja",
//     estimatedDuration: 90,
//     materials: ["Conectores"],
//   },
//   {
//     id: "so-13",
//     code: "OS-013",
//     clientName: "Alberto Cáceres",
//     address: "Av. Salaverry 456",
//     serviceType: "Instalación LTE",
//     priority: "media",
//     estimatedDuration: 120,
//     materials: ["Router LTE"],
//   },
//   {
//     id: "so-14",
//     code: "OS-014",
//     clientName: "Rosa Chávez",
//     address: "Jr. Ayacucho 789",
//     serviceType: "Reparación",
//     priority: "alta",
//     estimatedDuration: 75,
//     materials: ["Amplificador"],
//   },
//   {
//     id: "so-15",
//     code: "OS-015",
//     clientName: "Ernesto Puma",
//     address: "Av. Angamos 321",
//     serviceType: "Instalación DTH",
//     priority: "media",
//     estimatedDuration: 90,
//     materials: ["Antena", "Cable"],
//   },
//   {
//     id: "so-16",
//     code: "OS-016",
//     clientName: "Teresa Arias",
//     address: "Calle Alfonso Ugarte 654",
//     serviceType: "Soporte técnico",
//     priority: "baja",
//     estimatedDuration: 60,
//     materials: [],
//   },
//   {
//     id: "so-17",
//     code: "OS-017",
//     clientName: "Julio Espinoza",
//     address: "Av. República 987",
//     serviceType: "Instalación FTTH",
//     priority: "alta",
//     estimatedDuration: 150,
//     materials: ["Fibra óptica", "ONT"],
//   },
//   {
//     id: "so-18",
//     code: "OS-018",
//     clientName: "Mónica Carrillo",
//     address: "Jr. Junín 234",
//     serviceType: "Reparación",
//     priority: "media",
//     estimatedDuration: 60,
//     materials: ["Conector F"],
//   },
//   {
//     id: "so-19",
//     code: "OS-019",
//     clientName: "Oscar Maldonado",
//     address: "Av. Larco 567",
//     serviceType: "Instalación HFC",
//     priority: "alta",
//     estimatedDuration: 120,
//     materials: ["Modem", "Splitter"],
//   },
//   {
//     id: "so-20",
//     code: "OS-020",
//     clientName: "Silvia Ramos",
//     address: "Calle Schell 890",
//     serviceType: "Mantenimiento",
//     priority: "media",
//     estimatedDuration: 75,
//     materials: ["Herramientas"],
//   },
//   {
//     id: "so-21",
//     code: "OS-021",
//     clientName: "Héctor Ibarra",
//     address: "Av. Petit Thouars 123",
//     serviceType: "Instalación LTE",
//     priority: "alta",
//     estimatedDuration: 105,
//     materials: ["Router LTE", "Antena"],
//   },
//   {
//     id: "so-22",
//     code: "OS-022",
//     clientName: "Pilar Guzmán",
//     address: "Jr. Lampa 456",
//     serviceType: "Reparación",
//     priority: "baja",
//     estimatedDuration: 60,
//     materials: ["Cable"],
//   },
//   {
//     id: "so-23",
//     code: "OS-023",
//     clientName: "Gonzalo Núñez",
//     address: "Av. Arenales 789",
//     serviceType: "Instalación DTH",
//     priority: "media",
//     estimatedDuration: 90,
//     materials: ["Decodificador"],
//   },
//   {
//     id: "so-24",
//     code: "OS-024",
//     clientName: "Beatriz Salazar",
//     address: "Calle Bolívar 321",
//     serviceType: "Soporte técnico",
//     priority: "alta",
//     estimatedDuration: 60,
//     materials: [],
//   },
// ];

// const createInitialAttentions = (): Attention[] => {
//   const today = new Date().toISOString().split("T")[0];
//   const allOrders = createMockServiceOrders();
  
//   return [
//     // Carlos Rodríguez (tech-1) - 3 órdenes
//     {
//       id: "att-1",
//       serviceOrderId: "so-1",
//       technicianId: "tech-1",
//       date: today,
//       startTime: "08:00",
//       endTime: "10:00",
//       status: "completada",
//       serviceOrder: allOrders.find(o => o.id === "so-1")!,
//     },
//     {
//       id: "att-2",
//       serviceOrderId: "so-2",
//       technicianId: "tech-1",
//       date: today,
//       startTime: "10:30",
//       endTime: "12:00",
//       status: "en_curso",
//       serviceOrder: allOrders.find(o => o.id === "so-2")!,
//     },
//     {
//       id: "att-3",
//       serviceOrderId: "so-11",
//       technicianId: "tech-1",
//       date: today,
//       startTime: "13:00",
//       endTime: "14:45",
//       status: "programada",
//       serviceOrder: allOrders.find(o => o.id === "so-11")!,
//     },
    
//     // María González (tech-2) - 4 órdenes
//     {
//       id: "att-4",
//       serviceOrderId: "so-3",
//       technicianId: "tech-2",
//       date: today,
//       startTime: "08:00",
//       endTime: "10:30",
//       status: "completada",
//       serviceOrder: allOrders.find(o => o.id === "so-3")!,
//     },
//     {
//       id: "att-5",
//       serviceOrderId: "so-6",
//       technicianId: "tech-2",
//       date: today,
//       startTime: "11:00",
//       endTime: "12:15",
//       status: "programada",
//       serviceOrder: allOrders.find(o => o.id === "so-6")!,
//     },
//     {
//       id: "att-6",
//       serviceOrderId: "so-10",
//       technicianId: "tech-2",
//       date: today,
//       startTime: "13:00",
//       endTime: "14:00",
//       status: "programada",
//       serviceOrder: allOrders.find(o => o.id === "so-10")!,
//     },
//     {
//       id: "att-7",
//       serviceOrderId: "so-14",
//       technicianId: "tech-2",
//       date: today,
//       startTime: "14:30",
//       endTime: "15:45",
//       status: "programada",
//       serviceOrder: allOrders.find(o => o.id === "so-14")!,
//     },
    
//     // Jorge Martínez (tech-3) - 3 órdenes
//     {
//       id: "att-8",
//       serviceOrderId: "so-7",
//       technicianId: "tech-3",
//       date: today,
//       startTime: "09:00",
//       endTime: "10:30",
//       status: "completada",
//       serviceOrder: allOrders.find(o => o.id === "so-7")!,
//     },
//     {
//       id: "att-9",
//       serviceOrderId: "so-15",
//       technicianId: "tech-3",
//       date: today,
//       startTime: "11:00",
//       endTime: "12:30",
//       status: "programada",
//       serviceOrder: allOrders.find(o => o.id === "so-15")!,
//     },
//     {
//       id: "att-10",
//       serviceOrderId: "so-23",
//       technicianId: "tech-3",
//       date: today,
//       startTime: "14:00",
//       endTime: "15:30",
//       status: "programada",
//       serviceOrder: allOrders.find(o => o.id === "so-23")!,
//     },
    
//     // Ana López (tech-4) - 4 órdenes
//     {
//       id: "att-11",
//       serviceOrderId: "so-4",
//       technicianId: "tech-4",
//       date: today,
//       startTime: "08:00",
//       endTime: "09:00",
//       status: "completada",
//       serviceOrder: allOrders.find(o => o.id === "so-4")!,
//     },
//     {
//       id: "att-12",
//       serviceOrderId: "so-8",
//       technicianId: "tech-4",
//       date: today,
//       startTime: "09:00",
//       endTime: "10:15",
//       status: "en_curso",
//       serviceOrder: allOrders.find(o => o.id === "so-8")!,
//     },
//     {
//       id: "att-13",
//       serviceOrderId: "so-16",
//       technicianId: "tech-4",
//       date: today,
//       startTime: "11:00",
//       endTime: "12:00",
//       status: "programada",
//       serviceOrder: allOrders.find(o => o.id === "so-16")!,
//     },
//     {
//       id: "att-14",
//       serviceOrderId: "so-24",
//       technicianId: "tech-4",
//       date: today,
//       startTime: "13:00",
//       endTime: "14:00",
//       status: "programada",
//       serviceOrder: allOrders.find(o => o.id === "so-24")!,
//     },
    
//     // Pedro Ramírez (tech-5) - 3 órdenes
//     {
//       id: "att-15",
//       serviceOrderId: "so-5",
//       technicianId: "tech-5",
//       date: today,
//       startTime: "08:30",
//       endTime: "10:15",
//       status: "completada",
//       serviceOrder: allOrders.find(o => o.id === "so-5")!,
//     },
//     {
//       id: "att-16",
//       serviceOrderId: "so-13",
//       technicianId: "tech-5",
//       date: today,
//       startTime: "11:00",
//       endTime: "13:00",
//       status: "programada",
//       serviceOrder: allOrders.find(o => o.id === "so-13")!,
//     },
//     {
//       id: "att-17",
//       serviceOrderId: "so-21",
//       technicianId: "tech-5",
//       date: today,
//       startTime: "14:00",
//       endTime: "15:45",
//       status: "programada",
//       serviceOrder: allOrders.find(o => o.id === "so-21")!,
//     },
    
//     // Laura Fernández (tech-6) - 4 órdenes
//     {
//       id: "att-18",
//       serviceOrderId: "so-9",
//       technicianId: "tech-6",
//       date: today,
//       startTime: "08:00",
//       endTime: "10:15",
//       status: "completada",
//       serviceOrder: allOrders.find(o => o.id === "so-9")!,
//     },
//     {
//       id: "att-19",
//       serviceOrderId: "so-12",
//       technicianId: "tech-6",
//       date: today,
//       startTime: "10:45",
//       endTime: "12:15",
//       status: "programada",
//       serviceOrder: allOrders.find(o => o.id === "so-12")!,
//     },
//     {
//       id: "att-20",
//       serviceOrderId: "so-17",
//       technicianId: "tech-6",
//       date: today,
//       startTime: "13:00",
//       endTime: "15:30",
//       status: "programada",
//       serviceOrder: allOrders.find(o => o.id === "so-17")!,
//     },
//     {
//       id: "att-21",
//       serviceOrderId: "so-20",
//       technicianId: "tech-6",
//       date: today,
//       startTime: "16:00",
//       endTime: "17:15",
//       status: "programada",
//       serviceOrder: allOrders.find(o => o.id === "so-20")!,
//     },
    
//     // Roberto Silva (tech-7) - 3 órdenes
//     {
//       id: "att-22",
//       serviceOrderId: "so-18",
//       technicianId: "tech-7",
//       date: today,
//       startTime: "09:00",
//       endTime: "10:00",
//       status: "completada",
//       serviceOrder: allOrders.find(o => o.id === "so-18")!,
//     },
//     {
//       id: "att-23",
//       serviceOrderId: "so-19",
//       technicianId: "tech-7",
//       date: today,
//       startTime: "10:30",
//       endTime: "12:30",
//       status: "en_curso",
//       serviceOrder: allOrders.find(o => o.id === "so-19")!,
//     },
//     {
//       id: "att-24",
//       serviceOrderId: "so-22",
//       technicianId: "tech-7",
//       date: today,
//       startTime: "13:30",
//       endTime: "14:30",
//       status: "programada",
//       serviceOrder: allOrders.find(o => o.id === "so-22")!,
//     },
    
//     // Carmen Vargas (tech-8) - 2 órdenes (menos cargada)
//     {
//       id: "att-25",
//       serviceOrderId: "so-19",
//       technicianId: "tech-8",
//       date: today,
//       startTime: "09:00",
//       endTime: "11:00",
//       status: "completada",
//       serviceOrder: allOrders.find(o => o.id === "so-19")!,
//     },
//     {
//       id: "att-26",
//       serviceOrderId: "so-24",
//       technicianId: "tech-8",
//       date: today,
//       startTime: "14:00",
//       endTime: "15:00",
//       status: "programada",
//       serviceOrder: allOrders.find(o => o.id === "so-24")!,
//     },
//   ];
// };

// const generateHours = () => {
//   const hours = [];
//   for (let i = 7; i <= 22; i++) {
//     hours.push(i);
//   }
//   return hours;
// };

// const HOURS = generateHours();
// const HOUR_WIDTH = 120;

// export default function SchedulePage() {
//   const [selectedDate, setSelectedDate] = useState(
//     new Date().toISOString().split("T")[0],
//   );
//   const [technicians] = useState<Technician[]>(mockTechnicians);
  
//   // Filtrar solo las órdenes pendientes (las primeras 5)
//   const allOrders = createMockServiceOrders();
//   const [serviceOrders, setServiceOrders] = useState<ServiceOrder[]>(
//     allOrders.filter(order => order.id.startsWith("so-pending"))
//   );
  
//   const [attentions, setAttentions] = useState<Attention[]>(
//     createInitialAttentions()
//   );

//   const [draggedOrder, setDraggedOrder] = useState<ServiceOrder | null>(null);
//   const [dragOverSlot, setDragOverSlot] = useState<{
//     technicianId: string;
//     hour: number;
//   } | null>(null);
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: "",
//     severity: "success" as "success" | "error" | "info" | "warning",
//   });

//   const timeToMinutes = (time: string): number => {
//     const [hours, minutes] = time.split(":").map(Number);
//     return hours * 60 + minutes;
//   };

//   const getAttentionStyle = (attention: Attention) => {
//     const startMinutes = timeToMinutes(attention.startTime);
//     const endMinutes = timeToMinutes(attention.endTime);
//     const duration = endMinutes - startMinutes;

//     const startOfDay = 7 * 60;
//     const leftOffset = ((startMinutes - startOfDay) / 60) * HOUR_WIDTH;
//     const width = (duration / 60) * HOUR_WIDTH;

//     return {
//       left: `${leftOffset}px`,
//       width: `${width}px`,
//       position: "absolute" as const,
//       height: "calc(100% - 8px)",
//       top: "4px",
//     };
//   };

//   const getPreviewStyle = (hour: number, duration: number) => {
//     const startOfDay = 7 * 60;
//     const leftOffset = ((hour * 60 - startOfDay) / 60) * HOUR_WIDTH;
//     const width = (duration / 60) * HOUR_WIDTH;

//     return {
//       left: `${leftOffset}px`,
//       width: `${width}px`,
//       position: "absolute" as const,
//       height: "calc(100% - 8px)",
//       top: "4px",
//     };
//   };

//   const getPriorityColor = (priority: string) => {
//     switch (priority) {
//       case "alta":
//         return "#F44336";
//       case "media":
//         return "#FF9800";
//       case "baja":
//         return "#4CAF50";
//       default:
//         return "#2196F3";
//     }
//   };

//   const handleDragEnter = (technicianId: string, hour: number) => {
//     if (draggedOrder) {
//       setDragOverSlot({ technicianId, hour });
//     }
//   };

//   const handleDragLeave = () => {
//     setDragOverSlot(null);
//   };

//   const handleDrop = (technicianId: string, hour: number) => {
//     if (!draggedOrder) return;

//     const startTime = `${hour.toString().padStart(2, "0")}:00`;
//     const durationHours = draggedOrder.estimatedDuration / 60;
//     const endHour = hour + durationHours;
//     const endMinutes = (durationHours % 1) * 60;
//     const endTime = `${Math.floor(endHour)
//       .toString()
//       .padStart(2, "0")}:${Math.floor(endMinutes).toString().padStart(2, "0")}`;

//     const newAttention: Attention = {
//       id: `att-${Date.now()}`,
//       serviceOrderId: draggedOrder.id,
//       technicianId,
//       date: selectedDate,
//       startTime,
//       endTime,
//       status: "programada",
//       serviceOrder: draggedOrder,
//     };

//     setAttentions([...attentions, newAttention]);
//     setServiceOrders(serviceOrders.filter((o) => o.id !== draggedOrder.id));
//     setDraggedOrder(null);
//     setDragOverSlot(null);

//     setSnackbar({
//       open: true,
//       message: "✅ Atención programada",
//       severity: "success",
//     });
//   };

//   const handleStartAttention = (attention: Attention) => {
//     const updated = attentions.map((att) =>
//       att.id === attention.id ? { ...att, status: "en_curso" as const } : att,
//     );
//     setAttentions(updated);
//     setSnackbar({
//       open: true,
//       message: "🔄 Atención iniciada",
//       severity: "info",
//     });
//   };

//   const handleCompleteAttention = (attention: Attention) => {
//     const updated = attentions.map((att) =>
//       att.id === attention.id ? { ...att, status: "completada" as const } : att,
//     );
//     setAttentions(updated);
//     setSnackbar({ open: true, message: "✅ Completada", severity: "success" });
//   };

//   const handleDeleteAttention = (attention: Attention) => {
//     if (!confirm("¿Cancelar atención?")) return;
//     setServiceOrders([...serviceOrders, attention.serviceOrder]);
//     setAttentions(attentions.filter((att) => att.id !== attention.id));
//     setSnackbar({ open: true, message: "🗑️ Cancelada", severity: "info" });
//   };

//   return (
//   <Box
//   sx={{
//     display: "flex",
//     height: "calc(100vh - 65px)",
//     overflow: "hidden",
//   }}
// >
//       {/* Sidebar */}
//       <Box
//         sx={{
//           flexShrink: 0,
//           p: 2,
//           width: 300,
//           background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
//           borderRight: "1px solid rgba(255, 255, 255, 0.1)",
//         }}
//       >
//         <Typography variant="h6" fontWeight={700} gutterBottom color="white">
//           📋 Órdenes Pendientes
//         </Typography>
//         <Typography variant="caption" color="white">
//           Arrastra al calendario
//         </Typography>
//         <Box
//           sx={{ mt: 2, maxHeight: "calc(100vh - 150px)", overflowY: "auto" }}
//         >
//           {serviceOrders.map((order) => (
//             <ServiceOrderCard
//               key={order.id}
//               serviceOrder={order}
//               onDragStart={setDraggedOrder}
//               onDragEnd={() => setDragOverSlot(null)}
//             />
//           ))}
//           {serviceOrders.length === 0 && (
//             <Box sx={{ textAlign: "center", py: 4, color: "text.secondary" }}>
//               <EventNoteIcon sx={{ fontSize: 48, opacity: 0.3 }} />
//               <Typography variant="body2">Sin órdenes</Typography>
//             </Box>
//           )}
//         </Box>
//       </Box>

//       {/* Main Content */}
//       <Box
//         sx={{
//           flex: 1,
//           display: "flex",
//           flexDirection: "column",
//           overflow: "hidden",
//         }}
//       >
//         {/* Header */}
//         <Box
//           sx={{
//             background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
//             p: 2,
//             borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
//           }}
//         >
//           <Box
//             display="flex"
//             justifyContent="space-between"
//             alignItems="center"
//           >
//             <Box display="flex" alignItems="center" gap={2}>
//               <CalendarTodayIcon sx={{ fontSize: 28, color: "primary.main" }} />
//               <Box>
//                 <Typography variant="h5" fontWeight={700} color="white">
//                   Planificación de OTS
//                 </Typography>
//                 <Typography variant="caption" color="white">
//                   Vista horizontal por horas • {attentions.length} atenciones programadas
//                 </Typography>
//               </Box>
//             </Box>
//             <TextField
//               type="date"
//               value={selectedDate}
//               onChange={(e) => setSelectedDate(e.target.value)}
//               size="small"
//               sx={{
//                 background: "white",
//                 borderRadius: "12px",
//               }}
//             />
//           </Box>
//         </Box>

//         {/* Calendar Grid */}
//         <Box sx={{ flex: 1, overflow: "auto" }}>
//           <Box sx={{ minWidth: "max-content" }}>
//             {/* Hour Headers */}
//             <Box sx={{ display: "flex", position: "sticky", top: 0, zIndex: 11 }}>
//               <Box
//                 sx={{
//                   width: 200,
//                   background: "rgba(26, 26, 46, 0.95)",
//                   borderRight: "2px solid rgba(255, 255, 255, 0.1)",
//                   borderBottom: "2px solid rgba(255, 255, 255, 0.1)",
//                   p: 1,
//                   color: "white",
//                 }}
//               >
//                 <Typography variant="subtitle2" fontWeight={700}>
//                   Técnicos ({technicians.length})
//                 </Typography>
//               </Box>
//               {HOURS.map((hour) => (
//                 <Box
//                   key={hour}
//                   sx={{
//                     width: HOUR_WIDTH,
//                     borderRight: "1px solid rgba(255, 255, 255, 0.05)",
//                     borderBottom: "2px solid rgba(255, 255, 255, 0.1)",
//                     background: "rgba(26, 26, 46, 0.95)",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                   }}
//                 >
//                   <Typography variant="body2" fontWeight={600} color="white">
//                     {hour}:00
//                   </Typography>
//                 </Box>
//               ))}
//             </Box>

//             {/* Technician Rows */}
//             {technicians.map((tech) => (
//               <Box
//                 key={tech.id}
//                 sx={{
//                   display: "flex",
//                   position: "relative",
//                   borderBottom: "1px solid #e0e0e0",
//                 }}
//               >
//                 {/* Technician Column */}
//                 <Box
//                   sx={{
//                     width: 200,
//                     minHeight: 100,
//                     borderRight: "2px solid rgba(255, 255, 255, 0.1)",
//                     borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
//                     p: 1.5,
//                     background: "rgba(255, 255, 255, 0.02)",
//                   }}
//                 >
//                   <Box display="flex" alignItems="center" gap={1}>
//                     <Avatar sx={{ bgcolor: tech.color, width: 36, height: 36 }}>
//                       <PersonIcon fontSize="small" />
//                     </Avatar>
//                     <Box>
//                       <Typography variant="body2" fontWeight={700}>
//                         {tech.name} {tech.lastName}
//                       </Typography>
//                       <Typography variant="caption" color="text.secondary">
//                         {tech.specialization}
//                       </Typography>
//                     </Box>
//                   </Box>
//                   <Chip
//                     label={tech.isAvailable ? "Disponible" : "Ocupado"}
//                     size="small"
//                     color={tech.isAvailable ? "success" : "default"}
//                     sx={{ mt: 1, fontSize: "0.7rem" }}
//                   />
//                 </Box>

//                 {/* Hour Grid */}
//                 <Box sx={{ display: "flex", position: "relative", flex: 1 }}>
//                   {HOURS.map((hour) => (
//                     <Box
//                       key={hour}
//                       onDragOver={(e) => e.preventDefault()}
//                       onDragEnter={() => handleDragEnter(tech.id, hour)}
//                       onDragLeave={handleDragLeave}
//                       onDrop={() => handleDrop(tech.id, hour)}
//                       sx={{
//                         width: HOUR_WIDTH,
//                         minHeight: 100,
//                         borderRight: "1px solid rgba(255, 255, 255, 0.05)",
//                         borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
//                         background:
//                           dragOverSlot?.technicianId === tech.id &&
//                           dragOverSlot?.hour === hour
//                             ? "rgba(33, 150, 243, 0.15)"
//                             : "transparent",
//                         transition: "background 0.2s ease",
//                         "&:hover": {
//                           background: draggedOrder
//                             ? "rgba(255, 255, 255, 0.05)"
//                             : "rgba(255, 255, 255, 0.02)",
//                         },
//                       }}
//                     />
//                   ))}

//                   {/* Preview Ghost cuando está por soltar */}
//                   {draggedOrder &&
//                     dragOverSlot?.technicianId === tech.id &&
//                     dragOverSlot?.hour && (
//                       <Box
//                         sx={{
//                           ...getPreviewStyle(
//                             dragOverSlot.hour,
//                             draggedOrder.estimatedDuration,
//                           ),
//                           background: `linear-gradient(135deg, ${getPriorityColor(
//                             draggedOrder.priority,
//                           )}40 0%, ${getPriorityColor(draggedOrder.priority)}60 100%)`,
//                           border: `3px dashed ${getPriorityColor(draggedOrder.priority)}`,
//                           borderRadius: 2,
//                           p: 1.5,
//                           pointerEvents: "none",
//                           animation: "pulse 1.5s ease-in-out infinite",
//                           "@keyframes pulse": {
//                             "0%, 100%": {
//                               opacity: 0.6,
//                             },
//                             "50%": {
//                               opacity: 0.9,
//                             },
//                           },
//                         }}
//                       >
//                         <Typography variant="body2" fontWeight={700} color="white">
//                           {draggedOrder.code}
//                         </Typography>
//                         <Typography variant="caption" color="white">
//                           {draggedOrder.clientName}
//                         </Typography>
//                         <Box
//                           display="flex"
//                           gap={0.5}
//                           mt={0.5}
//                           sx={{
//                             background: "rgba(0,0,0,0.3)",
//                             p: 0.5,
//                             borderRadius: 1,
//                           }}
//                         >
//                           <Typography variant="caption" fontWeight={600} color="white">
//                             {dragOverSlot.hour}:00 -{" "}
//                             {Math.floor(
//                               dragOverSlot.hour + draggedOrder.estimatedDuration / 60,
//                             )}
//                             :
//                             {Math.floor(
//                               ((draggedOrder.estimatedDuration / 60) % 1) * 60,
//                             )
//                               .toString()
//                               .padStart(2, "0")}
//                           </Typography>
//                         </Box>
//                       </Box>
//                     )}

//                   {/* Actual Attentions */}
//                   {attentions
//                     .filter(
//                       (att) =>
//                         att.technicianId === tech.id && att.date === selectedDate,
//                     )
//                     .map((attention) => (
//                       <Box key={attention.id} sx={getAttentionStyle(attention)}>
//                         <AttentionCard
//                           attention={attention}
//                           technicianColor={tech.color}
//                           onEdit={() => console.log("Edit")}
//                           onDelete={() => handleDeleteAttention(attention)}
//                           onStart={() => handleStartAttention(attention)}
//                           onComplete={() => handleCompleteAttention(attention)}
//                         />
//                       </Box>
//                     ))}
//                 </Box>
//               </Box>
//             ))}
//           </Box>
//         </Box>
//       </Box>

//       {/* Snackbar */}
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={3000}
//         onClose={() => setSnackbar({ ...snackbar, open: false })}
//         anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
//       >
//         <Alert
//           onClose={() => setSnackbar({ ...snackbar, open: false })}
//           severity={snackbar.severity}
//           variant="filled"
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// }


"use client";

import {
  Box,
  Typography,
  IconButton,
  TextField,
  Snackbar,
  Alert,
  Chip,
  Avatar,
} from "@mui/material";
import { useState } from "react";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import EventNoteIcon from "@mui/icons-material/EventNote";
import PersonIcon from "@mui/icons-material/Person";

import {
  Technician,
  ServiceOrder,
  Attention,
} from "@/src/types/schedule.types";
import AttentionCard from "./AttentionCard";
import ServiceOrderCard from "./ServicesOrderCard";

// ========== DATOS MOCK EXPANDIDOS ==========
const mockTechnicians: Technician[] = [
  {
    id: "tech-1",
    name: "Carlos",
    lastName: "Rodríguez",
    specialization: "Instalación HFC",
    isAvailable: true,
    color: "#2196F3",
  },
  {
    id: "tech-2",
    name: "María",
    lastName: "González",
    specialization: "Reparación FTTH",
    isAvailable: true,
    color: "#4CAF50",
  },
  {
    id: "tech-3",
    name: "Jorge",
    lastName: "Martínez",
    specialization: "Instalación DTH",
    isAvailable: true,
    color: "#FF9800",
  },
  {
    id: "tech-4",
    name: "Ana",
    lastName: "López",
    specialization: "Soporte LTE",
    isAvailable: true,
    color: "#9C27B0",
  },
  {
    id: "tech-5",
    name: "Pedro",
    lastName: "Ramírez",
    specialization: "Instalación HFC",
    isAvailable: true,
    color: "#E91E63",
  },
  {
    id: "tech-6",
    name: "Laura",
    lastName: "Fernández",
    specialization: "Mantenimiento FTTH",
    isAvailable: true,
    color: "#00BCD4",
  },
  {
    id: "tech-7",
    name: "Roberto",
    lastName: "Silva",
    specialization: "Instalación LTE",
    isAvailable: true,
    color: "#FF5722",
  },
  {
    id: "tech-8",
    name: "Carmen",
    lastName: "Vargas",
    specialization: "Reparación DTH",
    isAvailable: true,
    color: "#673AB7",
  },
];

const createMockServiceOrders = (): ServiceOrder[] => [
  // Órdenes para asignar (pendientes) - Solo 3 para mantener espacio
  {
    id: "so-pending-1",
    code: "OS-061",
    clientName: "Ricardo Flores",
    address: "Av. Colonial 891",
    serviceType: "Instalación HFC",
    priority: "alta",
    estimatedDuration: 120,
    materials: ["Cable coaxial", "Modem", "Splitter"],
  },
  {
    id: "so-pending-2",
    code: "OS-062",
    clientName: "Sofía Mendoza",
    address: "Calle San Martín 234",
    serviceType: "Reparación",
    priority: "media",
    estimatedDuration: 90,
    materials: ["Conector F"],
  },
  {
    id: "so-pending-3",
    code: "OS-063",
    clientName: "Luis Castro",
    address: "Jr. Tacna 567",
    serviceType: "Instalación FTTH",
    priority: "alta",
    estimatedDuration: 150,
    materials: ["Fibra óptica", "ONT"],
  },
  
  // Órdenes ya programadas (60 órdenes para cubrir ~90% del calendario)
  {
    id: "so-1",
    code: "OS-001",
    clientName: "Juan Pérez",
    address: "Av. Javier Prado Este 123",
    serviceType: "Instalación HFC",
    priority: "alta",
    estimatedDuration: 120,
    materials: ["Cable coaxial", "Modem"],
  },
  {
    id: "so-2",
    code: "OS-002",
    clientName: "María Torres",
    address: "Calle Los Olivos 456",
    serviceType: "Reparación",
    priority: "media",
    estimatedDuration: 90,
    materials: ["Conector F"],
  },
  {
    id: "so-3",
    code: "OS-003",
    clientName: "Roberto Sánchez",
    address: "Jr. Las Flores 789",
    serviceType: "Instalación FTTH",
    priority: "alta",
    estimatedDuration: 150,
    materials: ["Fibra óptica"],
  },
  {
    id: "so-4",
    code: "OS-004",
    clientName: "Elena Morales",
    address: "Av. Arequipa 321",
    serviceType: "Mantenimiento",
    priority: "baja",
    estimatedDuration: 90,
    materials: ["Cable", "Conectores"],
  },
  {
    id: "so-5",
    code: "OS-005",
    clientName: "Fernando Díaz",
    address: "Calle Miraflores 654",
    serviceType: "Instalación LTE",
    priority: "alta",
    estimatedDuration: 120,
    materials: ["Router LTE", "Antena"],
  },
  {
    id: "so-6",
    code: "OS-006",
    clientName: "Gabriela Ruiz",
    address: "Jr. Puno 987",
    serviceType: "Reparación",
    priority: "media",
    estimatedDuration: 90,
    materials: ["Splitter"],
  },
  {
    id: "so-7",
    code: "OS-007",
    clientName: "Andrés Vega",
    address: "Av. La Marina 456",
    serviceType: "Instalación DTH",
    priority: "alta",
    estimatedDuration: 120,
    materials: ["Antena parabólica", "Decodificador"],
  },
  {
    id: "so-8",
    code: "OS-008",
    clientName: "Valeria Campos",
    address: "Calle Benavides 789",
    serviceType: "Soporte técnico",
    priority: "media",
    estimatedDuration: 120,
    materials: [],
  },
  {
    id: "so-9",
    code: "OS-009",
    clientName: "Daniel Herrera",
    address: "Av. Universitaria 234",
    serviceType: "Instalación FTTH",
    priority: "alta",
    estimatedDuration: 150,
    materials: ["Fibra óptica", "ONT", "Router"],
  },
  {
    id: "so-10",
    code: "OS-010",
    clientName: "Isabel Paredes",
    address: "Jr. Cusco 567",
    serviceType: "Reparación",
    priority: "media",
    estimatedDuration: 90,
    materials: ["Cable coaxial"],
  },
  {
    id: "so-11",
    code: "OS-011",
    clientName: "Raúl Méndez",
    address: "Av. Venezuela 890",
    serviceType: "Instalación HFC",
    priority: "alta",
    estimatedDuration: 120,
    materials: ["Modem", "Cable"],
  },
  {
    id: "so-12",
    code: "OS-012",
    clientName: "Claudia Quispe",
    address: "Calle Grau 123",
    serviceType: "Mantenimiento",
    priority: "baja",
    estimatedDuration: 90,
    materials: ["Conectores"],
  },
  {
    id: "so-13",
    code: "OS-013",
    clientName: "Alberto Cáceres",
    address: "Av. Salaverry 456",
    serviceType: "Instalación LTE",
    priority: "media",
    estimatedDuration: 120,
    materials: ["Router LTE"],
  },
  {
    id: "so-14",
    code: "OS-014",
    clientName: "Rosa Chávez",
    address: "Jr. Ayacucho 789",
    serviceType: "Reparación",
    priority: "alta",
    estimatedDuration: 90,
    materials: ["Amplificador"],
  },
  {
    id: "so-15",
    code: "OS-015",
    clientName: "Ernesto Puma",
    address: "Av. Angamos 321",
    serviceType: "Instalación DTH",
    priority: "media",
    estimatedDuration: 120,
    materials: ["Antena", "Cable"],
  },
  {
    id: "so-16",
    code: "OS-016",
    clientName: "Teresa Arias",
    address: "Calle Alfonso Ugarte 654",
    serviceType: "Soporte técnico",
    priority: "baja",
    estimatedDuration: 90,
    materials: [],
  },
  {
    id: "so-17",
    code: "OS-017",
    clientName: "Julio Espinoza",
    address: "Av. República 987",
    serviceType: "Instalación FTTH",
    priority: "alta",
    estimatedDuration: 150,
    materials: ["Fibra óptica", "ONT"],
  },
  {
    id: "so-18",
    code: "OS-018",
    clientName: "Mónica Carrillo",
    address: "Jr. Junín 234",
    serviceType: "Reparación",
    priority: "media",
    estimatedDuration: 90,
    materials: ["Conector F"],
  },
  {
    id: "so-19",
    code: "OS-019",
    clientName: "Oscar Maldonado",
    address: "Av. Larco 567",
    serviceType: "Instalación HFC",
    priority: "alta",
    estimatedDuration: 120,
    materials: ["Modem", "Splitter"],
  },
  {
    id: "so-20",
    code: "OS-020",
    clientName: "Silvia Ramos",
    address: "Calle Schell 890",
    serviceType: "Mantenimiento",
    priority: "media",
    estimatedDuration: 90,
    materials: ["Herramientas"],
  },
  {
    id: "so-21",
    code: "OS-021",
    clientName: "Héctor Ibarra",
    address: "Av. Petit Thouars 123",
    serviceType: "Instalación LTE",
    priority: "alta",
    estimatedDuration: 120,
    materials: ["Router LTE", "Antena"],
  },
  {
    id: "so-22",
    code: "OS-022",
    clientName: "Pilar Guzmán",
    address: "Jr. Lampa 456",
    serviceType: "Reparación",
    priority: "baja",
    estimatedDuration: 90,
    materials: ["Cable"],
  },
  {
    id: "so-23",
    code: "OS-023",
    clientName: "Gonzalo Núñez",
    address: "Av. Arenales 789",
    serviceType: "Instalación DTH",
    priority: "media",
    estimatedDuration: 120,
    materials: ["Decodificador"],
  },
  {
    id: "so-24",
    code: "OS-024",
    clientName: "Beatriz Salazar",
    address: "Calle Bolívar 321",
    serviceType: "Soporte técnico",
    priority: "alta",
    estimatedDuration: 90,
    materials: [],
  },
  {
    id: "so-25",
    code: "OS-025",
    clientName: "Francisco López",
    address: "Av. Pardo 456",
    serviceType: "Instalación HFC",
    priority: "alta",
    estimatedDuration: 120,
    materials: ["Cable", "Modem"],
  },
  {
    id: "so-26",
    code: "OS-026",
    clientName: "Natalia Cruz",
    address: "Jr. Manco Cápac 789",
    serviceType: "Reparación FTTH",
    priority: "media",
    estimatedDuration: 90,
    materials: ["Fibra óptica"],
  },
  {
    id: "so-27",
    code: "OS-027",
    clientName: "Sergio Robles",
    address: "Calle Pizarro 123",
    serviceType: "Instalación LTE",
    priority: "alta",
    estimatedDuration: 120,
    materials: ["Router", "Antena"],
  },
  {
    id: "so-28",
    code: "OS-028",
    clientName: "Daniela Vargas",
    address: "Av. Garcilazo 456",
    serviceType: "Mantenimiento",
    priority: "baja",
    estimatedDuration: 90,
    materials: ["Kit limpieza"],
  },
  {
    id: "so-29",
    code: "OS-029",
    clientName: "Rodrigo Paz",
    address: "Jr. Callao 789",
    serviceType: "Instalación DTH",
    priority: "alta",
    estimatedDuration: 120,
    materials: ["Antena", "Decodificador"],
  },
  {
    id: "so-30",
    code: "OS-030",
    clientName: "Carolina Soto",
    address: "Av. México 234",
    serviceType: "Reparación",
    priority: "media",
    estimatedDuration: 90,
    materials: ["Cable coaxial"],
  },
  {
    id: "so-31",
    code: "OS-031",
    clientName: "Martín Ortiz",
    address: "Calle Venezuela 567",
    serviceType: "Instalación FTTH",
    priority: "alta",
    estimatedDuration: 150,
    materials: ["Fibra", "ONT"],
  },
  {
    id: "so-32",
    code: "OS-032",
    clientName: "Lucía Herrera",
    address: "Jr. Amazonas 890",
    serviceType: "Soporte LTE",
    priority: "media",
    estimatedDuration: 120,
    materials: ["Router"],
  },
  {
    id: "so-33",
    code: "OS-033",
    clientName: "Diego Moreno",
    address: "Av. Paseo de la República 123",
    serviceType: "Instalación HFC",
    priority: "alta",
    estimatedDuration: 120,
    materials: ["Modem", "Cable"],
  },
  {
    id: "so-34",
    code: "OS-034",
    clientName: "Valentina Ríos",
    address: "Calle Libertad 456",
    serviceType: "Reparación",
    priority: "baja",
    estimatedDuration: 90,
    materials: ["Conectores"],
  },
  {
    id: "so-35",
    code: "OS-035",
    clientName: "Adrián Castro",
    address: "Jr. Ica 789",
    serviceType: "Instalación DTH",
    priority: "media",
    estimatedDuration: 120,
    materials: ["Antena", "Cable"],
  },
  {
    id: "so-36",
    code: "OS-036",
    clientName: "Camila Reyes",
    address: "Av. Primavera 234",
    serviceType: "Mantenimiento FTTH",
    priority: "baja",
    estimatedDuration: 90,
    materials: ["Kit limpieza"],
  },
  {
    id: "so-37",
    code: "OS-037",
    clientName: "Sebastián Luna",
    address: "Calle Sucre 567",
    serviceType: "Instalación LTE",
    priority: "alta",
    estimatedDuration: 120,
    materials: ["Router LTE"],
  },
  {
    id: "so-38",
    code: "OS-038",
    clientName: "Isabella Torres",
    address: "Jr. Ancash 890",
    serviceType: "Reparación",
    priority: "media",
    estimatedDuration: 90,
    materials: ["Cable"],
  },
  {
    id: "so-39",
    code: "OS-039",
    clientName: "Mateo Sánchez",
    address: "Av. Industrial 123",
    serviceType: "Instalación HFC",
    priority: "alta",
    estimatedDuration: 120,
    materials: ["Modem", "Splitter"],
  },
  {
    id: "so-40",
    code: "OS-040",
    clientName: "Sofía Ramírez",
    address: "Calle Progreso 456",
    serviceType: "Soporte técnico",
    priority: "media",
    estimatedDuration: 120,
    materials: [],
  },
  {
    id: "so-41",
    code: "OS-041",
    clientName: "Lucas Medina",
    address: "Jr. Lima 789",
    serviceType: "Instalación FTTH",
    priority: "alta",
    estimatedDuration: 150,
    materials: ["Fibra óptica", "ONT"],
  },
  {
    id: "so-42",
    code: "OS-042",
    clientName: "Emma Flores",
    address: "Av. Tacna 234",
    serviceType: "Reparación",
    priority: "baja",
    estimatedDuration: 90,
    materials: ["Conectores"],
  },
  {
    id: "so-43",
    code: "OS-043",
    clientName: "Benjamín Gil",
    address: "Calle Ugarte 567",
    serviceType: "Instalación DTH",
    priority: "media",
    estimatedDuration: 120,
    materials: ["Antena", "Decodificador"],
  },
  {
    id: "so-44",
    code: "OS-044",
    clientName: "Mía Cortez",
    address: "Jr. Puno 890",
    serviceType: "Mantenimiento",
    priority: "baja",
    estimatedDuration: 90,
    materials: ["Kit herramientas"],
  },
  {
    id: "so-45",
    code: "OS-045",
    clientName: "Santiago Ruiz",
    address: "Av. Abancay 123",
    serviceType: "Instalación LTE",
    priority: "alta",
    estimatedDuration: 120,
    materials: ["Router", "Antena"],
  },
  {
    id: "so-46",
    code: "OS-046",
    clientName: "Olivia Navarro",
    address: "Calle Camaná 456",
    serviceType: "Reparación FTTH",
    priority: "media",
    estimatedDuration: 90,
    materials: ["Fibra óptica"],
  },
  {
    id: "so-47",
    code: "OS-047",
    clientName: "Gabriel Peña",
    address: "Jr. Huánuco 789",
    serviceType: "Instalación HFC",
    priority: "alta",
    estimatedDuration: 120,
    materials: ["Cable", "Modem"],
  },
  {
    id: "so-48",
    code: "OS-048",
    clientName: "Victoria Ibáñez",
    address: "Av. Alfonso Ugarte 234",
    serviceType: "Soporte técnico",
    priority: "media",
    estimatedDuration: 120,
    materials: [],
  },
  {
    id: "so-49",
    code: "OS-049",
    clientName: "Samuel Vásquez",
    address: "Calle Zela 567",
    serviceType: "Instalación DTH",
    priority: "alta",
    estimatedDuration: 120,
    materials: ["Antena", "Cable"],
  },
  {
    id: "so-50",
    code: "OS-050",
    clientName: "Amelia Cordero",
    address: "Jr. Loreto 890",
    serviceType: "Reparación",
    priority: "baja",
    estimatedDuration: 90,
    materials: ["Conectores"],
  },
  {
    id: "so-51",
    code: "OS-051",
    clientName: "Daniel Montero",
    address: "Av. Arica 123",
    serviceType: "Instalación FTTH",
    priority: "media",
    estimatedDuration: 150,
    materials: ["Fibra", "ONT"],
  },
  {
    id: "so-52",
    code: "OS-052",
    clientName: "Julia Delgado",
    address: "Calle Moquegua 456",
    serviceType: "Mantenimiento",
    priority: "baja",
    estimatedDuration: 90,
    materials: ["Kit limpieza"],
  },
  {
    id: "so-53",
    code: "OS-053",
    clientName: "Nicolás Vera",
    address: "Jr. Cuzco 789",
    serviceType: "Instalación LTE",
    priority: "alta",
    estimatedDuration: 120,
    materials: ["Router LTE"],
  },
  {
    id: "so-54",
    code: "OS-054",
    clientName: "María Solís",
    address: "Av. Wilson 234",
    serviceType: "Reparación",
    priority: "media",
    estimatedDuration: 90,
    materials: ["Cable coaxial"],
  },
  {
    id: "so-55",
    code: "OS-055",
    clientName: "Ángel Bravo",
    address: "Calle Unión 567",
    serviceType: "Instalación HFC",
    priority: "alta",
    estimatedDuration: 120,
    materials: ["Modem", "Splitter"],
  },
  {
    id: "so-56",
    code: "OS-056",
    clientName: "Sara Campos",
    address: "Jr. Puno 890",
    serviceType: "Soporte DTH",
    priority: "media",
    estimatedDuration: 120,
    materials: ["Decodificador"],
  },
  {
    id: "so-57",
    code: "OS-057",
    clientName: "Tomás Ortega",
    address: "Av. Nicolás de Piérola 123",
    serviceType: "Instalación FTTH",
    priority: "alta",
    estimatedDuration: 150,
    materials: ["Fibra óptica", "ONT"],
  },
  {
    id: "so-58",
    code: "OS-058",
    clientName: "Paula Guerrero",
    address: "Calle Lampa 456",
    serviceType: "Reparación",
    priority: "baja",
    estimatedDuration: 90,
    materials: ["Conectores"],
  },
  {
    id: "so-59",
    code: "OS-059",
    clientName: "Ignacio Romero",
    address: "Jr. Azángaro 789",
    serviceType: "Instalación LTE",
    priority: "media",
    estimatedDuration: 120,
    materials: ["Router", "Antena"],
  },
  {
    id: "so-60",
    code: "OS-060",
    clientName: "Elena Castillo",
    address: "Av. Grau 234",
    serviceType: "Mantenimiento HFC",
    priority: "baja",
    estimatedDuration: 90,
    materials: ["Kit herramientas"],
  },
];

const createInitialAttentions = (): Attention[] => {
  const today = new Date().toISOString().split("T")[0];
  const allOrders = createMockServiceOrders();
  
  return [
    // Carlos Rodríguez (tech-1) - 7 atenciones (8am-6pm casi completo)
    {
      id: "att-1",
      serviceOrderId: "so-1",
      technicianId: "tech-1",
      date: today,
      startTime: "08:00",
      endTime: "10:00",
      status: "completada",
      serviceOrder: allOrders.find(o => o.id === "so-1")!,
    },
    {
      id: "att-2",
      serviceOrderId: "so-2",
      technicianId: "tech-1",
      date: today,
      startTime: "10:00",
      endTime: "11:30",
      status: "completada",
      serviceOrder: allOrders.find(o => o.id === "so-2")!,
    },
    {
      id: "att-3",
      serviceOrderId: "so-11",
      technicianId: "tech-1",
      date: today,
      startTime: "11:30",
      endTime: "13:30",
      status: "en_curso",
      serviceOrder: allOrders.find(o => o.id === "so-11")!,
    },
    {
      id: "att-4",
      serviceOrderId: "so-19",
      technicianId: "tech-1",
      date: today,
      startTime: "13:30",
      endTime: "15:30",
      status: "programada",
      serviceOrder: allOrders.find(o => o.id === "so-19")!,
    },
    {
      id: "att-5",
      serviceOrderId: "so-25",
      technicianId: "tech-1",
      date: today,
      startTime: "15:30",
      endTime: "17:30",
      status: "programada",
      serviceOrder: allOrders.find(o => o.id === "so-25")!,
    },
    
    // María González (tech-2) - 7 atenciones
    {
      id: "att-6",
      serviceOrderId: "so-3",
      technicianId: "tech-2",
      date: today,
      startTime: "08:00",
      endTime: "10:30",
      status: "completada",
      serviceOrder: allOrders.find(o => o.id === "so-3")!,
    },
    {
      id: "att-7",
      serviceOrderId: "so-6",
      technicianId: "tech-2",
      date: today,
      startTime: "10:30",
      endTime: "12:00",
      status: "completada",
      serviceOrder: allOrders.find(o => o.id === "so-6")!,
    },
    {
      id: "att-8",
      serviceOrderId: "so-10",
      technicianId: "tech-2",
      date: today,
      startTime: "12:00",
      endTime: "13:30",
      status: "en_curso",
      serviceOrder: allOrders.find(o => o.id === "so-10")!,
    },
    {
      id: "att-9",
      serviceOrderId: "so-14",
      technicianId: "tech-2",
      date: today,
      startTime: "13:30",
      endTime: "15:00",
      status: "programada",
      serviceOrder: allOrders.find(o => o.id === "so-14")!,
    },
    {
      id: "att-10",
      serviceOrderId: "so-26",
      technicianId: "tech-2",
      date: today,
      startTime: "15:00",
      endTime: "16:30",
      status: "programada",
      serviceOrder: allOrders.find(o => o.id === "so-26")!,
    },
    {
      id: "att-11",
      serviceOrderId: "so-46",
      technicianId: "tech-2",
      date: today,
      startTime: "16:30",
      endTime: "18:00",
      status: "programada",
      serviceOrder: allOrders.find(o => o.id === "so-46")!,
    },
    
    // Jorge Martínez (tech-3) - 6 atenciones
    {
      id: "att-12",
      serviceOrderId: "so-7",
      technicianId: "tech-3",
      date: today,
      startTime: "08:00",
      endTime: "10:00",
      status: "completada",
      serviceOrder: allOrders.find(o => o.id === "so-7")!,
    },
    {
      id: "att-13",
      serviceOrderId: "so-15",
      technicianId: "tech-3",
      date: today,
      startTime: "10:00",
      endTime: "12:00",
      status: "completada",
      serviceOrder: allOrders.find(o => o.id === "so-15")!,
    },
    {
      id: "att-14",
      serviceOrderId: "so-23",
      technicianId: "tech-3",
      date: today,
      startTime: "12:00",
      endTime: "14:00",
      status: "en_curso",
      serviceOrder: allOrders.find(o => o.id === "so-23")!,
    },
    {
      id: "att-15",
      serviceOrderId: "so-29",
      technicianId: "tech-3",
      date: today,
      startTime: "14:00",
      endTime: "16:00",
      status: "programada",
      serviceOrder: allOrders.find(o => o.id === "so-29")!,
    },
    {
      id: "att-16",
      serviceOrderId: "so-35",
      technicianId: "tech-3",
      date: today,
      startTime: "16:00",
      endTime: "18:00",
      status: "programada",
      serviceOrder: allOrders.find(o => o.id === "so-35")!,
    },
    
    // Ana López (tech-4) - 8 atenciones
    {
      id: "att-17",
      serviceOrderId: "so-4",
      technicianId: "tech-4",
      date: today,
      startTime: "08:00",
      endTime: "09:30",
      status: "completada",
      serviceOrder: allOrders.find(o => o.id === "so-4")!,
    },
    {
      id: "att-18",
      serviceOrderId: "so-8",
      technicianId: "tech-4",
      date: today,
      startTime: "09:30",
      endTime: "11:30",
      status: "completada",
      serviceOrder: allOrders.find(o => o.id === "so-8")!,
    },
    {
      id: "att-19",
      serviceOrderId: "so-16",
      technicianId: "tech-4",
      date: today,
      startTime: "11:30",
      endTime: "13:00",
      status: "en_curso",
      serviceOrder: allOrders.find(o => o.id === "so-16")!,
    },
    {
      id: "att-20",
      serviceOrderId: "so-24",
      technicianId: "tech-4",
      date: today,
      startTime: "13:00",
      endTime: "14:30",
      status: "programada",
      serviceOrder: allOrders.find(o => o.id === "so-24")!,
    },
    {
      id: "att-21",
      serviceOrderId: "so-32",
      technicianId: "tech-4",
      date: today,
      startTime: "14:30",
      endTime: "16:30",
      status: "programada",
      serviceOrder: allOrders.find(o => o.id === "so-32")!,
    },
    {
      id: "att-22",
      serviceOrderId: "so-40",
      technicianId: "tech-4",
      date: today,
      startTime: "16:30",
      endTime: "18:30",
      status: "programada",
      serviceOrder: allOrders.find(o => o.id === "so-40")!,
    },
    
    // Pedro Ramírez (tech-5) - 7 atenciones
    {
      id: "att-23",
      serviceOrderId: "so-5",
      technicianId: "tech-5",
      date: today,
      startTime: "08:00",
      endTime: "10:00",
      status: "completada",
      serviceOrder: allOrders.find(o => o.id === "so-5")!,
    },
    {
      id: "att-24",
      serviceOrderId: "so-13",
      technicianId: "tech-5",
      date: today,
      startTime: "10:00",
      endTime: "12:00",
      status: "completada",
      serviceOrder: allOrders.find(o => o.id === "so-13")!,
    },
    {
      id: "att-25",
      serviceOrderId: "so-21",
      technicianId: "tech-5",
      date: today,
      startTime: "12:00",
      endTime: "14:00",
      status: "en_curso",
      serviceOrder: allOrders.find(o => o.id === "so-21")!,
    },
    {
      id: "att-26",
      serviceOrderId: "so-27",
      technicianId: "tech-5",
      date: today,
      startTime: "14:00",
      endTime: "16:00",
      status: "programada",
      serviceOrder: allOrders.find(o => o.id === "so-27")!,
    },
    {
      id: "att-27",
      serviceOrderId: "so-37",
      technicianId: "tech-5",
      date: today,
      startTime: "16:00",
      endTime: "18:00",
      status: "programada",
      serviceOrder: allOrders.find(o => o.id === "so-37")!,
    },
    
    // Laura Fernández (tech-6) - 7 atenciones
    {
      id: "att-28",
      serviceOrderId: "so-9",
      technicianId: "tech-6",
      date: today,
      startTime: "08:00",
      endTime: "10:30",
      status: "completada",
      serviceOrder: allOrders.find(o => o.id === "so-9")!,
    },
    {
      id: "att-29",
      serviceOrderId: "so-12",
      technicianId: "tech-6",
      date: today,
      startTime: "10:30",
      endTime: "12:00",
      status: "completada",
      serviceOrder: allOrders.find(o => o.id === "so-12")!,
    },
    {
      id: "att-30",
      serviceOrderId: "so-17",
      technicianId: "tech-6",
      date: today,
      startTime: "12:00",
      endTime: "14:30",
      status: "en_curso",
      serviceOrder: allOrders.find(o => o.id === "so-17")!,
    },
    {
      id: "att-31",
      serviceOrderId: "so-20",
      technicianId: "tech-6",
      date: today,
      startTime: "14:30",
      endTime: "16:00",
      status: "programada",
      serviceOrder: allOrders.find(o => o.id === "so-20")!,
    },
    {
      id: "att-32",
      serviceOrderId: "so-28",
      technicianId: "tech-6",
      date: today,
      startTime: "16:00",
      endTime: "17:30",
      status: "programada",
      serviceOrder: allOrders.find(o => o.id === "so-28")!,
    },
    
    // Roberto Silva (tech-7) - 7 atenciones
    {
      id: "att-33",
      serviceOrderId: "so-18",
      technicianId: "tech-7",
      date: today,
      startTime: "08:00",
      endTime: "09:30",
      status: "completada",
      serviceOrder: allOrders.find(o => o.id === "so-18")!,
    },
    {
      id: "att-34",
      serviceOrderId: "so-22",
      technicianId: "tech-7",
      date: today,
      startTime: "09:30",
      endTime: "11:00",
      status: "completada",
      serviceOrder: allOrders.find(o => o.id === "so-22")!,
    },
    {
      id: "att-35",
      serviceOrderId: "so-30",
      technicianId: "tech-7",
      date: today,
      startTime: "11:00",
      endTime: "12:30",
      status: "en_curso",
      serviceOrder: allOrders.find(o => o.id === "so-30")!,
    },
    {
      id: "att-36",
      serviceOrderId: "so-33",
      technicianId: "tech-7",
      date: today,
      startTime: "12:30",
      endTime: "14:30",
      status: "programada",
      serviceOrder: allOrders.find(o => o.id === "so-33")!,
    },
    {
      id: "att-37",
      serviceOrderId: "so-39",
      technicianId: "tech-7",
      date: today,
      startTime: "14:30",
      endTime: "16:30",
      status: "programada",
      serviceOrder: allOrders.find(o => o.id === "so-39")!,
    },
    {
      id: "att-38",
      serviceOrderId: "so-45",
      technicianId: "tech-7",
      date: today,
      startTime: "16:30",
      endTime: "18:30",
      status: "programada",
      serviceOrder: allOrders.find(o => o.id === "so-45")!,
    },
    
    // Carmen Vargas (tech-8) - 7 atenciones
    {
      id: "att-39",
      serviceOrderId: "so-31",
      technicianId: "tech-8",
      date: today,
      startTime: "08:00",
      endTime: "10:30",
      status: "completada",
      serviceOrder: allOrders.find(o => o.id === "so-31")!,
    },
    {
      id: "att-40",
      serviceOrderId: "so-34",
      technicianId: "tech-8",
      date: today,
      startTime: "10:30",
      endTime: "12:00",
      status: "completada",
      serviceOrder: allOrders.find(o => o.id === "so-34")!,
    },
    {
      id: "att-41",
      serviceOrderId: "so-36",
      technicianId: "tech-8",
      date: today,
      startTime: "12:00",
      endTime: "13:30",
      status: "en_curso",
      serviceOrder: allOrders.find(o => o.id === "so-36")!,
    },
    {
      id: "att-42",
      serviceOrderId: "so-38",
      technicianId: "tech-8",
      date: today,
      startTime: "13:30",
      endTime: "15:00",
      status: "programada",
      serviceOrder: allOrders.find(o => o.id === "so-38")!,
    },
    {
      id: "att-43",
      serviceOrderId: "so-42",
      technicianId: "tech-8",
      date: today,
      startTime: "15:00",
      endTime: "16:30",
      status: "programada",
      serviceOrder: allOrders.find(o => o.id === "so-42")!,
    },
    {
      id: "att-44",
      serviceOrderId: "so-44",
      technicianId: "tech-8",
      date: today,
      startTime: "16:30",
      endTime: "18:00",
      status: "programada",
      serviceOrder: allOrders.find(o => o.id === "so-44")!,
    },
  ];
};

const generateHours = () => {
  const hours = [];
  for (let i = 7; i <= 22; i++) {
    hours.push(i);
  }
  return hours;
};

const HOURS = generateHours();
const HOUR_WIDTH = 120;

export default function SchedulePage() {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [technicians] = useState<Technician[]>(mockTechnicians);
  
  // Filtrar solo las órdenes pendientes (las primeras 3)
  const allOrders = createMockServiceOrders();
  const [serviceOrders, setServiceOrders] = useState<ServiceOrder[]>(
    allOrders.filter(order => order.id.startsWith("so-pending"))
  );
  
  const [attentions, setAttentions] = useState<Attention[]>(
    createInitialAttentions()
  );

  const [draggedOrder, setDraggedOrder] = useState<ServiceOrder | null>(null);
  const [dragOverSlot, setDragOverSlot] = useState<{
    technicianId: string;
    hour: number;
  } | null>(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error" | "info" | "warning",
  });

  const timeToMinutes = (time: string): number => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const getAttentionStyle = (attention: Attention) => {
    const startMinutes = timeToMinutes(attention.startTime);
    const endMinutes = timeToMinutes(attention.endTime);
    const duration = endMinutes - startMinutes;

    const startOfDay = 7 * 60;
    const leftOffset = ((startMinutes - startOfDay) / 60) * HOUR_WIDTH;
    const width = (duration / 60) * HOUR_WIDTH;

    return {
      left: `${leftOffset}px`,
      width: `${width}px`,
      position: "absolute" as const,
      height: "calc(100% - 8px)",
      top: "4px",
    };
  };

  const getPreviewStyle = (hour: number, duration: number) => {
    const startOfDay = 7 * 60;
    const leftOffset = ((hour * 60 - startOfDay) / 60) * HOUR_WIDTH;
    const width = (duration / 60) * HOUR_WIDTH;

    return {
      left: `${leftOffset}px`,
      width: `${width}px`,
      position: "absolute" as const,
      height: "calc(100% - 8px)",
      top: "4px",
    };
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "alta":
        return "#F44336";
      case "media":
        return "#FF9800";
      case "baja":
        return "#4CAF50";
      default:
        return "#2196F3";
    }
  };

  const handleDragEnter = (technicianId: string, hour: number) => {
    if (draggedOrder) {
      setDragOverSlot({ technicianId, hour });
    }
  };

  const handleDragLeave = () => {
    setDragOverSlot(null);
  };

  const handleDrop = (technicianId: string, hour: number) => {
    if (!draggedOrder) return;

    const startTime = `${hour.toString().padStart(2, "0")}:00`;
    const durationHours = draggedOrder.estimatedDuration / 60;
    const endHour = hour + durationHours;
    const endMinutes = (durationHours % 1) * 60;
    const endTime = `${Math.floor(endHour)
      .toString()
      .padStart(2, "0")}:${Math.floor(endMinutes).toString().padStart(2, "0")}`;

    const newAttention: Attention = {
      id: `att-${Date.now()}`,
      serviceOrderId: draggedOrder.id,
      technicianId,
      date: selectedDate,
      startTime,
      endTime,
      status: "programada",
      serviceOrder: draggedOrder,
    };

    setAttentions([...attentions, newAttention]);
    setServiceOrders(serviceOrders.filter((o) => o.id !== draggedOrder.id));
    setDraggedOrder(null);
    setDragOverSlot(null);

    setSnackbar({
      open: true,
      message: "✅ Atención programada",
      severity: "success",
    });
  };

  const handleStartAttention = (attention: Attention) => {
    const updated = attentions.map((att) =>
      att.id === attention.id ? { ...att, status: "en_curso" as const } : att,
    );
    setAttentions(updated);
    setSnackbar({
      open: true,
      message: "🔄 Atención iniciada",
      severity: "info",
    });
  };

  const handleCompleteAttention = (attention: Attention) => {
    const updated = attentions.map((att) =>
      att.id === attention.id ? { ...att, status: "completada" as const } : att,
    );
    setAttentions(updated);
    setSnackbar({ open: true, message: "✅ Completada", severity: "success" });
  };

  const handleDeleteAttention = (attention: Attention) => {
    if (!confirm("¿Cancelar atención?")) return;
    setServiceOrders([...serviceOrders, attention.serviceOrder]);
    setAttentions(attentions.filter((att) => att.id !== attention.id));
    setSnackbar({ open: true, message: "🗑️ Cancelada", severity: "info" });
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "calc(100vh - 65px)",
        overflow: "hidden",
      }}
    >
      {/* Sidebar */}
      <Box
        sx={{
          flexShrink: 0,
          p: 2,
          width: 300,
          background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
          borderRight: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <Typography variant="h6" fontWeight={700} gutterBottom color="white">
          📋 Órdenes Pendientes
        </Typography>
        <Typography variant="caption" color="white">
          Arrastra al calendario
        </Typography>
        <Box
          sx={{ mt: 2, maxHeight: "calc(100vh - 150px)", overflowY: "auto" }}
        >
          {serviceOrders.map((order) => (
            <ServiceOrderCard
              key={order.id}
              serviceOrder={order}
              onDragStart={setDraggedOrder}
              onDragEnd={() => setDragOverSlot(null)}
            />
          ))}
          {serviceOrders.length === 0 && (
            <Box sx={{ textAlign: "center", py: 4, color: "text.secondary" }}>
              <EventNoteIcon sx={{ fontSize: 48, opacity: 0.3 }} />
              <Typography variant="body2" color="white">Sin órdenes</Typography>
            </Box>
          )}
        </Box>
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <Box
          sx={{
            background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)",
            p: 2,
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box display="flex" alignItems="center" gap={2}>
              <CalendarTodayIcon sx={{ fontSize: 28, color: "primary.main" }} />
              <Box>
                <Typography variant="h5" fontWeight={700} color="white">
                  Planificación de OTS
                </Typography>
                <Typography variant="caption" color="white">
                  Vista horizontal por horas • {attentions.length} atenciones programadas
                </Typography>
              </Box>
            </Box>
            <TextField
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              size="small"
              sx={{
                background: "white",
                borderRadius: "12px",
              }}
            />
          </Box>
        </Box>

        {/* Calendar Grid */}
        <Box sx={{ flex: 1, overflow: "auto" }}>
          <Box sx={{ minWidth: "max-content" }}>
            {/* Hour Headers */}
            <Box sx={{ display: "flex", position: "sticky", top: 0, zIndex: 11 }}>
              <Box
                sx={{
                  width: 200,
                  background: "rgba(26, 26, 46, 0.95)",
                  borderRight: "2px solid rgba(255, 255, 255, 0.1)",
                  borderBottom: "2px solid rgba(255, 255, 255, 0.1)",
                  p: 1,
                  color: "white",
                }}
              >
                <Typography variant="subtitle2" fontWeight={700}>
                  Técnicos ({technicians.length})
                </Typography>
              </Box>
              {HOURS.map((hour) => (
                <Box
                  key={hour}
                  sx={{
                    width: HOUR_WIDTH,
                    borderRight: "1px solid rgba(255, 255, 255, 0.05)",
                    borderBottom: "2px solid rgba(255, 255, 255, 0.1)",
                    background: "rgba(26, 26, 46, 0.95)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="body2" fontWeight={600} color="white">
                    {hour}:00
                  </Typography>
                </Box>
              ))}
            </Box>

            {/* Technician Rows */}
            {technicians.map((tech) => (
              <Box
                key={tech.id}
                sx={{
                  display: "flex",
                  position: "relative",
                  borderBottom: "1px solid #e0e0e0",
                }}
              >
                {/* Technician Column */}
                <Box
                  sx={{
                    width: 200,
                    minHeight: 100,
                    borderRight: "2px solid rgba(255, 255, 255, 0.1)",
                    borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
                    p: 1.5,
                    background: "rgba(255, 255, 255, 0.02)",
                  }}
                >
                  <Box display="flex" alignItems="center" gap={1}>
                    <Avatar sx={{ bgcolor: tech.color, width: 36, height: 36 }}>
                      <PersonIcon fontSize="small" />
                    </Avatar>
                    <Box>
                      <Typography variant="body2" fontWeight={700}>
                        {tech.name} {tech.lastName}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {tech.specialization}
                      </Typography>
                    </Box>
                  </Box>
                  <Chip
                    label={tech.isAvailable ? "Disponible" : "Ocupado"}
                    size="small"
                    color={tech.isAvailable ? "success" : "default"}
                    sx={{ mt: 1, fontSize: "0.7rem" }}
                  />
                </Box>

                {/* Hour Grid */}
                <Box sx={{ display: "flex", position: "relative", flex: 1 }}>
                  {HOURS.map((hour) => (
                    <Box
                      key={hour}
                      onDragOver={(e) => e.preventDefault()}
                      onDragEnter={() => handleDragEnter(tech.id, hour)}
                      onDragLeave={handleDragLeave}
                      onDrop={() => handleDrop(tech.id, hour)}
                      sx={{
                        width: HOUR_WIDTH,
                        minHeight: 100,
                        borderRight: "1px solid rgba(255, 255, 255, 0.05)",
                        borderBottom: "1px solid rgba(255, 255, 255, 0.05)",
                        background:
                          dragOverSlot?.technicianId === tech.id &&
                          dragOverSlot?.hour === hour
                            ? "rgba(33, 150, 243, 0.15)"
                            : "transparent",
                        transition: "background 0.2s ease",
                        "&:hover": {
                          background: draggedOrder
                            ? "rgba(255, 255, 255, 0.05)"
                            : "rgba(255, 255, 255, 0.02)",
                        },
                      }}
                    />
                  ))}

                  {/* Preview Ghost cuando está por soltar */}
                  {draggedOrder &&
                    dragOverSlot?.technicianId === tech.id &&
                    dragOverSlot?.hour && (
                      <Box
                        sx={{
                          ...getPreviewStyle(
                            dragOverSlot.hour,
                            draggedOrder.estimatedDuration,
                          ),
                          background: `linear-gradient(135deg, ${getPriorityColor(
                            draggedOrder.priority,
                          )}40 0%, ${getPriorityColor(draggedOrder.priority)}60 100%)`,
                          border: `3px dashed ${getPriorityColor(draggedOrder.priority)}`,
                          borderRadius: 2,
                          p: 1.5,
                          pointerEvents: "none",
                          animation: "pulse 1.5s ease-in-out infinite",
                          "@keyframes pulse": {
                            "0%, 100%": {
                              opacity: 0.6,
                            },
                            "50%": {
                              opacity: 0.9,
                            },
                          },
                        }}
                      >
                        <Typography variant="body2" fontWeight={700} color="white">
                          {draggedOrder.code}
                        </Typography>
                        <Typography variant="caption" color="white">
                          {draggedOrder.clientName}
                        </Typography>
                        <Box
                          display="flex"
                          gap={0.5}
                          mt={0.5}
                          sx={{
                            background: "rgba(0,0,0,0.3)",
                            p: 0.5,
                            borderRadius: 1,
                          }}
                        >
                          <Typography variant="caption" fontWeight={600} color="white">
                            {dragOverSlot.hour}:00 -{" "}
                            {Math.floor(
                              dragOverSlot.hour + draggedOrder.estimatedDuration / 60,
                            )}
                            :
                            {Math.floor(
                              ((draggedOrder.estimatedDuration / 60) % 1) * 60,
                            )
                              .toString()
                              .padStart(2, "0")}
                          </Typography>
                        </Box>
                      </Box>
                    )}

                  {/* Actual Attentions */}
                  {attentions
                    .filter(
                      (att) =>
                        att.technicianId === tech.id && att.date === selectedDate,
                    )
                    .map((attention) => (
                      <Box key={attention.id} sx={getAttentionStyle(attention)}>
                        <AttentionCard
                          attention={attention}
                          technicianColor={tech.color}
                          onEdit={() => console.log("Edit")}
                          onDelete={() => handleDeleteAttention(attention)}
                          onStart={() => handleStartAttention(attention)}
                          onComplete={() => handleCompleteAttention(attention)}
                        />
                      </Box>
                    ))}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}