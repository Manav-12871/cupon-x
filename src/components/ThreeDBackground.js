import React, { useEffect, useRef } from 'react';

const ThreeDBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    let scene, camera, renderer, particles;
    let frameId;
    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (event) => {
      mouseX = (event.clientX - window.innerWidth / 2) / 250;
      mouseY = (event.clientY - window.innerHeight / 2) / 250;
    };
    window.addEventListener('mousemove', onMouseMove);

    const initThree = () => {
      scene = new window.THREE.Scene();
      camera = new window.THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
      camera.position.z = 5;

      renderer = new window.THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      mountRef.current.appendChild(renderer.domElement);

      const particleGeometry = new window.THREE.BufferGeometry();
      const particleCount = 7000;
      const positions = new Float32Array(particleCount * 3);
      const colors = new Float32Array(particleCount * 3);
      const color = new window.THREE.Color();

      for (let i = 0; i < particleCount; i++) {
        const x = (Math.random() - 0.5) * 15;
        const y = (Math.random() - 0.5) * 15;
        const z = (Math.random() - 0.5) * 15;
        positions.set([x, y, z], i * 3);
        
        const colorPalette = ['#C0C0C0', '#A9A9A9', '#ffffff', '#00ffff']; 
        color.set(colorPalette[Math.floor(Math.random() * colorPalette.length)]);
        colors.set([color.r, color.g, color.b], i * 3);
      }

      particleGeometry.setAttribute('position', new window.THREE.BufferAttribute(positions, 3));
      particleGeometry.setAttribute('color', new window.THREE.BufferAttribute(colors, 3));

      const particleMaterial = new window.THREE.PointsMaterial({
        size: 0.035, 
        vertexColors: true,
        transparent: true,
        blending: window.THREE.AdditiveBlending,
        depthWrite: false,
      });

      particles = new window.THREE.Points(particleGeometry, particleMaterial);
      scene.add(particles);

      const clock = new window.THREE.Clock();
      const animate = () => {
        const elapsedTime = clock.getElapsedTime();
        
        particles.rotation.y = elapsedTime * 0.05;
        particles.position.y = Math.sin(elapsedTime * 0.2) * 0.1;

        camera.position.x += (mouseX - camera.position.x) * 0.02;
        camera.position.y += (-mouseY - camera.position.y) * 0.02;
        camera.lookAt(scene.position);
        renderer.render(scene, camera);
        frameId = window.requestAnimationFrame(animate);
      };
      animate();
    };

    const handleResize = () => {
      if (renderer && camera) {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
      }
    };
    window.addEventListener('resize', handleResize);

    if (window.THREE) {
      initThree();
    } else {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
      script.onload = initThree;
      document.head.appendChild(script);
    }

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      if (mountRef.current && renderer) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }} />;
};

export default ThreeDBackground;
