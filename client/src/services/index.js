import { AuthService } from "./auth";
import {ExpensesService} from "./expenses"
import { IncomesService } from "./incomes";
import { SavingsService } from "./savings";

// const url = 'https://finance-tracker-app-3hf8.onrender.com';
// const url = 'http://localhost:4000';
const url = 'http://16.171.177.162';
export const authService = new AuthService(`${url}/auth`)
export const expensesService = new ExpensesService(`${url}/expenses`)
export const incomesService = new IncomesService(`${url}/incomes`)
export const savingsService = new SavingsService(`${url}/savings`)