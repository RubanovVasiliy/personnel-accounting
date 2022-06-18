import { AppDispatch } from '../..';
import EmployeesService from '../../../api/EmployeesService';
import { IEmployee } from '../../../models/IEmployee';
import {
  CreateEployeesAction,
  DeleteEployeeAction,
  EmployeesActionEnum,
  GetEployeesAction,
  UpdateEployeesAction,
} from './types';

export const EmployeesActionCreators = {
  getEmployees: (payload: IEmployee[]): GetEployeesAction => ({
    type: EmployeesActionEnum.GET_EMPLOYEES,
    payload: payload,
  }),

  employeeCreated: (): CreateEployeesAction => ({
    type: EmployeesActionEnum.CREATE_EMPLOYEE,
  }),

  employeeUpdated: (): UpdateEployeesAction => ({
    type: EmployeesActionEnum.UPDATE_EMPLOYEE,
  }),

  employeeDeleted: (): DeleteEployeeAction => ({
    type: EmployeesActionEnum.DELETE_EMPLOYEE,
  }),

  loadEmployees: () => async (dispatch: AppDispatch) => {
    try {
      const response = await EmployeesService.getEmployees();
      dispatch(EmployeesActionCreators.getEmployees(response.data));
    } catch (e) {
      console.log(e);
    }
  },

  createEmployee: (employee: IEmployee) => async (dispatch: AppDispatch) => {
    try {
      await EmployeesService.createEmployee(employee);
      dispatch(EmployeesActionCreators.employeeCreated());
      dispatch(EmployeesActionCreators.loadEmployees());
    } catch (e) {
      console.log(e);
    }
  },

  updateEmployee: (employee: IEmployee) => async (dispatch: AppDispatch) => {
    try {
      await EmployeesService.updateEmployee(employee);
      dispatch(EmployeesActionCreators.employeeUpdated());
      dispatch(EmployeesActionCreators.loadEmployees());
    } catch (e) {
      console.log(e);
    }
  },

  deleteEmployee: (id: string) => async (dispatch: AppDispatch) => {
    try {
      await EmployeesService.deleteEmployee(id);
      dispatch(EmployeesActionCreators.employeeDeleted());
      dispatch(EmployeesActionCreators.loadEmployees());
    } catch (e) {
      console.log(e);
    }
  },
};
