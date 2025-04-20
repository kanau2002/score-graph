import { pool } from "@/lib/db";
import { hashPassword, comparePasswords, generateToken } from "@/lib/auth";

interface SignupData {
  email: string;
  password: string;
  userName: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface AuthResponse {
  success: boolean;
  userId?: number;
  token?: string;
  error?: string;
  userName?: string;
}

export class AuthService {
  // ユーザー登録
  async signup(data: SignupData): Promise<AuthResponse> {
    try {
      // メールアドレスが既に使用されているか確認
      const existingUser = await pool.query(
        "SELECT * FROM users WHERE email = $1",
        [data.email]
      );

      if (existingUser.rows.length > 0) {
        return {
          success: false,
          error: "このメールアドレスは既に登録されています",
        };
      }

      // パスワードのハッシュ化
      const hashedPassword = await hashPassword(data.password);

      // ユーザーを作成
      const result = await pool.query(
        "INSERT INTO users (email, password, user_name) VALUES ($1, $2, $3) RETURNING id",
        [data.email, hashedPassword, data.userName]
      );

      const userId = result.rows[0].id;
      const token = generateToken(userId);

      return {
        success: true,
        userId,
        token,
      };
    } catch (error) {
      console.error("ユーザー登録エラー:", error);
      return {
        success: false,
        error: "登録中にエラーが発生しました",
      };
    }
  }

  // ログイン
  async login(data: LoginData): Promise<AuthResponse> {
    try {
      // メールアドレスでユーザーを検索
      const result = await pool.query("SELECT * FROM users WHERE email = $1", [
        data.email,
      ]);

      if (result.rows.length === 0) {
        return {
          success: false,
          error: "メールアドレスまたはパスワードが正しくありません",
        };
      }

      const user = result.rows[0];

      // パスワードを検証
      const isPasswordValid = await comparePasswords(
        data.password,
        user.password
      );
      if (!isPasswordValid) {
        return {
          success: false,
          error: "メールアドレスまたはパスワードが正しくありません",
        };
      }

      // トークンを生成
      const token = generateToken(user.id);

      return {
        success: true,
        userId: user.id,
        userName: user.user_name, // ユーザー名も返す
        token,
      };
    } catch (error) {
      console.error("ログインエラー:", error);
      return {
        success: false,
        error: "ログイン中にエラーが発生しました",
      };
    }
  }
}

export const authService = new AuthService();
