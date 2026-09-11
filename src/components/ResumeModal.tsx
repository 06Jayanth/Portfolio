import React, { useRef, useState } from 'react';
import { X, Download, Printer, ExternalLink, Mail, Phone, MapPin, Globe, CheckCircle2, Loader2, FileText } from 'lucide-react';
import { RESUME_DATA } from '../data/portfolioData';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const generateVectorPdf = () => {
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

    doc.save('Jayanth_Vishwakarma_G_UI_UX_Resume.pdf');
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      if (resumeRef.current) {
        // High-res canvas rendering of the formatted resume sheet
        const canvas = await html2canvas(resumeRef.current, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: '#ffffff',
        });

        const imgWidth = 210; // A4 mm
        const pageHeight = 297; // A4 mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        const pdf = new jsPDF('p', 'mm', 'a4');
        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
        heightLeft -= pageHeight;

        while (heightLeft > 0) {
          position = heightLeft - imgHeight;
          pdf.addPage();
          pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
          heightLeft -= pageHeight;
        }

        pdf.save('Jayanth_Vishwakarma_G_UI_UX_Resume.pdf');
      } else {
        generateVectorPdf();
      }
    } catch (err) {
      console.warn('Canvas PDF error, falling back to direct vector jsPDF:', err);
      generateVectorPdf();
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Bar */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
              Resume Preview — {RESUME_DATA.name}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 shadow-2xs transition-colors cursor-pointer"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>

            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-2xs transition-colors cursor-pointer disabled:opacity-60"
              title="Download Resume as PDF document"
            >
              {isDownloading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Generating PDF...</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </>
              )}
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors ml-1 cursor-pointer"
              aria-label="Close resume modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Resume Sheet Content */}
        <div
          ref={resumeRef}
          id="resume-printable-content"
          className="p-8 sm:p-12 overflow-y-auto space-y-8 bg-white font-sans text-slate-800 print:p-0"
        >
          {/* Header */}
          <div className="border-b border-slate-200 pb-6 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                {RESUME_DATA.name}
              </h1>
              <span className="text-sm font-bold text-indigo-600 tracking-wide uppercase">
                {RESUME_DATA.title}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-600">
              <a
                href={`tel:${RESUME_DATA.contact.phone.replace(/\s+/g, '')}`}
                className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors font-medium"
              >
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                <span>{RESUME_DATA.contact.phone}</span>
              </a>

              <a
                href={`mailto:${RESUME_DATA.contact.email}`}
                className="flex items-center gap-1.5 hover:text-indigo-600 transition-colors font-medium"
              >
                <Mail className="w-3.5 h-3.5 text-slate-400" />
                <span>{RESUME_DATA.contact.email}</span>
              </a>

              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>{RESUME_DATA.contact.location}</span>
              </span>

              <a
                href={RESUME_DATA.contact.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-indigo-600 hover:text-indigo-800 font-semibold"
              >
                <Globe className="w-3.5 h-3.5" />
                <span>{RESUME_DATA.contact.linkedin}</span>
                <ExternalLink className="w-3 h-3 ml-0.5" />
              </a>
            </div>
          </div>

          {/* Professional Summary */}
          <div className="space-y-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Professional Summary
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed">
              {RESUME_DATA.summary}
            </p>
          </div>

          {/* Internships and Projects */}
          <div className="space-y-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Internships and Projects
            </h2>

            <div className="space-y-6">
              {RESUME_DATA.experience.map((exp, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <div>
                      <h3 className="text-base font-bold text-slate-900">{exp.company}</h3>
                      <span className="inline-block mt-0.5 px-2.5 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-[11px] font-semibold">
                        {exp.role}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-1.5 pt-1.5">
                    {exp.points.map((pt, pIdx) => (
                      <li key={pIdx} className="text-xs text-slate-700 flex items-start gap-2 leading-relaxed">
                        <span className="text-indigo-600 font-bold mt-0.5">•</span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Education
            </h2>

            <div className="space-y-4">
              {RESUME_DATA.education.map((edu, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <h3 className="text-sm font-bold text-slate-900">{edu.institution}</h3>
                    <span className="text-xs font-mono text-slate-500">{edu.period}</span>
                  </div>
                  <div className="text-xs font-medium text-indigo-600">{edu.degree}</div>
                  <p className="text-xs text-slate-500 italic pt-0.5">{edu.highlights}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Certificates */}
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Certificates
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {RESUME_DATA.certifications.map((cert, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900 block">{cert.title}</span>
                      <span className="text-slate-600">{cert.issuer}</span>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono font-medium text-slate-500 shrink-0">
                    {cert.date}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="space-y-3 pt-2">
            <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600">
              Skills
            </h2>
            <div className="space-y-2.5 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                <span className="font-bold text-slate-900 block">UI/UX Skills:</span>
                <p className="text-slate-600 leading-relaxed">
                  {RESUME_DATA.skills.uiUx.join(', ')}
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 block">Tools:</span>
                  <p className="text-slate-600 leading-relaxed">
                    {RESUME_DATA.skills.tools.join(', ')}
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 block">Soft Skills:</span>
                  <p className="text-slate-600 leading-relaxed">
                    {RESUME_DATA.skills.softSkills.join(', ')}
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
