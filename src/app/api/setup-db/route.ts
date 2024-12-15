import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';



const createTablesQuery = `
-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create games table
CREATE TABLE IF NOT EXISTS games (
    id UUID PRIMARY KEY,
    status VARCHAR(20) NOT NULL DEFAULT 'active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create user_games table
CREATE TABLE IF NOT EXISTS user_games (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    game_id UUID REFERENCES games(id),
    color VARCHAR(5) NOT NULL CHECK (color IN ('white', 'black')),
    UNIQUE (game_id, color)
);

-- Create moves table
CREATE TABLE IF NOT EXISTS moves (
    id SERIAL PRIMARY KEY,
    game_id UUID REFERENCES games(id),
    move_list TEXT NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
`;

export async function GET() {
    try {
        await sql.query(createTablesQuery);
        return NextResponse.json({ message: 'Database tables created successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error creating database tables:', error);
        return NextResponse.json({ error: 'Failed to create database tables' }, { status: 500 });
    }
}

