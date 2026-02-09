import { Permission } from "../data-access/permission";
import { User } from "../data-access/user";


export async function getUserPermission(user: User): Promise<Permission> {
    if (!user) { return 'none';}
    switch (user.role) {
        case "admin":
            return "create";
        case "editor":
            return "read";
        case "viewer":
            return "read";
        default :
            return "none";
    }
    
}