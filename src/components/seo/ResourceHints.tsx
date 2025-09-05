export function ResourceHints() {
  return (
    <>
      {/* Preconnect to establish early connections */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://api.mapbox.com" />
      
      {/* DNS Prefetch for additional domains */}
      <link rel="dns-prefetch" href="https://tiles.mapbox.com" />
      
      {/* Prefetch critical resources */}
      <link rel="prefetch" href="/api/contact" as="fetch" crossOrigin="anonymous" />
      
      {/* Preload critical fonts */}
      <link
        rel="preload"
        href="/fonts/inter-var.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      
      {/* Preload critical CSS */}
      <link
        rel="preload"
        href="/_next/static/css/app.css"
        as="style"
      />
      
      {/* Modulepreload for critical JS */}
      <link
        rel="modulepreload"
        href="/_next/static/chunks/main.js"
        as="script"
      />
    </>
  );
}