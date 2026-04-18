import { useEffect, useRef } from 'react';

const CustomCursor = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const ring = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const rafRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
    };

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    const animate = () => {
      ring.current.x = lerp(ring.current.x, mouse.current.x, 0.1);
      ring.current.y = lerp(ring.current.y, mouse.current.y, 0.1);
      if (ringRef.current) {
        ringRef.current.style.left = `${ring.current.x}px`;
        ringRef.current.style.top = `${ring.current.y}px`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    const onEnter = (e: MouseEvent) => {
      const t = e.target as Element;
      if (t.closest('button, a, .card, [data-cursor]')) {
        dotRef.current?.classList.add('hovering');
        ringRef.current?.classList.add('hovering');
      }
    };
    const onLeave = () => {
      dotRef.current?.classList.remove('hovering');
      ringRef.current?.classList.remove('hovering');
    };

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onEnter);
    document.addEventListener('mouseout', onLeave);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onEnter);
      document.removeEventListener('mouseout', onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <div id="cursor-dot" ref={dotRef} />
      <div id="cursor-ring" ref={ringRef} />
    </>
  );
};

export default CustomCursor;