import { jsPDF } from 'jspdf';
import { RESUME_DATA } from '../data/portfolioData';

export function createResumeVectorDoc(): jsPDF {
  const doc = new jsPDF({
    unit: 'pt',
    format: 'a4',
  });

  const margin = 40;
  const pageWidth = doc.internal.pageSize.getWidth();
  let y = 48;

  // Header Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(29, 29, 31);
  doc.text(RESUME_DATA.name.toUpperCase(), margin, y);
  y += 18;

  // Subtitle
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(79, 70, 229);
  doc.text(RESUME_DATA.title, margin, y);
  y += 18;

  // Contact info
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(75, 85, 99);
  const contactLine = `${RESUME_DATA.contact.phone}  |  ${RESUME_DATA.contact.email}  |  ${RESUME_DATA.contact.location}  |  ${RESUME_DATA.contact.linkedin}`;
  doc.text(contactLine, margin, y);
  y += 14;

  // Divider Line
  doc.setDrawColor(229, 231, 235);
  doc.line(margin, y, pageWidth - margin, y);
  y += 18;

  const checkPage = (neededHeight: number) => {
    if (y + neededHeight > doc.internal.pageSize.getHeight() - 40) {
      doc.addPage();
      y = 40;
    }
  };

  const addSectionHeader = (title: string) => {
    checkPage(30);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(79, 70, 229);
    doc.text(title.toUpperCase(), margin, y);
    y += 5;
    doc.setDrawColor(229, 231, 235);
    doc.line(margin, y, pageWidth - margin, y);
    y += 14;
  };

  // Summary
  addSectionHeader('Professional Summary');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(55, 65, 81);
  const summaryLines = doc.splitTextToSize(RESUME_DATA.summary, pageWidth - margin * 2);
  doc.text(summaryLines, margin, y);
  y += summaryLines.length * 12 + 14;

  // Internships and Projects
  addSectionHeader('Internships and Projects');
  RESUME_DATA.experience.forEach((exp) => {
    checkPage(50);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(17, 24, 39);
    doc.text(exp.company, margin, y);
    y += 12;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(79, 70, 229);
    doc.text(exp.role, margin, y);
    y += 12;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(75, 85, 99);
    exp.points.forEach((pt) => {
      const ptLines = doc.splitTextToSize(`•  ${pt}`, pageWidth - margin * 2 - 10);
      checkPage(ptLines.length * 11);
      doc.text(ptLines, margin + 5, y);
      y += ptLines.length * 11 + 3;
    });
    y += 6;
  });

  // Education
  addSectionHeader('Education');
  RESUME_DATA.education.forEach((edu) => {
    checkPage(35);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(17, 24, 39);
    doc.text(`${edu.institution}  (${edu.period})`, margin, y);
    y += 11;
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(79, 70, 229);
    doc.text(edu.degree, margin, y);
    y += 11;
    doc.setTextColor(107, 114, 128);
    doc.text(edu.highlights, margin, y);
    y += 14;
  });

  // Certificates
  addSectionHeader('Certificates');
  RESUME_DATA.certifications.forEach((cert) => {
    checkPage(20);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(17, 24, 39);
    doc.text(`•  ${cert.title} — ${cert.issuer} (${cert.date})`, margin, y);
    y += 13;
  });
  y += 6;

  // Skills
  addSectionHeader('Skills');
  checkPage(45);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(8.5);
  doc.setTextColor(17, 24, 39);
  doc.text('UI/UX Skills: ', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(75, 85, 99);
  const uiUxText = doc.splitTextToSize(RESUME_DATA.skills.uiUx.join(', '), pageWidth - margin * 2 - 75);
  doc.text(uiUxText, margin + 75, y);
  y += uiUxText.length * 11 + 8;

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(17, 24, 39);
  doc.text('Tools: ', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(75, 85, 99);
  const toolsText = doc.splitTextToSize(RESUME_DATA.skills.tools.join(', '), pageWidth - margin * 2 - 75);
  doc.text(toolsText, margin + 75, y);
  y += toolsText.length * 11 + 8;

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(17, 24, 39);
  doc.text('Soft Skills: ', margin, y);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(75, 85, 99);
  const softText = doc.splitTextToSize(RESUME_DATA.skills.softSkills.join(', '), pageWidth - margin * 2 - 75);
  doc.text(softText, margin + 75, y);

  return doc;
}

export function downloadDefaultResume(fileName = 'Jayanth_Vishwakarma_G_UI_UX_Resume.pdf') {
  const doc = createResumeVectorDoc();
  doc.save(fileName);
}

export function previewDefaultResume() {
  const doc = createResumeVectorDoc();
  const pdfBlob = doc.output('blob');
  const blobUrl = URL.createObjectURL(pdfBlob);
  window.open(blobUrl, '_blank');
}
