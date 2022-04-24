import { TrsView } from "../trs-spa.js";

class Dashboard extends TrsView{

    constructor(){
        super();

        this.innerHTML = `
            <h1>Dashboard</h1>
        `;

    }

    connectedCallback(){

        this.title = 'Dashboard';
        this.description = 'Dashboard';

    }

}

customElements.define('dashboard-view', Dashboard);

export default new Dashboard();