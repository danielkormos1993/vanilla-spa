import { TrsRouterComponent } from "../trs/trs-router.js";

class DashboardPage extends TrsRouterComponent{

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

customElements.define('dashboard-page', DashboardPage);

export default new DashboardPage();