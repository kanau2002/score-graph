import { hashPassword, comparePasswords, generateToken } from "@/lib/auth";
import { AuthResponse, LoginData, SignupData } from "@/type/authType";
import { AuthRepository } from "../Repository/authRepository";

export class AuthService {
  private repository: AuthRepository;

  constructor() {
    this.repository = new AuthRepository();
  }
  // ユーザー登録
  async signup(data: SignupData): Promise<AuthResponse> {
    try {
      // メールアドレスが既に使用されているか確認
      const user = await this.repository.searchExistingUser(data.email);
      if (user)
        return {
          success: false,
          error: "このメールアドレスは既に登録されています",
        };

      // パスワードのハッシュ化
      const hashedPassword = await hashPassword(data.password);

      // ユーザーを作成＋返り値としてuserIdを取得
      const userId = await this.repository.createUser(
        data.email,
        hashedPassword,
        data.fullName
      );

      const token = generateToken(userId);
      console.log("userId", userId);

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
      const user = await this.repository.searchExistingUser(data.email);

      if (user === null) {
        return {
          success: false,
          error: "メールアドレスが正しくありません",
        };
      }

      // パスワードを検証
      const isPasswordValid = await comparePasswords(
        data.password,
        user.password
      );
      if (!isPasswordValid) {
        return {
          success: false,
          error: "パスワードが正しくありません",
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
