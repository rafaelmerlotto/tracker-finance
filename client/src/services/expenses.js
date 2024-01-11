import { authService } from ".";


export class ExpensesService {


    constructor(url, expenseActual) {
        this.url = url;
        this.expenseActual = expenseActual
    }

    async createExpenses(name, ammount) {
        const res = await fetch(`${this.url}/create`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: authService.iToken
            },
            body: JSON.stringify(name,ammount)
        })
        if (res.ok) {
          return  await res.json();
        }
        return false
    }

    async expenses(){
        const res = await fetch(`${this.url}/expenses/user`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                authorization: authService.iToken
            },
        })
        if (res.ok) {
          const data = await res.json();
          console.log( data)
          return data
        }
        return false
    }


    async getExpenses() {
        const res = await fetch(`${this.url}/getExpenses`, {
            method: 'GET',
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