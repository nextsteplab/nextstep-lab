import { hydrateRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const rootElement = document.getElementById("root")!;

// If the page was pre-rendered (has child nodes), hydrate; otherwise do a full render
if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, <App />);
} else {
  import("react-dom/client").then(({ createRoot }) => {
    createRoot(rootElement).render(<App />);
  });
}
