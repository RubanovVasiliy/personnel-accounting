import axios, { AxiosResponse } from 'axios';
import { IEmployee } from '../models/IEmployee';

export default class EmployeesService {
  private static REACT_API = 'http://localhost:5000/employees';

  static async createEmployee(
    employee: IEmployee
  ): Promise<AxiosResponse<IEmployee>> {
    return await axios.post<IEmployee>(`${this.REACT_API}`, { ...employee });
  }

  static async getEmployees(): Promise<AxiosResponse<IEmployee[]>> {
    return await axios.get<IEmployee[]>(`${this.REACT_API}`);
  }

  static async updateEmployee(
    employee: IEmployee
  ): Promise<AxiosResponse<IEmployee>> {
    return await axios.put<IEmployee>(`${this.REACT_API}/${employee.id}`, {
      ...employee,
    });
  }

  static async deleteEmployee(id: string): Promise<AxiosResponse<string>> {
    return await axios.delete<string>(`${this.REACT_API}/${id}`);
  }
}
