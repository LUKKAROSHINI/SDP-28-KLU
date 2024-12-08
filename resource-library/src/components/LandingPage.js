import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import anime from 'animejs'; // Import animejs

const LandingPage = () => {
  const navigate = useNavigate();

  const handleUserClick = () => {
    navigate('/user-register');
  };

  const handleAdminClick = () => {
    navigate('/admin-register');
  };

  useEffect(() => {
    // Function to create particles
    const createParticles = (letterElement, particleCount) => {
      let particles = [];
      const letterRect = letterElement.getBoundingClientRect();
      const letterX = letterRect.left + letterRect.width / 2;
      const letterY = letterRect.top + letterRect.height / 2;

      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        document.body.appendChild(particle);

        const startX = Math.random() * window.innerWidth;
        const startY = Math.random() * window.innerHeight;

        const size = Math.random() * 4 + 2; // Random size for particles
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.top = `${startY}px`;
        particle.style.left = `${startX}px`;

        particles.push({
          element: particle,
          x: letterX,
          y: letterY,
          opacity: Math.random() * 0.5 + 0.5,
        });
      }

      return particles;
    };

    // Animation to assemble the text using particles
    const animateText = () => {
      const letters = document.querySelectorAll('.letter');

      letters.forEach((letter, index) => {
        const particles = createParticles(letter, 150); // Number of particles for each letter

        // Animate particles moving towards the letter position
        particles.forEach((particle, i) => {
          anime({
            targets: particle.element,
            translateX: [
              Math.random() * 200 - 100,
              particle.x - particle.element.getBoundingClientRect().left,
            ],
            translateY: [
              Math.random() * 200 - 100,
              particle.y - particle.element.getBoundingClientRect().top,
            ],
            opacity: [particle.opacity, 1],
            duration: anime.random(1200, 1800),
            easing: 'easeOutExpo',
            delay: anime.random(i * 30, (i + 1) * 30),
            complete: () => {
              // Remove particle after it reaches its destination
              particle.element.remove();
            },
          });
        });

        // Animate the letter appearing after particles assemble
        anime({
          targets: letter,
          opacity: [0, 1],
          translateY: [-50, 0],
          duration: 1200,
          easing: 'easeOutExpo',
          delay: 1200 + index * 300,
        });
      });
    };

    // Start the animation once the component has mounted
    animateText();
    
    // Cleanup function to remove any remaining particles on unmount
    return () => {
      document.querySelectorAll('.particle').forEach((particle) => {
        particle.remove();
      });
    };
  }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1 style={{ color: 'transparent' }}>WELCOME</h1>
      <div id="welcome-container">
        <span className="letter">W</span>
        <span className="letter">E</span>
        <span className="letter">L</span>
        <span className="letter">C</span>
        <span className="letter">O</span>
        <span className="letter">M</span>
        <span className="letter">E</span>
      </div>
      <p>Please choose your role to proceed:</p>
      <div>
        <button onClick={handleUserClick}>User</button>
        <button onClick={handleAdminClick} style={{ marginLeft: '10px' }}>
          Admin
        </button>
      </div>

      {/* Particle CSS Styles */}
      <style>{`
  body {
    background-color: #f9f9f9; /* Light background color */
    overflow: hidden;
    color: #333; /* Darker text color for contrast */
    font-family: Arial, sans-serif;
  }

  #welcome-container {
    display: flex;
    font-size: 5rem;
    font-weight: bold;
    position: relative;
    text-align: center;
  }

  .particle {
    position: absolute;
    width: 6px;
    height: 6px;
    background-color: #555; /* Darker particle color for better visibility */
    border-radius: 50%;
    opacity: 0; /* Initially hidden */
    pointer-events: none;
  }

  button {
    background-color: #4a90e2; /* Primary button color */
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 16px;
  }

  button:hover {
    background-color: #357ab8; /* Darker hover color */
  }
`}</style>

    </div>
  );
};

export default LandingPage;