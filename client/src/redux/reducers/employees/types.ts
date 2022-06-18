import { IEmployee } from '../../../models/IEmployee';

export interface EmployeesState {
  employees: IEmployee[];
  employee: {};
  loadingEmployees: boolean;
}

export enum EmployeesActionEnum {
  GET_EMPLOYEES = 'GET_EMPLOYEES',
  CREATE_EMPLOYEE = 'CREATE_EMPLOYEE',
  UPDATE_EMPLOYEE = 'UPDATE_EMPLOYEE',
  DELETE_EMPLOYEE = 'DELETE_EMPLOYEE',
}

export interface GetEployeesAction {
  type: EmployeesActionEnum.GET_EMPLOYEES;
  payload: IEmployee[];
}

export interface CreateEployeesAction {
  type: EmployeesActionEnum.CREATE_EMPLOYEE;
}
export interface UpdateEployeesAction {
  type: EmployeesActionEnum.UPDATE_EMPLOYEE;
}

export interface DeleteEployeeAction {
  type: EmployeesActionEnum.DELETE_EMPLOYEE;
}

export type EmployeesAction =
  | GetEployeesAction
  | DeleteEployeeAction
  | CreateEployeesAction
  | UpdateEployeesAction;
