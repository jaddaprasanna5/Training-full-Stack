export type Department = "IT" | "HR" | "Finance" | "Sales" | "Marketing"
export type Role = "admin" | "user"

export interface Employee {
  id: number
  name: string
  email: string
  age: number
  department: Department
  salary: number
  role: Role
  isActive: boolean
}

// for create - id and isActive optional
export type CreateEmployeeInput = Omit<Employee, "id" | "isActive"> & {
  id?: number
  isActive?: boolean
}

// for update - id cant be changed
export type UpdateEmployeeInput = Partial<Omit<Employee, "id">>