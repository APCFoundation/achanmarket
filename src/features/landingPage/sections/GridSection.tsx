const GridSection = () => {
  // Reference has large, chunky grid blocks, not fine mesh
  const rows = 9;
  const cols = 15; // Reduced from 24 to make cells much bigger

  const getOpacity = (row: number, col: number) => {
    const centerCol = cols / 2 - 0.5;

    // Calculate distance from the "center top"
    const distX = Math.abs(col - centerCol);

    // The visual is a steep inverted pyramid
    // We define a "max width" that shrinks as we go down
    // At row 0 (top), it's wide. At row 8 (bottom), it's narrow.

    const slope = 0.65; // Controls how fast the V tapers
    const maxWidthAtRow = centerCol + 1 - row * slope;

    let opacity = 0;

    if (distX < maxWidthAtRow) {
      // Opacity Logic:
      // Top center is the densest/darkest (Deep Violet)
      // Edges fade out

      // 1. Vertical fade: Top is strong, bottom is lighter
      const verticalStrength = 1 - (row / rows) * 0.7;

      // 2. Horizontal fade: Center is strong, edges fade
      const horizontalStrength = 1 - distX / centerCol;

      // Combine
      opacity = 0.15 + verticalStrength * horizontalStrength * 0.45;

      // Boost the top center significantly to get that "dark" feel
      if (row < 3 && distX < 2) {
        opacity += 0.2;
      }
    }

    return opacity;
  };

  return (
    <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden pointer-events-none select-none">
      {/* Soft Gradient Overlay to blend the grid into white at the bottom */}
      {/* <div className="absolute inset-0 z-10 bg-gradient-to-b from-transparent via-transparent to-[#FAFAFA] to-90%" /> */}

      {/* Side Gradients to soften edges */}
      {/* <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#FAFAFA] via-transparent to-[#FAFAFA] opacity-60" /> */}

      <div
        className="w-full h-full grid gap-[1px]" // Added gap for crisp grid lines
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
        }}
      >
        {Array.from({ length: rows * cols }).map((_, i) => {
          const row = Math.floor(i / cols);
          const col = i % cols;
          const opacity = getOpacity(row, col);

          if (opacity <= 0.02)
            return <div key={i} className="bg-transparent" />;

          return (
            <div
              key={i}
              className="backdrop-blur-[2px]"
              style={{
                // Using a specific rich violet from the design
                backgroundColor: `rgba(124, 58, 237, ${opacity})`, // Violet-600 base
                borderColor: `rgba(255,255,255, ${opacity * 0.3})`,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default GridSection;
