import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Legacy entry point — kept for compatibility
// The entry-client.tsx is the primary entry for SSG hydration
createRoot(document.getElementById("root")!).render(<App />);
