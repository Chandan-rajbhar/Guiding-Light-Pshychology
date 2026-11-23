import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

export default function BackButton({ label = 'Back', to, className = '' }) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (to) navigate(to);
    else navigate(-1);
  };

  return (
    <button
      onClick={handleBack}
      className={`inline-flex items-center space-x-1 text-xs font-medium text-brand-primary hover:text-brand-primaryDark transition-colors px-1.5 py-0.5 -ml-1 rounded-md hover:bg-brand-primaryLight/40 ${className}`}
    >
      <ChevronLeft className="w-3.5 h-3.5" />
      <span>{label}</span>
    </button>
  );
}
