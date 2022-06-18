import { EmployeesAction, EmployeesActionEnum, EmployeesState } from './types';

const initialState: EmployeesState = {
  employees: [],
  employee: {},
  loadingEmployees: true,
};

export default function RateReducer(
  state = initialState,
  action: EmployeesAction
): EmployeesState {
  switch (action.type) {
    case EmployeesActionEnum.GET_EMPLOYEES:
      return { ...state, employees: action.payload, loadingEmployees: false };

    case EmployeesActionEnum.CREATE_EMPLOYEE:
      return { ...state, loadingEmployees: false };

    case EmployeesActionEnum.DELETE_EMPLOYEE:
      return { ...state, loadingEmployees: false };

    default:
      return state;
  }
}
