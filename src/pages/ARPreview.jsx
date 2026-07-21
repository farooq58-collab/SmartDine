import React, { useState, useRef } from 'react';
import api from '../utils/api';
import toast from 'react-hot-toast';
import {
  HiOutlinePhotograph,
  HiOutlineUpload,
  HiOutlineCube,
  HiOutlineAdjustments,
  HiOutlineRefresh,
  HiOutlineEye,
} from 'react-icons/hi';

export default function ARPreview() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [processedUrl, setProcessedUrl] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [scale, setScale] = useState(1);
  const [hotspots, setHotspots] = useState([]);
  const [showHotspots, setShowHotspots] = useState(true);
  const fileInputRef = useRef(null);

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setProcessedUrl(null);
      setHotspots([]);
      setRotation(0);
      setScale(1);
    }
  };

  const processImage = async () => {
    if (!selectedImage) {
      toast.error('Please upload an image first');
      return;
    }
    setProcessing(true);

    try {
      const formData = new FormData();
      formData.append('image', selectedImage);

      const res = await api.post('/api/ar/process', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setProcessedUrl(res.data.processed_url || previewUrl);
      setHotspots(res.data.hotspots || []);
      toast.success('AR preview generated!');
    } catch {
      // Simulate processing with demo hotspots
      await new Promise((r) => setTimeout(r, 2000));
      setProcessedUrl(previewUrl);
      setHotspots([
        { id: 1, x: 30, y: 25, label: 'Main Protein', info: 'Pan-seared, medium-rare' },
        { id: 2, x: 65, y: 40, label: 'Garnish', info: 'Fresh micro-greens' },
        { id: 3, x: 50, y: 70, label: 'Side', info: 'Truffle mashed potato' },
      ]);
      toast.success('AR preview generated! (demo)');
    }
    setProcessing(false);
  };

  const resetPreview = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
    setProcessedUrl(null);
    setHotspots([]);
    setRotation(0);
    setScale(1);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">AR Menu Preview</h1>
        <p className="text-gray-400 text-sm mt-1">Upload food photos and preview them in augmented reality</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Upload & Controls */}
        <div className="space-y-6">
          {/* Upload Area */}
          <div className="backdrop-blur-md bg-white/[0.03] border border-white/10 rounded-2xl p-6">
            <h2 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
              <HiOutlineUpload className="w-4 h-4 text-emerald" />
              Upload Dish Photo
            </h2>

            <div
              onClick={() => fileInputRef.current?.click()}
              className={`h-52 border-2 border-dashed rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300 overflow-hidden ${
                previewUrl
                  ? 'border-emerald/30 bg-emerald/5'
                  : 'border-white/10 hover:border-emerald/20 bg-white/[0.02]'
              }`}
            >
              {previewUrl ? (
                <img src={previewUrl} alt="Upload preview" className="w-full h-full object-cover" />
              ) : (
                <>
                  <HiOutlinePhotograph className="w-12 h-12 text-gray-600 mb-3" />
                  <p className="text-sm font-bold text-gray-400">Drop image or click to upload</p>
                  <p className="text-xs text-gray-600 mt-1">PNG, JPG up to 10MB</p>
                </>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageSelect}
            />

            <div className="flex gap-3 mt-4">
              <button
                onClick={processImage}
                disabled={!selectedImage || processing}
                className="flex-grow inline-flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-navy bg-emerald hover:bg-emerald-dark transition-all duration-300 shadow-lg shadow-emerald/20 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {processing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-navy/30 border-t-navy rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <HiOutlineCube className="w-4 h-4" />
                    Generate AR Preview
                  </>
                )}
              </button>
              {previewUrl && (
                <button
                  onClick={resetPreview}
                  className="p-3 rounded-xl text-gray-400 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white transition-all"
                >
                  <HiOutlineRefresh className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          {/* Controls */}
          {processedUrl && (
            <div className="backdrop-blur-md bg-white/[0.03] border border-white/10 rounded-2xl p-6 space-y-5">
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <HiOutlineAdjustments className="w-4 h-4 text-emerald" />
                AR Controls
              </h2>

              {/* Rotation */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Rotation</label>
                  <span className="text-xs font-mono text-gray-500">{rotation}°</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={rotation}
                  onChange={(e) => setRotation(Number(e.target.value))}
                  className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-emerald [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-emerald/30"
                />
              </div>

              {/* Scale */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Scale</label>
                  <span className="text-xs font-mono text-gray-500">{scale.toFixed(1)}x</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="2"
                  step="0.1"
                  value={scale}
                  onChange={(e) => setScale(Number(e.target.value))}
                  className="w-full h-1.5 bg-white/10 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-emerald [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:shadow-emerald/30"
                />
              </div>

              {/* Hotspot Toggle */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <HiOutlineEye className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-300">Show Hotspots</span>
                </div>
                <button
                  onClick={() => setShowHotspots(!showHotspots)}
                  className={`w-12 h-7 rounded-full transition-all duration-200 relative ${
                    showHotspots ? 'bg-emerald' : 'bg-white/10'
                  }`}
                >
                  <span
                    className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200 ${
                      showHotspots ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {/* Hotspot List */}
              {hotspots.length > 0 && showHotspots && (
                <div className="space-y-2 pt-2 border-t border-white/5">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                    {hotspots.length} Hotspots Detected
                  </span>
                  {hotspots.map((h) => (
                    <div key={h.id} className="flex items-center gap-3 p-2.5 rounded-lg bg-white/[0.03] border border-white/5">
                      <div className="w-3 h-3 rounded-full bg-emerald shadow-[0_0_8px_#2ecc8a] flex-shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-white">{h.label}</p>
                        <p className="text-[10px] text-gray-500">{h.info}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right: Phone Mockup Preview */}
        <div className="flex items-center justify-center">
          <div className="relative">
            {/* Phone Frame */}
            <div className="w-[280px] sm:w-[320px] h-[580px] sm:h-[640px] bg-gray-900 rounded-[3rem] border-4 border-gray-700 shadow-2xl relative overflow-hidden">
              {/* Notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-gray-900 rounded-b-2xl z-20" />

              {/* Status Bar */}
              <div className="absolute top-2 left-0 right-0 flex items-center justify-between px-8 z-10">
                <span className="text-[10px] font-bold text-white font-mono">9:41</span>
                <div className="flex items-center gap-1">
                  <div className="w-4 h-2.5 border border-white rounded-sm relative">
                    <div className="absolute inset-0.5 bg-emerald rounded-[1px]" />
                  </div>
                </div>
              </div>

              {/* Screen Content */}
              <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden bg-navy-dark flex flex-col">
                {/* AR Header */}
                <div className="pt-10 px-5 pb-3 bg-navy-dark/90 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <HiOutlineCube className="w-4 h-4 text-emerald" />
                    <span className="text-xs font-bold text-white">AR Preview</span>
                  </div>
                </div>

                {/* AR Viewport */}
                <div className="flex-grow relative bg-gradient-to-b from-navy-dark to-gray-900 flex items-center justify-center overflow-hidden">
                  {processedUrl ? (
                    <div className="relative w-full h-full">
                      <img
                        src={processedUrl}
                        alt="AR Preview"
                        className="w-full h-full object-cover transition-transform duration-300"
                        style={{
                          transform: `rotate(${rotation}deg) scale(${scale})`,
                        }}
                      />

                      {/* Hotspot Overlays */}
                      {showHotspots && hotspots.map((h) => (
                        <div
                          key={h.id}
                          className="absolute group"
                          style={{ left: `${h.x}%`, top: `${h.y}%`, transform: 'translate(-50%, -50%)' }}
                        >
                          <div className="relative">
                            <span className="absolute -inset-2 rounded-full bg-emerald/30 animate-ping" />
                            <span className="relative w-4 h-4 rounded-full bg-emerald border-2 border-white shadow-lg inline-block" />
                          </div>
                          <div className="absolute left-6 top-1/2 -translate-y-1/2 bg-navy-dark/95 backdrop-blur border border-white/10 rounded-lg px-3 py-2 min-w-[120px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                            <p className="text-[10px] font-bold text-emerald">{h.label}</p>
                            <p className="text-[9px] text-gray-400">{h.info}</p>
                          </div>
                        </div>
                      ))}

                      {/* AR Grid overlay */}
                      <div className="absolute inset-0 pointer-events-none opacity-10">
                        <svg width="100%" height="100%">
                          <defs>
                            <pattern id="arGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#2ecc8a" strokeWidth="0.5" />
                            </pattern>
                          </defs>
                          <rect width="100%" height="100%" fill="url(#arGrid)" />
                        </svg>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center px-6">
                      <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4">
                        <HiOutlineCube className="w-8 h-8 text-gray-600" />
                      </div>
                      <p className="text-xs font-bold text-gray-500">AR Preview</p>
                      <p className="text-[10px] text-gray-600 mt-1">Upload a dish photo and click Generate</p>
                    </div>
                  )}
                </div>

                {/* Bottom Tab */}
                <div className="px-5 py-4 bg-navy-dark/90 border-t border-white/10">
                  <div className="flex items-center justify-center gap-1">
                    <div className="w-32 h-1 bg-gray-600 rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* Phone shadow */}
            <div className="absolute -inset-4 bg-emerald/5 rounded-[3.5rem] blur-2xl -z-10" />
          </div>
        </div>
      </div>
    </div>
  );
}
