import { animate } from 'motion';
import React, { useEffect, useRef } from 'react';

function HorizontalScrollSection() {
  const sectionRef = useRef(null);
  const innerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !innerRef.current) {
        return;
      }

      // Get the section's position relative to the viewport
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Determine scroll progress within the section:
      // When the section's top is at 0 and moves up to -windowHeight, progress goes from 0 to 1.
      const progress = Math.min(Math.max(-rect.top / windowHeight, 0), 1);

      // Total horizontal distance to scroll:
      // (inner container width minus the viewport width)
      const totalScrollWidth = innerRef.current.scrollWidth - window.innerWidth;

      // Calculate horizontal translation:
      const translateX = -progress * totalScrollWidth;

      // Update the transform immediately (duration 0 ensures instant update on scroll)
      animate(innerRef.current, { x: translateX }, { duration: 0 });
    };

    window.addEventListener('scroll', handleScroll);
    // Call once initially to set the state
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    // The section height is set to 300vh to provide enough vertical scroll space
    <section ref={sectionRef} className="relative bg-gray-200" style={{ height: '300vh' }}>
      {/* The sticky container pins the inner content to the viewport */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Inner container with horizontal items; its width is set to 300vw (3 items × 100vw each) */}
        <div ref={innerRef} className="flex h-full" style={{ width: '300vw' }}>
          <div className="flex h-full w-screen items-center justify-center bg-red-500 text-3xl font-bold text-white">
            Item 1
          </div>
          <div className="flex h-full w-screen items-center justify-center bg-blue-500 text-3xl font-bold text-white">
            Item 2
          </div>
          <div className="flex h-full w-screen items-center justify-center bg-green-500 text-3xl font-bold text-white">
            Item 3
          </div>
        </div>
      </div>
    </section>
  );
}

function App() {
  return (
    <div>
      {/* Vertical content above the horizontal section */}
      <div className="flex h-screen items-center justify-center bg-white">
        <h1 className="text-4xl font-bold">Vertical Content Above</h1>
      </div>

      {/* Horizontal scroll section */}
      <HorizontalScrollSection />

      {/* Vertical content below the horizontal section */}
      <div className="flex h-screen items-center justify-center bg-white">
        <h1 className="text-4xl font-bold">Vertical Content Below</h1>
      </div>
    </div>
  );
}

export default App;
