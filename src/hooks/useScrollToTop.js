import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll window for mobile
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    // Scroll inner phone frame container on desktop
    const phoneContainer = document.getElementById('phone-scroll-container');
    if (phoneContainer) {
      phoneContainer.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [pathname]);
}
