import React, { useState } from 'react';
import { 
  Award, 
  ExternalLink, 
  Calendar, 
  CheckCircle, 
  ShieldCheck, 
  Maximize2, 
  X, 
  Copy, 
  Check, 
  Mail, 
  ZoomIn, 
  ZoomOut, 
  RotateCcw,
  Printer,
  FileCheck
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { Certification } from '../types';

export const CertificationsSection: React.FC = () => {
  const { certifications } = usePortfolio();
  const [selectedCert, setSelectedCert] = useState<Certification | null>(null);
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const visibleCertifications = (certifications || []).filter(c => !c.hidden);

  const handleCopyId = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const openCertModal = (cert: Certification) => {
    setSelectedCert(cert);
    setZoomLevel(1);
  };

  const handlePrint = (certUrl: string) => {
    const printWindow = window.open(certUrl, '_blank');
    if (printWindow) {
      printWindow.onload = () => {
        printWindow.print();
      };
    }
  };

  if (!visibleCertifications || visibleCertifications.length === 0) {
    return null;
  }

  return (
    <section id="certificates" className="py-20 md:py-28 bg-[#FBFBFC] border-t border-gray-100 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-800 mb-3.5">
            <Award className="w-4 h-4 text-blue-600" />
            <span>Official Certificates</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Original Certificates & Internships
          </h2>
          <p className="mt-2 text-base text-slate-600 leading-relaxed">
            Verified internship completion certificates and domain credentials, displayed in their original authentic form as issued by the organizations.
          </p>
        </div>

        {/* Certificate Display Grid: Full Original Certificates Displayed Front & Center */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {visibleCertifications.map((cert) => {
            const certId = cert.certificateId || cert.internId;
            return (
              <div
                key={cert.id}
                className="bg-white rounded-3xl border border-gray-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden group"
              >
                {/* Certificate Document Framing Header */}
                <div className="px-6 py-4 bg-gray-50/90 border-b border-gray-200/70 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-100" />
                    <span className="text-xs font-bold text-gray-900 tracking-wide uppercase">
                      {cert.issuer}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {certId && (
                      <div className="flex items-center gap-1.5 px-2.5 py-1 bg-white rounded-lg border border-gray-200 text-xs font-mono font-bold text-gray-700 shadow-2xs">
                        <span className="text-gray-400 font-medium">ID:</span>
                        <span>{certId}</span>
                        <button
                          onClick={(e) => handleCopyId(certId, e)}
                          className="text-gray-400 hover:text-blue-600 ml-0.5 cursor-pointer"
                          title="Copy Certificate ID"
                        >
                          {copiedId === certId ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* THE ORIGINAL CERTIFICATE DOCUMENT (Prominently Shown As-Is) */}
                <div 
                  className="relative p-4 sm:p-6 bg-slate-900/5 flex items-center justify-center cursor-pointer overflow-hidden border-b border-gray-100 min-h-[340px] sm:min-h-[420px] select-none"
                  onClick={() => openCertModal(cert)}
                  title="Click to view full original certificate"
                >
                  {cert.image ? (
                    <div className="relative w-full flex items-center justify-center">
                      <img
                        src={cert.image}
                        alt={cert.title}
                        className="w-full max-h-[380px] sm:max-h-[460px] object-contain rounded-xl shadow-md border border-gray-300/80 bg-white transition-transform duration-300 group-hover:scale-[1.01]"
                        loading="lazy"
                      />

                      {/* Gentle Hover Badge */}
                      <div className="absolute inset-0 flex items-center justify-center bg-slate-950/0 group-hover:bg-slate-950/20 transition-all rounded-xl">
                        <div className="opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-200 px-4 py-2 bg-slate-900/90 backdrop-blur-xs text-white rounded-xl text-xs font-bold shadow-lg flex items-center gap-2">
                          <Maximize2 className="w-4 h-4 text-blue-400" />
                          <span>Click to Inspect Fullscreen</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-48 text-gray-400 text-xs">
                      Certificate document preview unavailable
                    </div>
                  )}
                </div>

                {/* Metadata & Actions Section */}
                <div className="p-6 flex flex-col justify-between flex-1 gap-4">
                  <div>
                    {/* Role & Date row */}
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        <span>Issued: {cert.date}</span>
                        {cert.duration && ` • ${cert.duration}`}
                      </span>

                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                        <FileCheck className="w-3.5 h-3.5" />
                        <span>Verified Original</span>
                      </span>
                    </div>

                    {/* Certificate Title */}
                    <h3 className="text-base sm:text-lg font-bold text-gray-900 leading-snug">
                      {cert.title}
                    </h3>

                    {/* Candidate & Domain details */}
                    <div className="mt-2.5 flex flex-wrap gap-2 text-xs">
                      {cert.recipientName && (
                        <span className="px-2.5 py-1 rounded-lg bg-gray-100 font-semibold text-gray-800">
                          Recipient: {cert.recipientName}
                        </span>
                      )}
                      {cert.role && (
                        <span className="px-2.5 py-1 rounded-lg bg-slate-100 font-semibold text-slate-800 border border-slate-200">
                          {cert.role}
                        </span>
                      )}
                    </div>

                    {/* Official Accreditations */}
                    {cert.accreditations && cert.accreditations.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {cert.accreditations.map((acc, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-slate-50 text-slate-700 text-[11px] font-medium border border-slate-200"
                          >
                            <ShieldCheck className="w-3 h-3 text-blue-600" />
                            <span>{acc}</span>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
                    <button
                      onClick={() => openCertModal(cert)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                      <span>Full Inspection</span>
                    </button>

                    <div className="flex items-center gap-2">
                      {cert.image && (
                        <a
                          href={cert.image}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-50 border border-gray-200 transition-colors cursor-pointer"
                          title="Open original vector certificate in new window"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Original File</span>
                        </a>
                      )}

                      {cert.verificationEmail ? (
                        <a
                          href={`mailto:${cert.verificationEmail}?subject=Certificate%20Verification%20${certId || cert.title}`}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 shadow-xs transition-colors cursor-pointer"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>Verify</span>
                        </a>
                      ) : cert.credentialUrl ? (
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-slate-900 hover:bg-slate-800 shadow-xs transition-colors cursor-pointer"
                        >
                          <span>Verify</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* FULLSCREEN HIGH-RESOLUTION CERTIFICATE INSPECTOR MODAL */}
        {selectedCert && (
          <div
            className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-6"
            onClick={() => setSelectedCert(null)}
          >
            <div
              className="relative max-w-5xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-700 flex flex-col max-h-[95vh]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex flex-wrap items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-emerald-500" />
                  <div>
                    <h4 className="text-sm sm:text-base font-bold text-gray-900 leading-tight">
                      {selectedCert.title}
                    </h4>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {selectedCert.issuer} • Issued: {selectedCert.date}
                      {selectedCert.duration && ` • Tenure: ${selectedCert.duration}`}
                    </p>
                  </div>
                </div>

                {/* Toolbar Controls (Zoom In, Zoom Out, Reset, Print, Close) */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center bg-white rounded-xl border border-gray-200 p-1 shadow-2xs">
                    <button
                      onClick={() => setZoomLevel(prev => Math.min(prev + 0.25, 2.5))}
                      className="p-1.5 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                      title="Zoom In"
                    >
                      <ZoomIn className="w-4 h-4" />
                    </button>
                    <span className="px-2 text-xs font-mono font-semibold text-gray-600">
                      {Math.round(zoomLevel * 100)}%
                    </span>
                    <button
                      onClick={() => setZoomLevel(prev => Math.max(prev - 0.25, 0.75))}
                      className="p-1.5 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
                      title="Zoom Out"
                    >
                      <ZoomOut className="w-4 h-4" />
                    </button>
                    {zoomLevel !== 1 && (
                      <button
                        onClick={() => setZoomLevel(1)}
                        className="p-1.5 rounded-lg text-gray-600 hover:bg-gray-100 hover:text-gray-900 border-l border-gray-200 ml-1 cursor-pointer"
                        title="Reset Zoom"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {selectedCert.image && (
                    <button
                      onClick={() => handlePrint(selectedCert.image!)}
                      className="p-2 rounded-xl bg-white border border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-100 shadow-2xs transition-colors cursor-pointer"
                      title="Print / Save Certificate"
                    >
                      <Printer className="w-4 h-4" />
                    </button>
                  )}

                  <button
                    onClick={() => setSelectedCert(null)}
                    className="p-2 rounded-xl bg-white border border-gray-200 text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer ml-1"
                    title="Close"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Certificate Image Canvas Area */}
              <div className="p-4 sm:p-8 bg-slate-900/10 flex items-center justify-center overflow-auto flex-1 max-h-[72vh]">
                <div 
                  className="transition-transform duration-200 origin-center flex items-center justify-center"
                  style={{ transform: `scale(${zoomLevel})` }}
                >
                  <img
                    src={selectedCert.image}
                    alt={selectedCert.title}
                    className="max-w-full max-h-[66vh] object-contain rounded-xl shadow-2xl border border-gray-300 bg-white"
                  />
                </div>
              </div>

              {/* Modal Footer: Full Verification Credentials */}
              <div className="px-6 py-4 border-t border-gray-200 bg-white flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex flex-wrap items-center gap-3">
                  {(selectedCert.certificateId || selectedCert.internId) && (
                    <div className="flex items-center gap-1.5 font-mono bg-gray-100 px-3 py-1.5 rounded-xl text-gray-800 border border-gray-200">
                      <span className="text-gray-400 font-sans">Certificate ID:</span>
                      <span className="font-bold">{selectedCert.certificateId || selectedCert.internId}</span>
                      <button
                        onClick={() => handleCopyId(selectedCert.certificateId || selectedCert.internId || '')}
                        className="ml-1 text-gray-500 hover:text-blue-600 cursor-pointer"
                        title="Copy Certificate ID"
                      >
                        {copiedId === (selectedCert.certificateId || selectedCert.internId) ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  )}

                  {selectedCert.verificationEmail && (
                    <span className="text-gray-600">
                      Issuer Verification: <strong className="text-gray-900 font-mono">{selectedCert.verificationEmail}</strong>
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {selectedCert.image && (
                    <a
                      href={selectedCert.image}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Open Full Resolution</span>
                    </a>
                  )}

                  {selectedCert.verificationEmail ? (
                    <a
                      href={`mailto:${selectedCert.verificationEmail}?subject=Certificate%20Verification%20${selectedCert.certificateId || selectedCert.title}`}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-white bg-slate-900 hover:bg-slate-800 transition-colors shadow-xs"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Contact Issuer</span>
                    </a>
                  ) : selectedCert.credentialUrl ? (
                    <a
                      href={selectedCert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-white bg-slate-900 hover:bg-slate-800 transition-colors shadow-xs"
                    >
                      <span>Issuer Verification</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
