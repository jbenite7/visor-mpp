-- backend/sql/schema.sql

-- Projects Table
CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    start_date TIMESTAMP,
    finish_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    settings JSONB DEFAULT '{}'
);

-- Tasks Table
CREATE TABLE IF NOT EXISTS tasks (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
    uid INTEGER NOT NULL,
    wbs VARCHAR(50),
    name TEXT,
    start_date TIMESTAMP,
    finish_date TIMESTAMP,
    duration VARCHAR(50), -- Guardamos como texto por compatibilidad con MSPDI ("PT8H0M0S")
    duration_seconds INTEGER, -- Para cálculos y consultas
    percent_complete INTEGER DEFAULT 0,
    outline_level INTEGER,
    parent_uid INTEGER, -- UID de la tarea padre en el contexto del proyecto
    is_summary BOOLEAN DEFAULT FALSE,
    is_milestone BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    -- Otros campos pueden agregarse según necesidad
);

-- Resources Table
CREATE TABLE IF NOT EXISTS resources (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
    uid INTEGER NOT NULL,
    name VARCHAR(255),
    type INTEGER, -- 0: Trabajo, 1: Material
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Assignments Table (Recursos asignados a tareas)
CREATE TABLE IF NOT EXISTS assignments (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
    task_uid INTEGER NOT NULL,
    resource_uid INTEGER NOT NULL,
    units DECIMAL(10, 2) DEFAULT 0, -- Porcentaje de asignación
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Dependencies Table (Vínculos entre tareas)
CREATE TABLE IF NOT EXISTS dependencies (
    id SERIAL PRIMARY KEY,
    project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
    predecessor_uid INTEGER NOT NULL,
    successor_uid INTEGER NOT NULL,
    type INTEGER DEFAULT 1, -- 1: FF, 2: FC, 3: CF, 4: CC (Valores típicos de MS Project)
    lag INTEGER DEFAULT 0, -- Lag en décimas de minuto
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_tasks_project_id ON tasks(project_id);
CREATE INDEX IF NOT EXISTS idx_tasks_uid ON tasks(uid);
CREATE INDEX IF NOT EXISTS idx_tasks_parent_uid ON tasks(parent_uid);
CREATE INDEX IF NOT EXISTS idx_resources_project_id ON resources(project_id);
CREATE INDEX IF NOT EXISTS idx_assignments_project_id ON assignments(project_id);
CREATE INDEX IF NOT EXISTS idx_dependencies_project_id ON dependencies(project_id);
