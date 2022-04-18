import { TrsRouterComponent } from "../trs/trs-router.js";

class HomePage extends TrsRouterComponent{

    constructor(){
        super();

        this.innerHTML = `
            <h1>Homepage</h1>
        `;
    }

    connectedCallback(){

        this.title = 'Homepage';
        this.description = 'Homepage description';

    }

}

customElements.define('home-page', HomePage);

export default new HomePage();