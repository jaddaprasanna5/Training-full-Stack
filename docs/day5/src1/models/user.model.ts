export type Role = "admin" | "user";

export interface User {
  id: number;        
  name: string;     
  email: string;     
  role: Role;        
  active: boolean;  
}

export type CreateUserInput = Omit<User, "id" | "active">;
export type UpdateUserInput = Partial<CreateUserInput>;