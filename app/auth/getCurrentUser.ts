import { User } from "../data-access/user";

export async function getCurrentUser(): Promise<User | null> {
    const mockUser: User = {
        'id': '1',
        'name': 'Niki',
        'role': 'admin'
    }
return mockUser
}