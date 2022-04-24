import { TrsView } from "../trs-spa.js";

class Home extends TrsView{

    constructor(){
        super();

        this.innerHTML = `
            <main>
                <trds-section
                    class="bg-image"
                    style="
                        --bg-image-src: url('/media/images/backgrounds/herobg.webp');
                        background-position:85% center;
                        --bg-image-overlay: rgb(75,75,75)">
                    <trds-stack style="gap:var(--space--s)">
                        <trds-title style="max-width: 30rem">Jégkár és horpadás javítás mesterfokon.</trds-title>
                        <p style="color:var(--color--secondary-text); margin-bottom: var(--space--s); max-width: 27rem;">A gyárban kapott fényezés egyszeri és pótolhatatlan. Mi ennek megtartásával javítjuk a horpadásokat.</p>
                        <a is="trds-button--link" class="call" number="+36 70 593 9393"></a>
                    </trds-stack>
                </trds-section>
            </main>
        `;
    }

    connectedCallback(){

        this.title = 'Homepage';
        this.description = 'Homepage description';

    }

}

customElements.define('home-view', Home);

export default new Home();