import React, { useState } from "react";
import { Box, Button, Alert, LinearProgress, Typography } from "@mui/material";
import { CloudUpload as CloudUploadIcon } from "@mui/icons-material";

interface FileUploaderProps {
  accept?: string;
  maxSize?: number;
  onFileSelect?: (file: File) => void;
  onError?: (error: string) => void;
  multiple?: boolean;
  disabled?: boolean;
}

export const FileUploader: React.FC<FileUploaderProps> = ({
  accept = ".xslx",
  maxSize = 10,
  onFileSelect,
  onError,
  multiple = false,
  disabled = false,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validateFile = (file: File): boolean => {
    // Validar tamanio
    const fileSizeMB = file.size / (1024 * 1024);
    if (fileSizeMB > maxSize) {
      const errorMsg = `El archivo excede el tamaño máximo de ${maxSize}MB`;
      setError(errorMsg);
      onError?.(errorMsg);
      return false;
    }

    // Validar extension
    const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();
    const acceptedExtensions = accept
      .split(",")
      .map((ext) => ext.trim().toLowerCase());

    if (!acceptedExtensions.includes(fileExtension)) {
      const errorMsg = `Tipo de archivo no válido. Solo se aceptan: ${accept}`;
      setError(errorMsg);
      onError?.(errorMsg);
      return false;
    }

    return true;
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && validateFile(file)) {
      setError(null);
      setSelectedFile(file);
      onFileSelect?.(file);

      // Simular proceso de carga
      setUploading(true);
      setTimeout(() => setUploading(false), 100);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!disabled) {
      setIsDragging(true);
    }
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);

    if (disabled) return;

    const file = event.dataTransfer.files?.[0];
    if (file && validateFile(file)) {
      setError(null);
      setSelectedFile(file);
      onFileSelect?.(file);

      setUploading(true);
      setTimeout(() => setUploading(false), 1500);
    }
  };

  return (
    <Box>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Box
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        sx={{
          border: "2px dashed",
          borderColor: isDragging ? "primary.main" : "divider",
          borderRadius: 3,
          p: 6,
          textAlign: "center",
          bgcolor: isDragging ? "action.hover" : "grey.50",
          transition: "all 0.3s ease",
          cursor: disabled ? "not-allowed" : "pointer",
          opacity: disabled ? 0.6 : 1,
          "&:hover": {
            bgcolor: disabled ? "grey.50" : "action.hover",
            borderColor: disabled ? "dividir" : "primary.light",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Box
            sx={{
              bgcolor: "primary.50",
              p: 3,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CloudUploadIcon sx={{ fontSize: 48, color: "primary.main" }} />
          </Box>

          <Box>
            <Typography
              variant="h6"
              fontWeight="600"
              color="text.primary"
              gutterBottom
            >
              Arraste y suelta el archivo aquí
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              o haz clic para seleccionar
            </Typography>
          </Box>

          <Button
            component="label"
            variant="contained"
            disabled={disabled || uploading}
            sx={{
              py: 1.5,
              px: 4,
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 600,
              boxShadow: 2,
            }}
          >
            Seleccionar archivo
            <input
              type="file"
              hidden
              accept={accept}
              onChange={handleFileChange}
              multiple={multiple}
              disabled={disabled}
            />
          </Button>

          <Typography variant="caption" color="text.secondary">
            Formatos aceptados: {accept} | Tamaño máximo: {maxSize}MB
          </Typography>

          {/* {uploading && (
            <Box sx={{ width: "100%", maxWidth: 400, mt: 2 }}>
              <LinearProgress />
            </Box>
          )} */}

          {selectedFile && !uploading && (
            <Alert severity="success" sx={{ mt: 2 }}>
              <Typography variant="body2" fontWeight="600">
                {(selectedFile.size / 1024).toFixed(2)} KB
              </Typography>
            </Alert>
          )}
        </Box>
      </Box>
    </Box>
  );
};