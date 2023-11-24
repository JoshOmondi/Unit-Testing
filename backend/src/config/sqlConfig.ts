import * as sql from "mssql";
import dotenv from "dotenv";
dotenv.config();

export const sqlConfig = {
  user: "sa",
  password: "joshua",
  database: "TESTING",
  server: "localhost",
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

export async function TestConnection() {
  const pool = await sql.connect(sqlConfig);
  if (pool.connected) {
    console.log("connected to database");
  } else {
    console.log("not connected");
  }
}
