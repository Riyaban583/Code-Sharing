import React from 'react';
import { useUiStore } from '../store/useUiStore';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const ToastContainer = () => {
  const { toasts, removeToast } = useUiStore();

  const getIcon = (type) => {
    switch(type) {
      case 'success': return <CheckCircle2 size={18} className="text-green-400" />;
      case 'error': return <AlertCircle size={18} className="text-red-400" />;
      default: return <Info size={18} className="text-primary" />;
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-[110] flex flex-col gap-2">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
            className={`flex items-center gap-3 px-4 py-3 min-w-[300px] glass-panel border shadow-lg ${
              toast.type === 'error' ? 'bg-red-50/90 border-red-200' : 
              toast.type === 'success' ? 'bg-green-50/90 border-green-200' : 
              'bg-white/90 border-purple-200'
            }`}
          >
            {getIcon(toast.type)}
            <p className="text-sm font-medium text-foreground flex-1">{toast.message}</p>
            <button 
              onClick={() => removeToast(toast.id)}
              className="text-mutedForeground hover:text-primary transition-colors"
            >
              <X size={16} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ToastContainer;
