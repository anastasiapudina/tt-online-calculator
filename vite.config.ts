import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	base: "/tt-online-calculator/", // Важно для корректных путей на GitHub Pages
})
