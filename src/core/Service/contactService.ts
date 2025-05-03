import { ContactSubmitData, ContactSubmitResponse } from "@/type/contactType";
import { ContactRepository } from "../Repository/contactRepository";
import { getCurrentUserId } from "@/lib/auth";

class ContactService {
  private repository: ContactRepository;

  constructor() {
    this.repository = new ContactRepository();
  }

  async submitContact(data: ContactSubmitData): Promise<ContactSubmitResponse> {
    const userId = await getCurrentUserId();
    return this.repository.submitContact(userId, data);
  }
}

export const contactService = new ContactService();
