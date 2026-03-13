import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Default client build settings; SSR build uses CLI --ssr flag
  },
  ssr: {
    // Externalize node built-ins for SSR
    noExternal: [
      "lucide-react",
      "class-variance-authority",
      "clsx",
      "tailwind-merge",
      "tailwindcss-animate",
      "@radix-ui/react-tooltip",
      "@radix-ui/react-toast",
      "@radix-ui/react-slot",
    ],
  },
}));
