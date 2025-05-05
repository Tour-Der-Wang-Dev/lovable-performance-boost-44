
import CodeBlock from "../CodeBlock";
import PerformanceMetric from "../PerformanceMetric";

const DatabaseOptimization = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-gray-800">2. Database Optimization</h2>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-orange-600">PostgreSQL-specific Optimizations</h3>
        <p className="mb-4 text-gray-700">
          PostgreSQL performance can be significantly improved with proper configuration tuning, query optimization, and indexing strategies.
        </p>
        
        <div className="mb-6">
          <h4 className="font-semibold text-lg mb-2">Key Configuration Parameters:</h4>
          <CodeBlock
            language="ini"
            title="postgresql.conf optimizations"
            code={`# Memory Configuration
shared_buffers = 4GB                  # 25% of RAM for dedicated servers
work_mem = 32MB                       # Depends on concurrent operations
maintenance_work_mem = 512MB          # For vacuum, index creation
effective_cache_size = 12GB           # 75% of RAM estimate for disk caching
random_page_cost = 1.1                # Using SSDs? Set closer to 1.0

# Background Writer
bgwriter_delay = 200ms                # Write dirty pages every 200ms
bgwriter_lru_maxpages = 100           # Max pages to write each round

# Query Planning
default_statistics_target = 100       # Improve query planning

# Checkpoint Related
checkpoint_timeout = 15min            # Time between checkpoints
max_wal_size = 4GB                    # Increase for write-heavy workloads`}
            description="These parameters should be adjusted based on your server's available RAM and workload characteristics."
          />
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-orange-600">Required Indexes and Configurations</h3>
        
        <p className="mb-4 text-gray-700">
          Proper indexing is crucial for query performance. Below are examples of high-impact indexes that can dramatically improve query execution time.
        </p>
        
        <CodeBlock
          language="sql"
          title="Creating optimal indexes"
          code={`-- Before: Slow query on users table (taking ~1200ms)
-- SELECT * FROM users WHERE email LIKE 'john%' AND status = 'active';

-- After: Add composite index for this common query pattern
CREATE INDEX idx_users_status_email ON users(status, email text_pattern_ops);

-- Partial index for status=active users (most common filters)
CREATE INDEX idx_users_active ON users(created_at) WHERE status = 'active';

-- Use covering index for count queries that avoid table access
CREATE INDEX idx_users_status_covering ON users(status) INCLUDE (id);

-- Index for full-text search with GIN
CREATE INDEX idx_users_search ON users USING gin(
  to_tsvector('english', first_name || ' ' || last_name || ' ' || email)
);

-- Expression index for case-insensitive searches
CREATE INDEX idx_users_email_lower ON users(lower(email));`}
        />
        
        <div className="grid md:grid-cols-2 gap-4 mb-6 mt-6">
          <PerformanceMetric
            title="Query Response Time"
            beforeValue={1200}
            afterValue={42}
            unit="ms"
            target={100}
            improvedIsBetter={true}
          />
          <PerformanceMetric
            title="Database CPU Usage"
            beforeValue={84}
            afterValue={37}
            unit="%"
            improvedIsBetter={true}
          />
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-orange-600">Example Queries Showing 10x Performance Improvements</h3>
        
        <div className="grid gap-6 mb-6">
          <div>
            <h4 className="font-semibold mb-2">Example 1: Optimizing JOIN Operations</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <CodeBlock
                language="sql"
                title="Before: Slow JOIN query"
                code={`SELECT u.id, u.name, COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.created_at > '2023-01-01'
GROUP BY u.id, u.name
ORDER BY order_count DESC
LIMIT 100;

-- Execution time: 3200ms`}
              />
              <CodeBlock
                language="sql"
                title="After: Optimized JOIN query"
                code={`SELECT u.id, u.name, 
  (SELECT COUNT(id) FROM orders 
   WHERE user_id = u.id) as order_count
FROM users u
WHERE u.created_at > '2023-01-01'
ORDER BY order_count DESC
LIMIT 100;

-- Execution time: 280ms`}
              />
            </div>
            <p className="mt-2 text-sm text-gray-600">Using a correlated subquery instead of JOIN reduces the work PostgreSQL needs to do.</p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-2">Example 2: Pagination Optimization</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <CodeBlock
                language="sql"
                title="Before: Inefficient pagination"
                code={`SELECT p.*, u.username
FROM posts p
JOIN users u ON p.user_id = u.id
ORDER BY p.created_at DESC
LIMIT 20 OFFSET 10000;

-- Execution time: 5400ms`}
              />
              <CodeBlock
                language="sql"
                title="After: Keyset pagination"
                code={`SELECT p.*, u.username
FROM posts p
JOIN users u ON p.user_id = u.id
WHERE p.created_at < 
  (SELECT created_at FROM posts 
   WHERE id = $last_seen_id)
ORDER BY p.created_at DESC
LIMIT 20;

-- Execution time: 120ms`}
              />
            </div>
            <p className="mt-2 text-sm text-gray-600">Keyset pagination avoids counting through all previous rows, dramatically improving performance.</p>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-orange-600">Troubleshooting Database Performance</h3>
        
        <div className="bg-white border rounded-lg overflow-hidden mb-6">
          <div className="px-4 py-2 bg-gray-50 border-b">
            <h4 className="font-medium">Common Database Performance Issues and Solutions</h4>
          </div>
          <div className="p-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-2 text-left">Issue</th>
                  <th className="px-4 py-2 text-left">Diagnosis</th>
                  <th className="px-4 py-2 text-left">Solution</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                <tr>
                  <td className="px-4 py-3 align-top">Slow Sequential Scans</td>
                  <td className="px-4 py-3 align-top">
                    <code>EXPLAIN ANALYZE</code> shows sequential scan on large tables
                  </td>
                  <td className="px-4 py-3 align-top">
                    Add appropriate indexes for query WHERE clauses
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 align-top">Bloated Tables</td>
                  <td className="px-4 py-3 align-top">
                    Increased disk usage and slower queries after many updates/deletes
                  </td>
                  <td className="px-4 py-3 align-top">
                    Run <code>VACUUM FULL</code> during low-traffic periods
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 align-top">Connection Pool Exhaustion</td>
                  <td className="px-4 py-3 align-top">
                    "Too many connections" errors under load
                  </td>
                  <td className="px-4 py-3 align-top">
                    Implement connection pooling with pgBouncer
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 align-top">Inefficient JOINs</td>
                  <td className="px-4 py-3 align-top">
                    <code>EXPLAIN</code> shows hash joins on large tables without constraints
                  </td>
                  <td className="px-4 py-3 align-top">
                    Add foreign keys, create proper indexes on join columns
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg border mb-6">
        <h4 className="font-semibold text-lg mb-2">Key Takeaways:</h4>
        <ul className="list-disc pl-5 space-y-1 text-gray-700">
          <li>Proper indexing can yield 10-100x query performance improvements</li>
          <li>PostgreSQL configuration should be tuned to your specific hardware</li>
          <li>Use EXPLAIN ANALYZE to identify and optimize slow queries</li>
          <li>Consider query patterns when designing tables and indexes</li>
        </ul>
      </div>
    </div>
  );
};

export default DatabaseOptimization;
