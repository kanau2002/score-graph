import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { pool } from "./db";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";
const COOKIE_NAME = "auth_token";

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
}

export async function comparePasswords(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword);
}

export function generateToken(userId: number): string {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "30d" });
}

export function verifyToken(token: string): { userId: number } | null {
  try {
    return jwt.verify(token, JWT_SECRET) as { userId: number };
  } catch {
    // エラー変数を完全に省略
    return null;
  }
}

export async function getAuthCookie(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_NAME)?.value;
}

export async function setAuthCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set({
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30, // 7日間
    path: "/",
  });
}

export async function clearAuthCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function getCurrentUser(): Promise<{
  id: number;
  userName: string;
} | null> {
  const token = await getAuthCookie();
  if (!token) return null;

  const payload = verifyToken(token);
  if (!payload) return null;

  try {
    const result = await pool.query(
      "SELECT id, user_name FROM users WHERE id = $1",
      [payload.userId]
    );

    if (result.rows.length === 0) return null;

    return {
      id: result.rows[0].id,
      userName: result.rows[0].user_name,
    };
  } catch (error) {
    console.error("ユーザー取得エラー:", error);
    return null;
  }
}

export async function getCurrentUserId(): Promise<number> {
  const token = await getAuthCookie();
  if (!token) throw new Error("tokenがundefinedです。");

  const payload = verifyToken(token);
  if (!payload) throw new Error("userIdのpayloadがnullです。");

  const userId = payload.userId;
  return userId;
}
