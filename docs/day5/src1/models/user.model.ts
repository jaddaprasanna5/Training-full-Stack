export type Role = "admin" | "user" // only 2 roles

export interface User {
  id: number
  name: string
  email: string
  role: Role
  active: boolean // true = active, false = deactivated
}

// for create - id and active not needed
export type CreateUserInput = Omit<User, "id" | "active">

// for update - all optional
export type UpdateUserInput = Partial<CreateUserInput>