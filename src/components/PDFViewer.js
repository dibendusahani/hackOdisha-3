import React, { useState } from "react";
import pdfjs from "pdfjs-dist/build/pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/pdf.worker.js`;

function PdfViewer() {
  const [pdfData, setPdfData] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
      const fileReader = new FileReader();

      fileReader.onload = async (e) => {
        const arrayBuffer = e.target.result;
        const pdf = await pdfjs.getDocument(arrayBuffer).promise;
        setPdfData(pdf);
      };

      fileReader.readAsArrayBuffer(file);
    }
  };

  const renderPdf = () => {
    if (pdfData) {
      // Render the first page of the PDF
      pdfData.getPage(1).then((page) => {
        const canvas = document.getElementById("pdfViewer");
        const context = canvas.getContext("2d");
        const viewport = page.getViewport({ scale: 1.5 });

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        // Render the PDF page on the canvas
        page.render({
          canvasContext: context,
          viewport: viewport,
        });
      });
    }
  };

  return (
    <div>
      <h1>PDF Viewer</h1>
      <img><input></input></img>
      <input type="file" accept=".pdf" onChange={handleFileChange}  />
      <canvas id="pdfViewer"></canvas>
      {renderPdf()}
    </div>
  );
}

export default PdfViewer;
