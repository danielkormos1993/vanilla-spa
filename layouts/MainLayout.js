import { TrsRouterComponent } from "../trs/trs-router.js";

class MainLayout extends TrsRouterComponent{

    constructor(){
        super();

        this.innerHTML = `
            <nav>
                <a trs-link href="/">Homepage</a>
                <a trs-link href="/dashboard">Dashboard</a>
                <a trs-link href="/contact">Contact</a>
            </nav>
            <div id="layout-target"></div>
        `;
    }

}

customElements.define('main-layout', MainLayout);

export default new MainLayout();