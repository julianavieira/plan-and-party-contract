import jsPDF from "jspdf";
import logoUrl from "@/assets/trevo-logo.jpg";

export async function generateContractPDF(text: string, fileName = "contrato-trevo-filmes.pdf"): Promise<Blob> {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 48;
  const maxWidth = pageWidth - margin * 2;

  // Header com logo
  try {
    const img = await loadImage(logoUrl);
    const w = 70;
    const h = (img.height / img.width) * w;
    doc.addImage(img, "JPEG", pageWidth / 2 - w / 2, 24, w, h);
  } catch {
    // logo opcional
  }

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);

  let y = 110;
  const lines = doc.splitTextToSize(text, maxWidth);
  for (const line of lines) {
    if (y > pageHeight - margin) {
      doc.addPage();
      y = margin;
    }
    // título do contrato em destaque
    if (line.includes("CONTRATO DE PRESTAÇÃO")) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.setTextColor(20, 184, 166);
      doc.text(line, pageWidth / 2, y, { align: "center" });
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(60, 60, 60);
      y += 22;
      continue;
    }
    // section headers
    const isHeader = /^[A-ZÁÀÂÃÉÊÍÓÔÕÚÇ\s]+$/.test(line.trim()) && line.trim().length > 3 && line.trim().length < 40;
    if (isHeader) {
      doc.setFont("helvetica", "bold");
      doc.setTextColor(80, 100, 60);
      doc.text(line, margin, y);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(60, 60, 60);
      y += 16;
      continue;
    }
    doc.text(line, margin, y);
    y += 13;
  }

  return doc.output("blob");
}

function loadImage(url: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}

export function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      resolve(result.split(",")[1]); // strip data:...;base64,
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
