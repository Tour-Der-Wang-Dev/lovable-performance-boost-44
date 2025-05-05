
import CodeBlock from "../CodeBlock";
import PerformanceMetric from "../PerformanceMetric";

const BackendPerformance = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">3. Backend Performance</h2>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-orange-600">Node.js/Express.js Best Practices</h3>
        <p className="mb-4 text-gray-700">
          Optimizing Node.js application performance requires attention to both code quality and runtime configuration. Below are key optimizations specifically for Node.js servers.
        </p>
        
        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <PerformanceMetric
            title="API Response Time"
            beforeValue={320}
            afterValue={48}
            unit="ms"
            target={100}
            improvedIsBetter={true}
          />
          <PerformanceMetric
            title="Requests/Second"
            beforeValue={1200}
            afterValue={8500}
            unit=""
            improvedIsBetter={false}
          />
        </div>
        
        <CodeBlock
          language="javascript"
          title="server.js - Optimized Node.js Configuration"
          code={`// Before optimization: Simple Express setup
// const app = express();
// app.use(bodyParser.json());
// app.listen(3000);

// After optimization: Advanced configuration
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const express = require('express');
const compression = require('compression');

if (cluster.isMaster) {
  // Master process: Fork workers
  console.log(\`Master \${process.pid} is running\`);
  
  // Fork workers based on CPU count
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
  
  cluster.on('exit', (worker) => {
    console.log(\`Worker \${worker.process.pid} died\`);
    // Replace the dead worker
    cluster.fork();
  });
} else {
  // Worker processes: Run the Express app
  const app = express();
  
  // Performance optimizations
  app.use(compression()); // Compress responses
  app.use(express.json({ limit: '10kb' })); // Limit payload size
  
  // Disable x-powered-by header
  app.disable('x-powered-by');
  
  // Routes
  app.use('/api/v1', require('./routes'));
  
  // Global error handler
  app.use((err, req, res, next) => {
    // Log error but don't expose details to client
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  });
  
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(\`Worker \${process.pid} started on port \${PORT}\`);
  });
}`}
          description="Utilizing the Node.js cluster module to take advantage of multiple CPU cores along with response compression can significantly improve throughput."
        />
      </div>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-orange-600">Specific Middleware Configurations</h3>
        
        <p className="mb-4 text-gray-700">
          Middleware selection and configuration can significantly impact API response times. Below are middleware optimizations that have shown notable performance improvements.
        </p>
        
        <CodeBlock
          language="javascript"
          title="middleware-optimizations.js"
          code={`const express = require('express');
const router = express.Router();
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

// Before: Unoptimized middleware stack
// app.use(morgan('combined'));
// app.use(cors());
// app.use(helmet());
// app.use(express.json());

// After: Performance-optimized middleware configuration
module.exports = (app) => {
  // Only log in development
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  } else {
    // Use tiny format in production for minimal logging overhead
    app.use(morgan('tiny', {
      skip: (req) => req.url.startsWith('/health') || req.url.startsWith('/metrics')
    }));
  }
  
  // Security with performance in mind
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        // Customized CSP for better performance while maintaining security
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", 'cdn.yourapp.com'],
        styleSrc: ["'self'", "'unsafe-inline'", 'cdn.yourapp.com'],
        imgSrc: ["'self'", 'data:', 'cdn.yourapp.com', 'img.yourapp.com']
      }
    }
  }));
  
  // Pre-flight requests caching for CORS
  app.use(cors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    maxAge: 86400 // Cache CORS pre-flight requests for 24 hours
  }));
  
  // Rate limiting only for sensitive endpoints
  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // 100 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
  });
  
  // Apply rate limiting only to authentication routes
  app.use('/api/auth', apiLimiter);
  
  // Optimized JSON parsing with size limits
  app.use(express.json({
    limit: '10kb', // Limit request body size
    strict: true,  // Only accept arrays and objects
    verify: (req, res, buf) => {
      try {
        JSON.parse(buf);
      } catch (e) {
        res.status(400).end();
        throw new Error('Invalid JSON');
      }
    }
  }));
  
  return app;
};`}
          description="Carefully configured middleware can reduce overhead while maintaining security and functionality."
        />
      </div>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-orange-600">Caching Implementation with Redis</h3>
        
        <p className="mb-4 text-gray-700">
          Redis can dramatically improve performance for frequently accessed data. The following implementation shows a reusable caching layer.
        </p>
        
        <CodeBlock
          language="javascript"
          title="cache-service.js"
          code={`const Redis = require('ioredis');
const { promisify } = require('util');

class CacheService {
  constructor() {
    this.redisClient = new Redis({
      host: process.env.REDIS_HOST || 'localhost',
      port: process.env.REDIS_PORT || 6379,
      password: process.env.REDIS_PASSWORD,
      // Connection optimizations
      maxRetriesPerRequest: 1,
      enableReadyCheck: false,
      // Higher performance, slightly less reliability
      enableOfflineQueue: true,
      // Connection pool for high traffic
      connectionName: 'api-cache',
    });
    
    // Handle connection errors
    this.redisClient.on('error', (error) => {
      console.error('Redis connection error:', error);
      // Failed silently - app can continue without cache
    });
  }

  /**
   * Get value from cache or execute function and cache its result
   * @param {string} key - Cache key
   * @param {Function} fallbackFn - Async function to execute if cache misses
   * @param {number} ttl - Cache TTL in seconds
   */
  async getOrSet(key, fallbackFn, ttl = 3600) {
    try {
      // Try to get from cache first
      const cachedData = await this.redisClient.get(key);
      
      if (cachedData) {
        console.log(\`Cache hit: \${key}\`);
        return JSON.parse(cachedData);
      }
      
      // Cache miss - execute function
      console.log(\`Cache miss: \${key}\`);
      const freshData = await fallbackFn();
      
      // Save to cache (don't await to avoid delaying response)
      this.redisClient.setex(
        key,
        ttl,
        JSON.stringify(freshData)
      ).catch(e => console.error('Redis set error:', e));
      
      return freshData;
    } catch (error) {
      console.error('Cache error', error);
      // If cache fails, fallback to original function
      return fallbackFn();
    }
  }

  /**
   * Invalidate a cache key or pattern
   */
  async invalidate(keyOrPattern) {
    if (keyOrPattern.includes('*')) {
      // Pattern invalidation
      const keys = await this.redisClient.keys(keyOrPattern);
      if (keys.length > 0) {
        return this.redisClient.del(keys);
      }
      return 0;
    }
    // Single key invalidation
    return this.redisClient.del(keyOrPattern);
  }
}

module.exports = new CacheService();`}
          description="A production-ready caching service with fallback handling, TTL support, and pattern-based invalidation."
        />
        
        <div className="mt-6">
          <h4 className="font-semibold mb-2">Implementation Example:</h4>
          
          <CodeBlock
            language="javascript"
            title="users-controller.js with caching"
            code={`const cacheService = require('../services/cache-service');
const userRepository = require('../repositories/user-repository');

class UserController {
  // Before: Without caching
  // async getUsers(req, res) {
  //   const users = await userRepository.findAll(req.query);
  //   return res.json(users);
  // }
  
  // After: With Redis caching
  async getUsers(req, res) {
    const { page = 1, limit = 20, sortBy = 'createdAt' } = req.query;
    
    // Create a cache key based on query parameters
    const cacheKey = \`users:list:\${page}:\${limit}:\${sortBy}\`;
    
    try {
      // Get from cache or DB with 5-minute TTL
      const users = await cacheService.getOrSet(
        cacheKey,
        () => userRepository.findAll(req.query),
        300 // 5 minutes
      );
      
      return res.json(users);
    } catch (error) {
      console.error('Error fetching users:', error);
      return res.status(500).json({ 
        error: 'Failed to fetch users' 
      });
    }
  }
  
  async createUser(req, res) {
    try {
      const newUser = await userRepository.create(req.body);
      
      // Invalidate user list caches after creation
      await cacheService.invalidate('users:list:*');
      
      return res.status(201).json(newUser);
    } catch (error) {
      console.error('Error creating user:', error);
      return res.status(400).json({ 
        error: 'Failed to create user' 
      });
    }
  }
}`}
          />
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-orange-600">API Response Optimization Techniques</h3>
        
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <h4 className="font-semibold mb-2">Response Shape Optimization</h4>
            <CodeBlock
              language="javascript"
              title="optimized-response.js"
              code={`// Before: Sending unnecessary data
app.get('/api/products', async (req, res) => {
  const products = await Product.findAll({
    include: [
      { model: Category, as: 'category' },
      { model: Review, as: 'reviews' }
    ]
  });
  
  res.json(products);
});

// After: Optimized with field selection
app.get('/api/products', async (req, res) => {
  const fields = req.query.fields?.split(',') || 
    ['id', 'name', 'price', 'imageUrl'];
    
  // Only fetch needed fields
  const products = await Product.findAll({
    attributes: fields,
    include: [
      { 
        model: Category, 
        as: 'category',
        attributes: ['id', 'name']
      }
    ]
  });
  
  res.json(products);
});`}
            />
          </div>
          <div>
            <h4 className="font-semibold mb-2">Response Streaming for Large Data</h4>
            <CodeBlock
              language="javascript"
              title="streaming-response.js"
              code={`// Before: Loading everything into memory
app.get('/api/reports', async (req, res) => {
  const allData = await Report.findAll();
  res.json(allData); // Can be several MB
});

// After: Stream large responses
app.get('/api/reports/stream', async (req, res) => {
  // Set streaming JSON response headers
  res.setHeader('Content-Type', 'application/json');
  res.write('[');
  
  // Use cursor for pagination without loading all data
  const cursor = await Report.findAll({
    cursor: true,
    limit: 1000 // Process in batches
  });
  
  let isFirst = true;
  
  // Process each batch
  for await (const batch of cursor) {
    for (const item of batch) {
      if (!isFirst) res.write(',');
      res.write(JSON.stringify(item));
      isFirst = false;
    }
    // Allow other requests to be processed
    await new Promise(resolve => setImmediate(resolve));
  }
  
  res.write(']');
  res.end();
});`}
            />
          </div>
        </div>
        
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">Common Pitfall: N+1 Query Problem</h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>One of the most common backend performance issues is the N+1 query problem, where an application executes N additional queries to fetch related data for N records. This can be solved with eager loading or dataloader patterns.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg border mb-6">
        <h4 className="font-semibold text-lg mb-2">Key Takeaways:</h4>
        <ul className="list-disc pl-5 space-y-1 text-gray-700">
          <li>Use clustering to take advantage of multiple CPU cores</li>
          <li>Implement Redis caching for frequently accessed data</li>
          <li>Configure middleware to minimize overhead</li>
          <li>Optimize response payloads by including only necessary fields</li>
          <li>Stream large responses instead of loading everything into memory</li>
        </ul>
      </div>
    </div>
  );
};

export default BackendPerformance;
