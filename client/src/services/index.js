import { AuthService } from "./auth";
import {ExpensesService} from "./expenses"
import { IncomesService } from "./incomes";

const url = 'http://localhost:4000';
export const authService = new AuthService(`${url}/auth`)
export const expensesService = new ExpensesService(`${url}/expenses`)
export const incomesService = new IncomesService(`${url}/incomes`)