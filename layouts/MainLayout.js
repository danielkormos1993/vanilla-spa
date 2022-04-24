import { TrsLayout } from "../trs-spa.js";

import '../trs/layout/trds-stack.js';
import '../trs/components/trds-header.js';
import '../trs/elements/trds-link.js';
import '../trs/components/trds-footer.js';
import '../trs/typhography/trds-text.js';

class MainLayout extends TrsLayout{

    constructor(){
        super()

        this.innerHTML = `
            <style>
                trds-header a[is=trds-link].text{
                    text-decoration: none;
                    font-size: var(--size--xs);
                    text-transform: uppercase;
                    font-weight: bold;
                    color: var(--color--secondary-text);
                }
            </style>
            <trds-header logo-src="/media/images/logo544x170.png">
                <a 
                    is="trds-link"
                    class="text"
                    href="javascript:void(0)"
                    onclick="document.getElementById('fontosinfo').show()">
                    Fontos információ
                </a>
                <a trs-link is="trds-link" class="text" href="/jegkarjavitas">Jégkár javítás</a>
                <a trs-link is="trds-link" class="text" href="/horpadasjavitas">Horpadás javítás</a>
                <a trs-link is="trds-link" class="text" href="/pdrtechnologia">A technológia</a>
                <a trs-link is="trds-link" class="text" href="/munkaink">Munkáink</a>
                <a trs-link is="trds-link" class="text" href="/rolunk">Rólunk</a>
                <a trs-link is="trds-link" class="text" href="/gyik">Gyakran ismételt kérdések</a>
                <a trs-link is="trds-link" class="text" href="/kapcsolat">Kapcsolat</a>
            </trds-header>
            <main>
                <layout-target></layout-target>
            </main>
            <trds-footer>
                <trds-stack style="text-align: center;justify-items: center;">
                    <span style="color: var(--color--secondary-text);">${new Date().getFullYear()} © TOP REPAIR</span>
                    <a is="trds-link" class="text" href="/adatvedelem">Adatvédelmi tájékoztató</a>
                </trds-stack>
            </trds-footer>
        `;
    }

}

customElements.define('main-layout', MainLayout);

export default new MainLayout();