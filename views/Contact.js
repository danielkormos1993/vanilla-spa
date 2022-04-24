import { TrsView } from "../trs-spa.js";

class Contact extends TrsView{

    constructor(){
        super();

        this.innerHTML = `
            <h1 style="height:5000px">Contact</h1>
        `;

    }

    connectedCallback(){

        this.title = 'Contact';
        this.description = 'lol this is contact';

    }

}

customElements.define('contact-view', Contact);

export default new Contact();