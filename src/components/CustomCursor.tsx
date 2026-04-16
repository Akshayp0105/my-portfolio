import { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [trailPositions, setTrailPositions] = useState<Array<{ x: number; y: number }>>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setTrailPositions(prev => {
        const newPositions = [{ x: e.clientX, y: e.clientY }, ...prev.slice(0, 4)];
        return newPositions;
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      <div
        className="cursor"
        style={{
          left: mousePosition.x - 4,
          top: mousePosition.y - 4,
        }}
      />
      {trailPositions.map((pos, index) => (
        <div
          key={index}
          className="cursor-trail"
          style={{
            left: pos.x - 2,
            top: pos.y - 2,
            opacity: (4 - index) * 0.1,
            transform: `scale(${1 - index * 0.1})`,
          }}
        />
      ))}
    </>
  );
};

export default CustomCursor;