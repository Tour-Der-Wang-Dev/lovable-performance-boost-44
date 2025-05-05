
import CodeBlock from "../CodeBlock";
import PerformanceMetric from "../PerformanceMetric";

const InfrastructureScaling = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">5. Infrastructure & Scaling</h2>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-orange-600">Load Balancing Configuration</h3>
        <p className="mb-4 text-gray-700">
          Proper load balancing is essential for distributing traffic across multiple instances of your application, increasing both availability and performance.
        </p>
        
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <PerformanceMetric
            title="Server Response Time"
            beforeValue={450}
            afterValue={120}
            unit="ms"
            target={200}
            improvedIsBetter={true}
          />
          <PerformanceMetric
            title="Requests Handled/Min"
            beforeValue={12000}
            afterValue={48000}
            unit=""
            improvedIsBetter={false}
          />
        </div>
        
        <CodeBlock
          language="nginx"
          title="nginx.conf - Load Balancer Configuration"
          code={`# Main configuration for high performance
worker_processes auto;                   # Use all available cores
worker_rlimit_nofile 65535;             # Set system file descriptor limits

events {
    worker_connections 4096;             # Maximum connections per worker
    multi_accept on;                     # Accept multiple connections
    use epoll;                           # Efficient connection processing
}

http {
    # Basic settings
    sendfile on;
    tcp_nopush on;
    tcp_nodelay on;
    keepalive_timeout 65;
    types_hash_max_size 2048;
    
    # File cache settings
    open_file_cache max=1000 inactive=20s;
    open_file_cache_valid 30s;
    open_file_cache_min_uses 2;
    open_file_cache_errors on;

    # Buffer size settings for improved performance
    client_body_buffer_size 10K;
    client_header_buffer_size 1k;
    client_max_body_size 8m;
    large_client_header_buffers 2 1k;

    # Gzip compression
    gzip on;
    gzip_disable "msie6";
    gzip_vary on;
    gzip_proxied any;
    gzip_comp_level 6;
    gzip_buffers 16 8k;
    gzip_http_version 1.1;
    gzip_types text/plain text/css application/json text/xml application/xml application/javascript;

    # Upstream server pool with health checks
    upstream api_servers {
        least_conn;                      # Use least connections algorithm
        server api1.example.com:3000 max_fails=3 fail_timeout=30s;
        server api2.example.com:3000 max_fails=3 fail_timeout=30s;
        server api3.example.com:3000 max_fails=3 fail_timeout=30s backup;
        
        keepalive 32;                    # Keep connections alive
    }

    # Rate limiting zone to prevent abuse
    limit_req_zone $binary_remote_addr zone=api_limit:10m rate=10r/s;

    server {
        listen 80;
        server_name api.example.com;
        
        # TLS configuration
        listen 443 ssl http2;
        ssl_certificate /etc/nginx/ssl/example.com.crt;
        ssl_certificate_key /etc/nginx/ssl/example.com.key;
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ciphers 'ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256';
        ssl_prefer_server_ciphers on;
        ssl_session_cache shared:SSL:10m;
        
        # Security headers
        add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
        add_header X-Content-Type-Options nosniff;
        add_header X-Frame-Options SAMEORIGIN;
        
        # API endpoint with rate limiting
        location /api/ {
            # Apply rate limiting
            limit_req zone=api_limit burst=20 nodelay;
            
            # Proxy headers
            proxy_set_header Host $host;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            
            # Timeouts
            proxy_connect_timeout 10s;
            proxy_send_timeout 30s;
            proxy_read_timeout 30s;
            
            # Keep connection alive to upstream
            proxy_http_version 1.1;
            proxy_set_header Connection "";
            
            # Pass to upstream servers
            proxy_pass http://api_servers;
        }
        
        # Static assets with long cache
        location /static/ {
            root /var/www;
            expires max;
            add_header Cache-Control "public, immutable";
        }
    }
}`}
          description="This NGINX configuration implements load balancing, HTTP/2, optimized caching, rate limiting, and security headers."
        />
      </div>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-orange-600">CDN Setup</h3>
        
        <p className="mb-4 text-gray-700">
          Content Delivery Networks (CDNs) cache your assets across global points of presence, dramatically reducing latency for users worldwide.
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <h4 className="font-semibold mb-2">CDN Configuration</h4>
            <CodeBlock
              language="javascript"
              title="cdn-configuration.js"
              code={`// CDN Configuration Object
const cdnConfig = {
  // Define assets that should be cached on CDN
  assetPatterns: [
    // Static assets with cache-first strategy
    {
      pattern: '/static/**/*',
      cacheControl: 'public, max-age=31536000, immutable',
      ttl: 365 * 24 * 60 * 60 // 1 year
    },
    // API responses with stale-while-revalidate
    {
      pattern: '/api/products/*',
      cacheControl: 'public, max-age=60, stale-while-revalidate=600',
      ttl: 60 // 1 minute, then serve stale for 10 more minutes
    },
    // Images with aggressive caching
    {
      pattern: '/images/**/*',
      cacheControl: 'public, max-age=604800, immutable',
      ttl: 7 * 24 * 60 * 60 // 7 days
    }
  ],
  
  // CDN Security settings
  security: {
    allowedHeaders: ['Content-Type', 'Authorization'],
    allowedMethods: ['GET', 'HEAD', 'OPTIONS'],
    allowedOrigins: ['https://example.com', 'https://www.example.com'],
    maxAge: 86400 // 1 day for CORS preflight
  },
  
  // Origin settings
  origin: {
    domain: 'origin.example.com',
    connectionTimeout: 5,
    readTimeout: 30,
    keepaliveTimeout: 60,
    maxConnections: 1000
  },
  
  // Custom error responses
  errorResponses: [
    {
      errorCode: 404,
      responseCode: 404,
      responsePage: '/404.html',
      ttl: 30
    }
  ]
};`}
            />
          </div>
          <div>
            <h4 className="font-semibold mb-2">Asset URL Strategy</h4>
            <CodeBlock
              language="javascript"
              title="cdn-helper.js"
              code={`/**
 * CDN helper to generate optimized asset URLs
 */
class CDNHelper {
  constructor(cdnDomain, options = {}) {
    this.cdnDomain = cdnDomain;
    this.options = {
      defaultQuality: 80,
      defaultFormat: 'webp',
      defaultWidth: 'auto',
      ...options
    };
  }

  /**
   * Generate optimized image URL
   */
  getImageUrl(path, options = {}) {
    const {
      width = this.options.defaultWidth,
      quality = this.options.defaultQuality,
      format = this.options.defaultFormat
    } = options;
    
    // Clean the path and ensure it starts with /
    const cleanPath = path.startsWith('/') ? path : \`/\${path}\`;
    
    // Build CDN URL with image transformation parameters
    const url = new URL(\`https://\${this.cdnDomain}\${cleanPath}\`);
    
    // Add image optimization parameters
    if (width !== 'auto') url.searchParams.append('w', width);
    url.searchParams.append('q', quality);
    url.searchParams.append('fm', format);
    
    return url.toString();
  }
  
  /**
   * Generate URL for static assets with cache-busting
   */
  getAssetUrl(path, version) {
    const cleanPath = path.startsWith('/') ? path : \`/\${path}\`;
    const versionParam = version ? \`?v=\${version}\` : '';
    
    return \`https://\${this.cdnDomain}\${cleanPath}\${versionParam}\`;
  }
}

// Create singleton instance
const cdn = new CDNHelper('cdn.example.com', {
  defaultQuality: 85,
  defaultFormat: 'webp'
});

// Usage examples:
// cdn.getImageUrl('/products/laptop.jpg', { width: 600 })
// cdn.getAssetUrl('/css/main.css', '1.2.3')`}
            />
          </div>
        </div>
        
        <div className="mb-6">
          <h4 className="font-semibold mb-2">CDN Integration in Frontend Code:</h4>
          <CodeBlock
            language="jsx"
            title="CDN usage in React components"
            code={`import React from 'react';
import { cdn } from '../utils/cdn-helper';

// Image component with automatic CDN optimization
const CDNImage = ({ src, alt, width, height, quality }) => {
  // Generate responsive image URLs
  const imgSrc = cdn.getImageUrl(src, { width, quality });
  
  // For art direction or different image ratios, use picture element
  const srcsetSizes = [
    { width: 320, screenWidth: '320w' },
    { width: 640, screenWidth: '640w' },
    { width: 1024, screenWidth: '1024w' },
    { width: 1920, screenWidth: '1920w' }
  ];
  
  const srcSet = srcsetSizes
    .map(size => \`\${cdn.getImageUrl(src, { width: size.width })} \${size.screenWidth}\`)
    .join(', ');
  
  return (
    <img
      src={imgSrc}
      srcSet={srcSet}
      sizes="(max-width: 768px) 100vw, 50vw"
      alt={alt}
      width={width}
      height={height}
      loading="lazy"
      decoding="async"
      className="cdn-image"
    />
  );
};

// CSS/JS asset loader with versioning
const getCDNAssetUrl = (path) => {
  // Get version from build-time environment variables or process.env
  const version = import.meta.env.VITE_APP_VERSION || '1.0.0';
  return cdn.getAssetUrl(path, version);
};

export { CDNImage, getCDNAssetUrl };`}
          />
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-orange-600">Caching Strategies</h3>
        
        <p className="mb-4 text-gray-700">
          A multi-layered caching strategy can dramatically improve performance and reduce load on your servers.
        </p>
        
        <div className="bg-white border rounded-lg overflow-hidden mb-6">
          <div className="px-4 py-2 bg-gray-50 border-b">
            <h4 className="font-medium">Multi-Level Caching Strategy</h4>
          </div>
          <div className="p-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left">Cache Layer</th>
                  <th className="px-4 py-2 text-left">Purpose</th>
                  <th className="px-4 py-2 text-left">TTL</th>
                  <th className="px-4 py-2 text-left">Invalidation Strategy</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="px-4 py-3 font-medium">Browser Cache</td>
                  <td className="px-4 py-3">Static assets, UI components</td>
                  <td className="px-4 py-3">1 year for versioned assets</td>
                  <td className="px-4 py-3">URL versioning (filename hash)</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">CDN</td>
                  <td className="px-4 py-3">Assets, API responses</td>
                  <td className="px-4 py-3">Minutes to days, varies by content</td>
                  <td className="px-4 py-3">Cache-Control headers, purge API</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">API Gateway</td>
                  <td className="px-4 py-3">API responses</td>
                  <td className="px-4 py-3">Seconds to minutes</td>
                  <td className="px-4 py-3">TTL-based, event-based invalidation</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Redis</td>
                  <td className="px-4 py-3">Database queries, computed values</td>
                  <td className="px-4 py-3">Seconds to hours</td>
                  <td className="px-4 py-3">Pattern invalidation on data change</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">Database</td>
                  <td className="px-4 py-3">Query results</td>
                  <td className="px-4 py-3">No expiration, sized by memory</td>
                  <td className="px-4 py-3">Automatic (LRU policy)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <CodeBlock
          language="javascript"
          title="cache-headers.js - Express middleware"
          code={`/**
 * Express middleware to set optimal cache headers
 */
const setCacheHeaders = (req, res, next) => {
  const url = req.originalUrl || req.url;
  
  // Static assets - long term caching with versioning in URL
  if (url.match(/\\.(js|css|png|jpg|jpeg|gif|webp|svg|woff2)$/i)) {
    // 1 year cache for fingerprinted assets
    if (url.includes('.')) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
      return next();
    }
  }
  
  // API responses - vary by endpoint
  if (url.startsWith('/api/')) {
    // Product listings - short cache with revalidation
    if (url.match(/\\/api\\/products(\\?|$)/)) {
      res.setHeader('Cache-Control', 'public, max-age=60, stale-while-revalidate=600');
      res.setHeader('Vary', 'Accept-Encoding');
      return next();
    }
    
    // User-specific data - private cache
    if (url.match(/\\/api\\/user\\/|profile|cart/)) {
      res.setHeader('Cache-Control', 'private, no-cache');
      res.setHeader('Pragma', 'no-cache');
      return next();
    }
    
    // Content that rarely changes
    if (url.match(/\\/api\\/(categories|settings)/)) {
      res.setHeader('Cache-Control', 'public, max-age=3600');
      res.setHeader('Vary', 'Accept-Encoding');
      return next();
    }
  }
  
  // Default - no cache for dynamic HTML content
  res.setHeader('Cache-Control', 'no-cache');
  return next();
};

module.exports = setCacheHeaders;`}
          description="Middleware for setting optimal cache headers based on content type and URL patterns."
        />
      </div>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-orange-600">High-Traffic Handling Procedures</h3>
        
        <p className="mb-4 text-gray-700">
          Handling sudden traffic spikes requires both technical solutions and operational procedures.
        </p>
        
        <div className="bg-white border rounded-lg p-4 mb-6">
          <h4 className="font-medium mb-3">Emergency Traffic Handling Protocol</h4>
          
          <ol className="list-decimal pl-5 space-y-3 text-gray-700">
            <li>
              <span className="font-medium">Automatic Scaling Triggers</span>
              <p className="text-sm mt-1">Configure auto-scaling groups to increase capacity when CPU utilization exceeds 70% or when request latency increases above 200ms for more than 2 minutes.</p>
            </li>
            <li>
              <span className="font-medium">Circuit Breaker Implementation</span>
              <p className="text-sm mt-1">Implement circuit breakers for non-critical API endpoints to gracefully degrade functionality under extreme load rather than causing cascading failures.</p>
            </li>
            <li>
              <span className="font-medium">Feature Toggles for High-Traffic Events</span>
              <p className="text-sm mt-1">Maintain a set of feature flags that can be quickly toggled to disable CPU-intensive features during traffic spikes.</p>
            </li>
            <li>
              <span className="font-medium">Fallback Static Content</span>
              <p className="text-sm mt-1">For planned high-traffic events, prepare pre-generated static versions of key pages that can be served directly from CDN if dynamic rendering becomes overloaded.</p>
            </li>
          </ol>
        </div>
        
        <CodeBlock
          language="javascript"
          title="circuit-breaker.js"
          code={`const CircuitBreaker = require('opossum');

/**
 * Circuit breaker factory for API endpoints
 * - Prevents cascading failures under high load
 * - Provides fallbacks for critical functionality
 */
function createCircuitBreaker(fn, options = {}) {
  const defaultOptions = {
    // Trip breaker if 50% of requests fail
    errorThresholdPercentage: 50,
    // 10 second timeout
    timeout: 10000,
    // Wait 30 seconds before trying again
    resetTimeout: 30000,
    // Consider volume of 20+ requests
    rollingCountTimeout: 60000,
    rollingCountBuckets: 10
  };
  
  const circuitOptions = { ...defaultOptions, ...options };
  const breaker = new CircuitBreaker(fn, circuitOptions);
  
  // Log circuit state changes
  breaker.on('open', () => {
    console.error(\`CIRCUIT OPEN: \${options.name || 'unnamed'}\`);
    // Alert engineering team via webhook/notification
  });
  
  breaker.on('close', () => {
    console.log(\`CIRCUIT CLOSED: \${options.name || 'unnamed'}\`);
  });
  
  return breaker;
}

// Example circuit breakers for different services
const productServiceBreaker = createCircuitBreaker(
  getProductDetails,
  {
    name: 'product-service',
    // Fallback function to use when circuit is open
    fallback: (id) => {
      // Return cached data or simplified response
      return getCachedProduct(id) || { 
        id, 
        name: 'Product information temporarily unavailable',
        status: 'loading'
      };
    }
  }
);

// Usage example
app.get('/api/products/:id', async (req, res) => {
  try {
    // Circuit breaker will handle failures
    const product = await productServiceBreaker.fire(req.params.id);
    res.json(product);
  } catch (error) {
    res.status(503).json({ 
      error: 'Service temporarily unavailable', 
      retryAfter: 30 
    });
  }
});`}
          description="Circuit breaker pattern implementation to prevent cascading failures during traffic spikes."
        />
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg border mb-6">
        <h4 className="font-semibold text-lg mb-2">Key Takeaways:</h4>
        <ul className="list-disc pl-5 space-y-1 text-gray-700">
          <li>Configure load balancing with health checks and failure detection</li>
          <li>Implement CDN for static assets and API responses that can be cached</li>
          <li>Use a multi-layered caching strategy for different types of data</li>
          <li>Prepare for traffic spikes with auto-scaling and circuit breakers</li>
          <li>Practice graceful degradation of functionality under extreme load</li>
        </ul>
      </div>
    </div>
  );
};

export default InfrastructureScaling;
