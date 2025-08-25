// src/pages/doctor/PrescriptionComp/DownloadPDF.jsx
import React from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const DownloadPDF = () => {
  const handleDownload = async () => {
    const element = document.getElementById("prescription-content");

    // Convert to canvas
    const canvas = await html2canvas(element, {
      useCORS: true,
      backgroundColor: "#ffffff", // avoids transparent issues
      onclone: (clonedDoc) => {
        // Fix oklch color issue by forcing fallback
        clonedDoc.querySelectorAll("*").forEach((el) => {
          if (el.style.color.includes("oklch")) el.style.color = "#000000";
          if (el.style.backgroundColor.includes("oklch"))
            el.style.backgroundColor = "#ffffff";
        });
      },
    });

    const imgData = canvas.toDataURL("image/png");

    // Create PDF
    const pdf = new jsPDF("p", "mm", "a4");
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("prescription.pdf");
  };

  return (
    <button
      onClick={handleDownload}
      className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
    >
      Download PDF
    </button>
  );
};

export default DownloadPDF;
