export function ScanlineEffect() {
  return (
    <>
      <div 
        className="fixed inset-0 pointer-events-none z-50 opacity-10"
        style={{
          background: `
            repeating-linear-gradient(
              0deg,
              rgba(0, 0, 0, 0.15),
              rgba(0, 0, 0, 0.15) 1px,
              transparent 1px,
              transparent 2px
            )
          `
        }}
      />
      <div 
        className="fixed left-0 right-0 pointer-events-none z-50 animate-scanline opacity-5"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)',
          height: '200px',
          top: '-200px'
        }}
      />
    </>
  );
}
