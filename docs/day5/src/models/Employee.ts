export type Department = "IT"|"HR"|"Finance"|"Sales"|"Marketing";
export type Role = "admin"| "user";
export interface Employee  {
    id:number;
    name:string;
    email:string;
    age:number;
    department:Department;
    salary:number;
    role:Role;
    isActive:boolean;
}
//Here we are omit the "id","isActive" not included in the CreateEmployeeInput 
export type CreateEmployeeInput=Omit<Employee, "id"| "isActive"> & {
    id?:number;
    isActive?:boolean;
};
//Here we are update, id cannot be updated, everything else is optional
export type UpdateEmployeeInput = Partial<Omit<Employee,"id">>;