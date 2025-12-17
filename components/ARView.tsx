import React from 'react';
import { Product } from '../types';
import { X, ExternalLink } from 'lucide-react';
import { AR_LINK } from '../constants';

interface ARViewProps {
  product: Product;
  onClose: () => void;
}

const ARView: React.FC<ARViewProps> = ({ product, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-4 flex justify-between items-center bg-gradient-to-b from-black/70 to-transparent z-10 pointer-events-none">
        <div className="text-white pointer-events-auto">
          <h3 className="font-serif text-lg">{product.name}</h3>
          <p className="text-xs text-gold-300">Đang hiển thị chế độ xem AR (Bản Demo)</p>
        </div>
        <button onClick={onClose} className="pointer-events-auto p-2 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition">
          <X size={24} />
        </button>
      </div>

      {/* AR Iframe */}
      <div className="w-full h-full bg-stone-900">
        <iframe 
          src={AR_LINK}
          title="AR Try On"
          className="w-full h-full border-0"
          allow="camera; microphone; accelerometer; gyroscope; web-share"
        />
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent flex justify-center gap-4 pointer-events-none">
        <div className="pointer-events-auto flex gap-4">
           <a 
             href={AR_LINK} 
             target="_blank" 
             rel="noreferrer"
             className="px-4 py-3 bg-white/20 backdrop-blur-md text-white font-bold rounded-full hover:bg-white/30 transition flex items-center gap-2"
           >
             <ExternalLink size={18} />
             Mở tab mới
           </a>
           <button 
              className="px-6 py-3 bg-gold-600 text-white font-bold rounded-full shadow-lg hover:bg-gold-500 transition-transform active:scale-95 flex items-center gap-2"
              onClick={() => alert("Đây là nút mô phỏng hành động 'Mua Ngay' của khách hàng cuối.")}
           >
             Nút Mua Hàng (Mô phỏng)
           </button>
        </div>
      </div>
    </div>
  );
};

export default ARView;