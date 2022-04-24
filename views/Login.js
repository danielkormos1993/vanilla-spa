import { TrsView } from "../trs-spa.js";

class Login extends TrsView{

    constructor(){
        super();

        this.innerHTML = `
            <h1>Login</h1>
            <a href="/" trs-link>back to home</a>
        `;

    }

    connectedCallback(){

        this.title = 'Login';
        this.description = 'Login';

    }

}

customElements.define('login-view', Login);

export default new Login();