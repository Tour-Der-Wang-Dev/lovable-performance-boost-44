
import React from 'react';
import CodeBlock from "./CodeBlock";

const DatabaseSchema = () => {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Database Schema for Project Management Tool</h2>
      
      <div className="mb-6 bg-white border rounded-lg shadow-sm overflow-hidden">
        <div className="p-4 bg-gray-50 border-b">
          <h3 className="font-medium text-lg">Entity Relationship Diagram</h3>
        </div>
        <div className="p-4 overflow-auto">
          <div className="grid grid-cols-3 gap-4">
            <div className="border rounded-lg p-4 bg-blue-50">
              <h4 className="font-semibold mb-2 text-blue-700">Project</h4>
              <ul className="list-none space-y-1">
                <li><span className="font-medium">id</span>: number <span className="text-xs bg-yellow-100 px-1 rounded">PK</span></li>
                <li><span className="font-medium">name</span>: string</li>
                <li><span className="font-medium">description</span>: string</li>
              </ul>
            </div>
            
            <div className="border rounded-lg p-4 bg-green-50">
              <h4 className="font-semibold mb-2 text-green-700">Task</h4>
              <ul className="list-none space-y-1">
                <li><span className="font-medium">id</span>: number <span className="text-xs bg-yellow-100 px-1 rounded">PK</span></li>
                <li><span className="font-medium">title</span>: string</li>
                <li><span className="font-medium">description</span>: string</li>
                <li><span className="font-medium">project_id</span>: number <span className="text-xs bg-purple-100 px-1 rounded">FK</span></li>
              </ul>
            </div>
            
            <div className="border rounded-lg p-4 bg-red-50">
              <h4 className="font-semibold mb-2 text-red-700">User</h4>
              <ul className="list-none space-y-1">
                <li><span className="font-medium">id</span>: number <span className="text-xs bg-yellow-100 px-1 rounded">PK</span></li>
                <li><span className="font-medium">name</span>: string</li>
                <li><span className="font-medium">email</span>: string</li>
              </ul>
            </div>
            
            <div className="border rounded-lg p-4 bg-yellow-50 col-span-3">
              <h4 className="font-semibold mb-2 text-yellow-700">UserTask (Junction Table)</h4>
              <ul className="list-none space-y-1">
                <li><span className="font-medium">user_id</span>: number <span className="text-xs bg-purple-100 px-1 rounded">FK</span></li>
                <li><span className="font-medium">task_id</span>: number <span className="text-xs bg-purple-100 px-1 rounded">FK</span></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4 text-orange-600">PostgreSQL Schema Definition</h3>
        
        <CodeBlock
          language="sql"
          title="schema.sql"
          code={`-- Projects Table
CREATE TABLE projects (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT
);

-- Tasks Table
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL,
  description TEXT,
  project_id INTEGER NOT NULL,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- Users Table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE
);

-- User_Tasks Junction Table (for many-to-many relationship)
CREATE TABLE user_tasks (
  user_id INTEGER NOT NULL,
  task_id INTEGER NOT NULL,
  PRIMARY KEY (user_id, task_id),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (task_id) REFERENCES tasks(id) ON DELETE CASCADE
);

-- Create composite index on task's project_id and id columns
CREATE INDEX idx_tasks_project_id_id ON tasks(project_id, id);

-- Create index on email for user lookups
CREATE INDEX idx_users_email ON users(email);`}
        />
      </div>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4 text-orange-600">Sequelize ORM Models</h3>
        
        <CodeBlock
          language="javascript"
          title="models.js"
          code={`// Project Model
const Project = sequelize.define('Project', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'projects',
  timestamps: true
});

// Task Model
const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  project_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'projects',
      key: 'id'
    }
  }
}, {
  tableName: 'tasks',
  timestamps: true,
  indexes: [
    {
      name: 'idx_tasks_project_id_id',
      fields: ['project_id', 'id']
    }
  ]
});

// User Model
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true
  }
}, {
  tableName: 'users',
  timestamps: true,
  indexes: [
    {
      name: 'idx_users_email',
      fields: ['email']
    }
  ]
});

// Define Relationships
Project.hasMany(Task, { foreignKey: 'project_id' });
Task.belongsTo(Project, { foreignKey: 'project_id' });

// Many-to-Many relationship between User and Task
User.belongsToMany(Task, { through: 'user_tasks', foreignKey: 'user_id' });
Task.belongsToMany(User, { through: 'user_tasks', foreignKey: 'task_id' });`}
        />
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg border mb-6">
        <h4 className="font-semibold text-lg mb-2">Key Design Considerations:</h4>
        <ul className="list-disc pl-5 space-y-1 text-gray-700">
          <li>On-delete cascading ensures referential integrity</li>
          <li>Composite index on task's project_id and id improves query performance when filtering tasks by project</li>
          <li>Email index supports efficient user lookups by email address</li>
          <li>Junction table (user_tasks) implements the many-to-many relationship between users and tasks</li>
          <li>Foreign key constraints prevent orphaned records</li>
        </ul>
      </div>
    </div>
  );
};

export default DatabaseSchema;
