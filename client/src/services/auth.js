import { expensesService, incomesService } from ".";


export class AuthService  {

    iToken;
   

    constructor(url, message, ammountActual) {
        this.url = url
        this.message = message
     
        

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
            body: JSON.stringify( email, password, fullName)
        })
        if (res.ok) {
            return await res.json();
        }
    }

    async userAmmount(){
        const res = await fetch(`${this.url}/ammount`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                authorization: this.iToken
            }       
        })
        if (res.ok) {
           const data = await res.json();
         
           const sum = incomesService.incomeActual - expensesService.expenseActual;
           console.log(sum)
          return   this.ammountActual = sum;
          
        }
    }

}