import React, { createContext, useEffect } from 'react';

export const Context = createContext();

export const context = ({ children }) => {
  useEffect(() => {
    window.onload = () => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('animation-div-up');
              entry.target.classList.remove('is-hidden');
            } else {
              entry.target.classList.remove('animation-div-up');
              entry.target.classList.add('is-hidden');
            }
          });
        },
        { threshold: 0.1 }
      );
  
      const sections = document.querySelectorAll('.animated-section-left');
      sections.forEach((section) => {
        observer.observe(section);
      });
    };
  }, []);

  return <Context.Provider value={{}}>{children}</Context.Provider>;
};

export default context;
