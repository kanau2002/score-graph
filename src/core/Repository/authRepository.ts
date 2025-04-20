import { pool } from "@/lib/db";

export class AuthRepository {
  async searchExistingUser(email: string) {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (result.rows.length === 0) return null;
    return result.rows[0];
  }

  async createUser(
    email: string,
    hashedPassword: string,
    userName: string
  ): Promise<number> {
    const result = await pool.query(
      "INSERT INTO users (email, password, user_name) VALUES ($1, $2, $3) RETURNING id",
      [email, hashedPassword, userName]
    );
    return result.rows[0].id;
  }
}
