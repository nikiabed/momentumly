export type User = {
    id: string
    name: string;
    role: "admin"| "guest"| "viewer" | "editor";
} | null ;

export type Project = {
    id: string;
    title: string;
    description?: string;
    createdBy: string;
}
