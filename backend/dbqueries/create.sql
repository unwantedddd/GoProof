CREATE TABLE IF NOT EXISTS "User" (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'user'
);

CREATE TABLE IF NOT EXISTS Challenge (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    start_date DATE,
    end_date DATE,
    status VARCHAR(50) DEFAULT 'active'
);

CREATE TABLE IF NOT EXISTS Participation (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES "User"(id),
    challenge_id INT NOT NULL REFERENCES Challenge(id),
    join_date TIMESTAMP DEFAULT NOW(),
    status VARCHAR(50) DEFAULT 'in_progress'
);

CREATE TABLE IF NOT EXISTS Proof (
    id SERIAL PRIMARY KEY,
    participation_id INT NOT NULL REFERENCES Participation(id),
    file_url VARCHAR(500),
    description TEXT,
    submission_date TIMESTAMP DEFAULT NOW(),
    verification_status VARCHAR(50) DEFAULT 'pending',
    admin_id INT REFERENCES "User"(id)
);
