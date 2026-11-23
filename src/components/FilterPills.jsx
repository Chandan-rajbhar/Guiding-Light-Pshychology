import React, { useRef, useState, useEffect } from 'react';

export default function FilterPills({ categories, selected, onSelect }) {
  const containerRef = useRef(null);
  const dragStartX = useRef(0);
  const dragStartScrollLeft = useRef(0);
  
  const [isDragging, setIsDragging] = useState(false);
  const [hasDragged, setHasDragged] = useState(false);

  // Non-passive mouse wheel horizontal scrolling
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleWheelEvent = (e) => {
      if (el.scrollWidth > el.clientWidth) {
        if (Math.abs(e.deltaY) > 0 || Math.abs(e.deltaX) > 0) {
          e.preventDefault();
          const delta = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
          el.scrollLeft += delta * 0.95;
        }
      }
    };

    el.addEventListener('wheel', handleWheelEvent, { passive: false });
    return () => {
      el.removeEventListener('wheel', handleWheelEvent);
    };
  }, []);

  // Global mouse drag-to-scroll with cursor
  const handleMouseDown = (e) => {
    if (e.button !== 0 || !containerRef.current) return;
    setIsDragging(true);
    setHasDragged(false);
    dragStartX.current = e.pageX;
    dragStartScrollLeft.current = containerRef.current.scrollLeft;
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const walk = (e.pageX - dragStartX.current) * 1.3;
      if (Math.abs(walk) > 4) {
        setHasDragged(true);
      }
      containerRef.current.scrollLeft = dragStartScrollLeft.current - walk;
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setTimeout(() => setHasDragged(false), 50);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  // Ensure selected pill is visible in viewport
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const selectedBtn = container.querySelector('[data-selected="true"]');
    if (selectedBtn) {
      const containerRect = container.getBoundingClientRect();
      const btnRect = selectedBtn.getBoundingClientRect();
      if (btnRect.left < containerRect.left) {
        container.scrollBy({ left: btnRect.left - containerRect.left - 16, behavior: 'smooth' });
      } else if (btnRect.right > containerRect.right) {
        container.scrollBy({ left: btnRect.right - containerRect.right + 16, behavior: 'smooth' });
      }
    }
  }, [selected]);

  return (
    <div className="w-full select-none">
      {/* Scrollable Pills Container with Cursor Drag & Wheel Support (No Arrows) */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        className={`flex items-center space-x-2 overflow-x-auto py-1 px-1 no-scrollbar transition-colors ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        style={{
          scrollBehavior: isDragging ? 'auto' : 'smooth',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {categories.map((cat) => {
          const isSelected = selected === cat;
          return (
            <button
              key={cat}
              type="button"
              data-selected={isSelected}
              onClick={() => {
                if (!hasDragged) {
                  onSelect(cat);
                }
              }}
              className={`px-3.5 py-1.5 rounded-full whitespace-nowrap text-xs font-medium shrink-0 transition-all select-none ${
                isSelected
                  ? 'bg-brand-primary text-white font-semibold shadow-xs'
                  : 'bg-white text-neutral-700 hover:bg-neutral-50 border border-neutral-200/80 hover:border-brand-primary/40 cursor-pointer'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
}
