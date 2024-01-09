import { AuthService } from "./auth";

const url = 'http://localhost:4000';
export const authService = new AuthService(`${url}/auth`)