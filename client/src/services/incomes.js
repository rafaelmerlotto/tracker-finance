import { authService } from ".";


export class IncomesService {

    iIncomeId;

    constructor(url, incomeActual) {
        this.url = url;
        this.incomeActual = incomeActual
    }

    get incomeId(){
        return this.iIncomeId
    }

    async createIncomes(name, ammount) {
        const res = await fetch(`${this.url}/create`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: authService.iToken
            },
            body: JSON.stringify(name, ammount)
        })
        if (res.ok) {
            return await res.json();
        }
        return false
    }

    async incomes() {
        const res = await fetch(`${this.url}/incomes/user`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                authorization: authService.iToken
            },
        })
        if (res.ok) {
            const data = await res.json();
           
            return data
        }
        return false
    }

    async allIncomes() {
        const res = await fetch(`${this.url}/allIncomes/user`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                authorization: authService.iToken
            },
        })
        if (res.ok) {
            const data = await res.json();
           
            return data
        }
        return false
    }

    async getIncomeId() {
        const res = await fetch(`${this.url}/getIncomeId`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                authorization: authService.iToken
            },
        })
        if (res.ok) {
            const data = await res.json();
            return data
        }
        return false
    }

    async getIncomes() {
        const res = await fetch(`${this.url}/getAmmount`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                authorization: authService.iToken
            },
        })
        if (res.ok) {
            const data = await res.json();

            return data
        }
        return false
    }

    async deleteIncome(id) {
        const res = await fetch(`${this.url}/deleteIncome/${id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                authorization: authService.iToken
            },
        })
        if (res.ok) {
            const data = await res.json();
            console.log(data)
            return data
        }
        return false
    }

}