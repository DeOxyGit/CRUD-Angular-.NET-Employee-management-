import { Department } from "./department.model";

export interface Employee {
    id : number;
    firstName : string;
    lastName : string;
    department : Department
}