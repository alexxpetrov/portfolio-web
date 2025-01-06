import { useEffect } from 'react';

export const useSectionTracking = () => {
  useEffect(() => {
    const menuItems = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('section');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Remove active class from all menu items

            menuItems.forEach(item => item.classList.remove('active'));
            // Add active class to the menu item linked to the visible section
            const activeMenu = document.querySelector(
              `a[href="#${entry.target.id}"]`,
            );

            activeMenu!.classList.add('active');
          }
        });
      },
      {
        root: null, // Viewport
        threshold: 0.5, // Trigger when 50% of the section is visible
      },
    );

    // Observe each section
    sections.forEach(section => observer.observe(section));

    // Cleanup on unmount
    return () => {
      observer.disconnect();
    };
  }, []);
};
