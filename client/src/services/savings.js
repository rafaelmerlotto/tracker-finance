import { authService } from ".";


export class SavingsService {


    iSavingId

    constructor(url, savingActual){
        this.url = url
        this.savingActual = savingActual
    }

    get savingId(){
        return this.iSavingId
    }

    async createSavings( ammount) {
        const res = await fetch(`${this.url}/create`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: authService.iToken
            },
            body: JSON.stringify( ammount)
        })
        if (res.ok) {
            return await res.json();
        }
        return false
    }

    async allSavings() {
        const res = await fetch(`${this.url}/allSavings/user`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                authorization: authService.iToken
            },
        })
        if (res.ok) {
            return  await res.json();  
        }
        return false
    }

    async getSavings() {
        const res = await fetch(`${this.url}/getSavings`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                authorization: authService.iToken
            },
        })
        if (res.ok) {
            return  await res.json();  
        }
        return false
    }

    async getSavingId() {
        const res = await fetch(`${this.url}/getSavingId`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                authorization: authService.iToken
            },
        })
        if (res.ok) {
            return  await res.json();  
        }
        return false
    }


    async deleteSaving(id) {
        const res = await fetch(`${this.url}/deleteSaving/${id}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                authorization: authService.iToken
            },
        })
        if (res.ok) {
            return  await res.json();  
        }
        return false
    }
}