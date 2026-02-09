import { redirect } from "next/navigation";
import { getCurrentUser } from "../auth/getCurrentUser";
import { ProjectFormValues } from "../data-access/formvalue";
import { getUserPermission } from "../auth/getUserPermission";

export async function createProjectAction(data: ProjectFormValues) {
    const user = await getCurrentUser()
    if (user == null) redirect("/")
    
    const permissioin = await getUserPermission(user)
    if (permissioin === "create") {
        redirect('/dashboard')
    } else {
        redirect("/")
    }

}