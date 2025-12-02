
import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Image as ImageIcon, MapPin, Download, Trash2, Shield, Upload, Info, AlertTriangle, FileImage, ShieldCheck } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const ImageLab: React.FC = () => {
  const { t } = useApp();
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [cleanSrc, setCleanSrc] = useState<string | null>(null);
  const [metaData, setMetaData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processImage(e.target.files[0]);
    }
  };

  const processImage = (file: File) => {
    setLoading(true);
    setImageSrc(null);
    setCleanSrc(null);
    setMetaData(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        const result = e.target.result as string;
        setImageSrc(result);
        
        const img = new Image();
        img.src = result;
        img.onload = () => {
            // @ts-ignore - EXIF is loaded globally via script tag in index.html
            if (typeof window.EXIF !== 'undefined') {
                // @ts-ignore
                window.EXIF.getData(img, function() {
                    // @ts-ignore
                    const allTags = window.EXIF.getAllTags(this);
                    
                    const hasData = allTags && Object.keys(allTags).length > 0;
                    
                    if (hasData) {
                        const relevant = {
                            camera: allTags.Model || allTags.Make ? `${allTags.Make || ''} ${allTags.Model || ''}`.trim() : null,
                            software: allTags.Software || null,
                            date: allTags.DateTime || allTags.DateTimeOriginal || null,
                            // @ts-ignore
                            gps: window.EXIF.getTag(this, "GPSLatitude") ? true : false
                        };
                        setMetaData(relevant);
                    } else {
                        setMetaData(null);
                    }
                    setLoading(false);
                });
            } else {
                setLoading(false);
                // Fallback if script didn't load
                setMetaData(null); 
            }
        };
      }
    };
    reader.readAsDataURL(file);
  };

  const cleanImage = () => {
      if (!imageSrc) return;
      setLoading(true);
      
      const img = new Image();
      img.src = imageSrc;
      img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
              ctx.drawImage(img, 0, 0);
              // Exporting to Blob/DataURL strips EXIF metadata
              const cleanUrl = canvas.toDataURL('image/jpeg', 0.95);
              setCleanSrc(cleanUrl);
              setLoading(false);
          }
      };
  };

  const reset = () => {
      setImageSrc(null);
      setCleanSrc(null);
      setMetaData(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 md:py-20 animate-fade-in">
        <div className="text-center mb-12 space-y-6">
            <div className="inline-flex items-center justify-center p-4 bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 rounded-3xl mb-4 shadow-sm">
                <ImageIcon size={40} strokeWidth={1.5} />
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">{t.lab.title}</h1>
            <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed font-light">
                {t.lab.subtitle}
            </p>
        </div>

        {!imageSrc ? (
            <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-4 border-dashed border-slate-200 dark:border-slate-800 rounded-[3rem] p-16 text-center cursor-pointer hover:border-rose-500 dark:hover:border-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/10 transition-all flex flex-col items-center justify-center min-h-[400px] animate-fade-in-up"
            >
                <input type="file" ref={fileInputRef} onChange={handleFileSelect} accept="image/jpeg,image/png,image/heic" className="hidden" />
                <div className="w-20 h-20 bg-rose-100 dark:bg-rose-900/30 text-rose-500 rounded-full flex items-center justify-center mb-6">
                    <Upload size={40} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{t.lab.dropzone}</h3>
                <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">{t.lab.warning}</p>
            </div>
        ) : (
            <div className="space-y-8 animate-fade-in">
                {/* Analysis Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Original Image Card */}
                    <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-xl relative overflow-hidden">
                        <span className="absolute top-4 left-4 bg-slate-900/80 text-white px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md z-10">{t.lab.original}</span>
                        <img src={imageSrc} alt="Original" className="w-full h-64 object-cover rounded-xl mb-6" />
                        
                        {loading ? (
                            <div className="text-center py-8 text-slate-500">{t.lab.analyzing}</div>
                        ) : metaData ? (
                            <div className="space-y-4">
                                <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-800 p-4 rounded-xl flex items-center gap-3 text-red-700 dark:text-red-400">
                                    <AlertTriangle className="shrink-0" />
                                    <span className="font-bold">{t.lab.metaFound}</span>
                                </div>
                                
                                {metaData.gps && (
                                    <div className="flex items-center gap-3 text-rose-600 font-bold bg-rose-50 dark:bg-rose-900/20 p-3 rounded-lg">
                                        <MapPin size={18} /> {t.lab.gpsFound}
                                    </div>
                                )}
                                
                                <div className="grid grid-cols-1 gap-2 text-sm">
                                    {metaData.camera && (
                                        <div className="flex justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                                            <span className="text-slate-500">{t.lab.meta.camera}</span>
                                            <span className="font-semibold text-slate-900 dark:text-white truncate max-w-[150px]">{metaData.camera}</span>
                                        </div>
                                    )}
                                    {metaData.software && (
                                        <div className="flex justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                                            <span className="text-slate-500">{t.lab.meta.software}</span>
                                            <span className="font-semibold text-slate-900 dark:text-white truncate max-w-[150px]">{metaData.software}</span>
                                        </div>
                                    )}
                                    {metaData.date && (
                                        <div className="flex justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                                            <span className="text-slate-500">{t.lab.meta.date}</span>
                                            <span className="font-semibold text-slate-900 dark:text-white truncate max-w-[150px]">{metaData.date}</span>
                                        </div>
                                    )}
                                </div>

                                {!cleanSrc && (
                                    <Button onClick={cleanImage} fullWidth variant="primary" className="bg-rose-600 hover:bg-rose-700 mt-4">
                                        <Shield className="mr-2" size={18} /> {t.lab.cleanBtn}
                                    </Button>
                                )}
                            </div>
                        ) : (
                            <div className="text-center py-8">
                                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <ShieldCheck size={32} />
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{t.lab.noMeta}</h3>
                                <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">{t.lab.cleanDesc}</p>
                            </div>
                        )}
                    </div>

                    {/* Cleaned Image Card */}
                    {cleanSrc && (
                        <div className="bg-white dark:bg-slate-900 p-6 rounded-[2rem] border border-slate-100 dark:border-slate-800 shadow-xl relative overflow-hidden animate-scale-in">
                            <span className="absolute top-4 left-4 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg z-10">{t.lab.cleanGenerated}</span>
                            <img src={cleanSrc} alt="Clean" className="w-full h-64 object-cover rounded-xl mb-6" />
                            
                            <div className="bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800 p-6 rounded-2xl mb-6">
                                <p className="text-green-800 dark:text-green-300 font-medium leading-relaxed flex gap-3">
                                    <ShieldCheck className="shrink-0 mt-1" />
                                    {t.lab.cleanDesc}
                                </p>
                            </div>

                            <a href={cleanSrc} download="libreshield-safe-image.jpg" className="block">
                                <Button fullWidth variant="primary" className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-black dark:hover:bg-slate-200">
                                    <Download className="mr-2" size={18} /> {t.lab.downloadBtn}
                                </Button>
                            </a>
                        </div>
                    )}
                </div>

                <div className="flex justify-center pt-8">
                     <Button variant="ghost" onClick={reset} className="text-slate-500 hover:text-slate-900 dark:hover:text-white">
                         <Trash2 size={18} className="mr-2" /> {t.lab.analyzeAnother}
                     </Button>
                </div>
            </div>
        )}
    </div>
  );
};
