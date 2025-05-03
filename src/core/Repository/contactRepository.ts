import { pool } from "@/lib/db";
import { ContactSubmitData, ContactSubmitResponse } from "@/type/contactType";

export class ContactRepository {
  async submitContact(
    userId: number,
    data: ContactSubmitData
  ): Promise<ContactSubmitResponse> {
    try {
      const result = await pool.query(
        `INSERT INTO contact (user_id, message)
         VALUES ($1, $2)
         RETURNING id`,
        [userId, data.message]
      );

      return {
        success: true,
        contactId: result.rows[0].id,
      };
    } catch (error) {
      console.error("お問い合わせ送信エラー:", error);
      return {
        success: false,
        error: "お問い合わせの送信に失敗しました",
      };
    }
  }
}
