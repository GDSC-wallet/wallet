import pg from 'pg'
import { Sequelize } from 'sequelize'

import dotenv from "dotenv";

const { Pool, Client } = pg;

export const pool = new Pool({
  database: 'cooperative',
  user: 'william',
  password: 'root',
  host: '127.0.0.1',
  port: '5432'
})

export const client = new Client({
  database: 'cooperative',
  user: 'william',
  password: 'root',
  host: '127.0.0.1',
  port: '5432'
})

export const sequelize = new Sequelize('postgres://william:root@127.0.0.1:5432/postgres')

