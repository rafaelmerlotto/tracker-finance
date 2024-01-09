

export class AuthService  {

    iToken;
   

    constructor(url, message) {
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


    async registerUser(firstName, surName, email, password, birthDate) {
        const res = await fetch(`${this.url}/register`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify(firstName, surName, email, password, birthDate)
        })
        if (res.ok) {
            return await res.json();
        }
    }

}