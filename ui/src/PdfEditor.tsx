import type { Template } from "@pdfme/common";
import { Designer } from "@pdfme/ui";
import { useEffect, useRef, useState } from "react";
import { text, image } from "@pdfme/schemas";

function PdfEditor() {
  const designerRef = useRef<HTMLDivElement>(null);
  const [designerInstance, setDesignerInstance] = useState<Designer | null>(
    null
  );

  useEffect(() => {
    const loadDesigner = async () => {
      const res = await fetch("/template.pdf");
      const arrayBuffer = await res.arrayBuffer();
      const basePdf = `data:application/pdf;base64,${btoa(
        String.fromCharCode(...new Uint8Array(arrayBuffer))
      )}`;

      const template: Template = {
        basePdf,
        schemas: [{}], // start with an empty schema
      };

      if (designerRef.current) {
        const designer = new Designer({
          domContainer: designerRef.current,
          template,
          plugins: {
            text,
            image,
          },
        });

        setDesignerInstance(designer);
      }
    };

    loadDesigner();
  }, []);

  const logJson = () => {
    console.log(designerInstance?.getTemplate());
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">PDF Designer (pdfme)</h2>
      <div ref={designerRef} style={{ width: "100%", height: "800px" }} />
      <button onClick={logJson}>log json</button>
    </div>
  );
}

export default PdfEditor;
