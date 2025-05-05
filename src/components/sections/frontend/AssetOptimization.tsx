
import React from 'react';
import CodeBlock from "../../CodeBlock";

const AssetOptimization = () => {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-semibold mb-4 text-orange-600">Asset Optimization</h3>
      
      <p className="mb-4 text-gray-700">
        Modern web applications often suffer from large asset sizes that slow down initial loading times.
        Implementing proper image and font optimization can dramatically improve user experience.
      </p>
      
      <div className="mb-6">
        <h4 className="font-semibold mb-2">Responsive Image Implementation</h4>
        <CodeBlock
          language="jsx"
          title="Responsive Images with srcset"
          code={`// Before optimization
function ProductGallery() {
  return (
    <div className="product-gallery">
      <img 
        src="/images/product-large.jpg" 
        alt="Product" 
        className="product-image"
      />
    </div>
  );
}

// After optimization
function ProductGallery() {
  return (
    <div className="product-gallery">
      <img 
        src="/images/product-800.jpg" 
        alt="Product" 
        srcSet="
          /images/product-400.jpg 400w,
          /images/product-800.jpg 800w,
          /images/product-1200.jpg 1200w,
          /images/product-2000.jpg 2000w
        "
        sizes="
          (max-width: 600px) 100vw,
          (max-width: 1200px) 50vw,
          33vw
        "
        loading="lazy"
        className="product-image"
      />
    </div>
  );
}`}
        />
      </div>
      
      <div className="mb-6">
        <h4 className="font-semibold mb-2">Image Format Selection</h4>
        <div className="bg-white border rounded-lg overflow-hidden mb-6">
          <div className="p-4 bg-gray-50 border-b">
            <h5 className="font-medium">Optimal Image Format Selection Guide</h5>
          </div>
          <div className="p-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left">Image Type</th>
                  <th className="px-4 py-2 text-left">Best Format</th>
                  <th className="px-4 py-2 text-left">Fallback</th>
                  <th className="px-4 py-2 text-left">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="px-4 py-3">Photographs</td>
                  <td className="px-4 py-3">AVIF/WebP</td>
                  <td className="px-4 py-3">JPEG</td>
                  <td className="px-4 py-3">80-85% quality typically sufficient</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Icons & Logos</td>
                  <td className="px-4 py-3">SVG</td>
                  <td className="px-4 py-3">WebP</td>
                  <td className="px-4 py-3">Use SVG whenever possible for scalability</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Screenshots</td>
                  <td className="px-4 py-3">WebP</td>
                  <td className="px-4 py-3">PNG</td>
                  <td className="px-4 py-3">High compression ratio with lossless quality</td>
                </tr>
                <tr>
                  <td className="px-4 py-3">Animations</td>
                  <td className="px-4 py-3">WebP</td>
                  <td className="px-4 py-3">GIF</td>
                  <td className="px-4 py-3">Consider replacing with video for longer content</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <h4 className="font-semibold mb-2">Font Optimization</h4>
        <CodeBlock
          language="html"
          title="Optimized Font Loading"
          code={`<!-- Before optimization -->
<link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,700" rel="stylesheet">

<!-- After optimization -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;700&display=swap" rel="stylesheet">

<!-- Font optimization in CSS -->
<style>
  /* Font-display ensures text remains visible during font loading */
  @font-face {
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 400;
    font-display: swap; /* Prevents FOIT (Flash of Invisible Text) */
    src: local('Open Sans Regular'), 
         url('/fonts/open-sans-v28-latin-regular.woff2') format('woff2'),
         url('/fonts/open-sans-v28-latin-regular.woff') format('woff');
  }
  
  /* Limit character subsets when possible */
  @font-face {
    font-family: 'Open Sans';
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: local('Open Sans Bold'),
         url('/fonts/open-sans-v28-latin-700.woff2') format('woff2'),
         url('/fonts/open-sans-v28-latin-700.woff') format('woff');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6;
  }
</style>`}
        />
      </div>
    </div>
  );
};

export default AssetOptimization;
