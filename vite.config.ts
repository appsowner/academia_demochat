import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  preview: {
    host: '0.0.0.0',  // Permite acceso externo
    port: process.env.PORT || 3000, // Usa el puerto asignado por Render
    allowedHosts: ['academia-demochat.onrender.com'], // Agrega tu dominio de Render
  },
});
