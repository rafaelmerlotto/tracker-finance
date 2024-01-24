import { expensesService, incomesService, savingsService } from ".";


export class AuthService {

    iToken;


    constructor(url, message, currencyActual) {
        this.url = url
        this.message = message
        this.currencyActual = currencyActual 
    }



    get token() {
        return this.iToken
    }


    async login(email, password) {
        const res = await fetch(`${this.url}/login`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(email, password)
        })
        if (!res) {
            return false
        }
        const data = await res.json();
        this.iToken = data.accessToken;
        this.message = data.msg
        return true

    }


    async registerUser(email, password, fullName) {
        const res = await fetch(`${this.url}/register`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(email, password, fullName)
        })
        if (res.ok) {
            return await res.json();
        }
    }

    async userAmmount() {
        const res = await fetch(`${this.url}/ammount`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: this.iToken
            }
        })
        if (res.ok) {
            await res.json();
            const sum = incomesService.incomeActual - expensesService.expenseActual;
            this.ammountActual = sum;
            return this.ammountActual - savingsService.savingActual;
        }
    }


    async username() {
        const res = await fetch(`${this.url}/getUsername`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: this.iToken
            }
        })
        if (res.ok) {
            const data = await res.json();
            return data.username

        }
    }

    async profile() {
        const res = await fetch(`${this.url}/getUsername`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: this.iToken
            }
        })
        if (res.ok) {
            const data = await res.json();
            return data

        }
    }


    async deleteAccount() {
        const res = await fetch(`${this.url}/deleteAccount`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                authorization: this.iToken
            },
        })
        if (res.ok) {
            return await res.json();
        }
        return false
    }



}