import { TrsRouterComponent } from "../trs/trs-router.js";

class ContactPage extends TrsRouterComponent{

    constructor(){
        super();

        this.innerHTML = `
            <h1>Contact</h1>
        `;

    }

    connectedCallback(){

        this.title = 'Contact';
        this.description = 'lol this is contact';

    }

}

customElements.define('contact-page', ContactPage);

export default new ContactPage();