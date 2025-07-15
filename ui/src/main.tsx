import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import PdfEditor from "./PdfEditor.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <PdfEditor />
  </StrictMode>
);
