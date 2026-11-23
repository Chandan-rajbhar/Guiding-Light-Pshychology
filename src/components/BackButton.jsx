import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';

export default function BackButton({ label = 'Back', to }) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (to) navigate(to);
    else navigate(-1);
  };

  return (
    <button
      onClick={handleBack}
      className="inline-flex items-center space-x-1 text-xs font-medium text-brand-primary hover:text-brand-primaryDark transition-colors mb-3 px-2 py-1 -ml-2 rounded-lg hover:bg-brand-primaryLight/40"
    >
      <ChevronLeft className="w-4 h-4" />
      <span>{label}</span>
    </button>
  );
}
