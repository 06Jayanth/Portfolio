import React, { useState, useRef } from 'react';
import { UploadCloud, Image as ImageIcon, X, Link as LinkIcon, Check, AlertCircle } from 'lucide-react';

interface ImageDropZoneProps {
  value?: string;
  onChange: (value: string) => void;
  label?: string;
  helperText?: string;
  aspectRatio?: 'landscape' | 'portrait' | 'square' | 'auto';
  placeholder?: string;
}

export const ImageDropZone: React.FC<ImageDropZoneProps> = ({
  value,
  onChange,
  label = 'Upload Image',
  helperText = 'Drag & drop your image or document, or click to browse (PNG, JPG, SVG, WebP)',
  aspectRatio = 'auto',
  placeholder = 'Or paste image URL / SVG path...'
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [urlInput, setUrlInput] = useState(value || '');
  const [showUrlMode, setShowUrlMode] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileProcess = (file: File) => {
    setError(null);
    if (!file.type.startsWith('image/') && !file.name.endsWith('.svg')) {
      setError('Please upload an image file (PNG, JPG, SVG, or WebP).');
      return;
    }

    // Read file as Data URL
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      onChange(result);
      setUrlInput(result.slice(0, 50) + '... (Uploaded image)');
    };
    reader.onerror = () => {
      setError('Failed to read image file. Please try another file or use an image URL.');
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileProcess(e.target.files[0]);
    }
  };

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      onChange(urlInput.trim());
      setError(null);
    }
  };

  const handleClear = () => {
    onChange('');
    setUrlInput('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between">
        <label className="block text-xs font-semibold text-gray-700">
          {label}
        </label>
        <button
          type="button"
          onClick={() => setShowUrlMode(!showUrlMode)}
          className="text-[11px] font-medium text-indigo-600 hover:text-indigo-700 inline-flex items-center gap-1 cursor-pointer"
        >
          <LinkIcon className="w-3 h-3" />
          <span>{showUrlMode ? 'Hide URL Input' : 'Paste Image URL / Path'}</span>
        </button>
      </div>

      {showUrlMode && (
        <div className="flex items-center gap-2 mb-2">
          <input
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            placeholder={placeholder}
            className="flex-1 px-3 py-1.5 rounded-xl border border-gray-200 text-xs focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          <button
            type="button"
            onClick={handleUrlSubmit}
            className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
          >
            Apply URL
          </button>
        </div>
      )}

      {/* Drop Zone Area */}
      {value ? (
        <div className="relative group rounded-2xl border-2 border-indigo-200 bg-indigo-50/20 p-3 overflow-hidden">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className={`relative max-h-48 max-w-[220px] rounded-xl overflow-hidden border border-gray-200 bg-white shadow-xs flex items-center justify-center ${
              aspectRatio === 'landscape' ? 'aspect-video' : aspectRatio === 'portrait' ? 'aspect-[3/4]' : aspectRatio === 'square' ? 'aspect-square' : ''
            }`}>
              <img
                src={value}
                alt="Uploaded preview"
                className="max-h-44 w-full object-contain"
              />
            </div>

            <div className="flex-1 text-left space-y-2">
              <div className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>Image loaded successfully</span>
              </div>
              <p className="text-[11px] text-gray-500 line-clamp-2 font-mono break-all">
                {value.startsWith('data:') ? 'Local file encoded (ready to save)' : value}
              </p>

              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-3 py-1.5 bg-white hover:bg-gray-50 border border-gray-200 rounded-lg text-xs font-semibold text-gray-700 transition-colors cursor-pointer shadow-2xs"
                >
                  Change Image
                </button>
                <button
                  type="button"
                  onClick={handleClear}
                  className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg text-xs font-semibold transition-colors cursor-pointer inline-flex items-center gap-1"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Remove</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center transition-all duration-200 cursor-pointer ${
            isDragging
              ? 'border-indigo-500 bg-indigo-50/60 scale-[1.01]'
              : 'border-gray-200 hover:border-indigo-300 hover:bg-gray-50/80 bg-gray-50/30'
          }`}
        >
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className={`p-3 rounded-full transition-colors ${
              isDragging ? 'bg-indigo-600 text-white' : 'bg-indigo-50 text-indigo-600'
            }`}>
              <UploadCloud className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <p className="text-xs font-bold text-gray-900">
                <span className="text-indigo-600 hover:underline">Click to browse file</span> or drop image here
              </p>
              <p className="text-[11px] text-gray-500 leading-relaxed max-w-sm mx-auto">
                {helperText}
              </p>
            </div>
          </div>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg,image/webp,image/svg+xml"
        onChange={handleFileChange}
        className="hidden"
      />

      {error && (
        <div className="flex items-center gap-1.5 text-xs text-red-600 bg-red-50 p-2 rounded-lg">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
