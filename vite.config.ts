// เดิม: import react from "@vitejs/plugin-react";
// เปลี่ยนเป็น:
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import reactSwc from "@vitejs/plugin-react-swc"; // <-- เปลี่ยนตรงนี้
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactSwc(), tailwindcss()], // <-- เปลี่ยนตรงนี้
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
