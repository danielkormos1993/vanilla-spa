// TRS-SPA DOCUMENTATION
// ----------------------
// TRS-SPA is a single page application framework. It has a spa router, view engine and a layout engine.

// TrsRouter class is a single page app router built with vanilla javascript. To initialize router, routes need to be passed.
// A route has a path property(obvious), a view property, and a layout property. view and layout property must have a dynamic import function for lazy loading behaviour(best practice). Example: view: () => import('/views/Home.js')

// A view file needs to follow these guidelines:
// - Import TrsView class from the router file
// - Extend that class(its a html element class)
// - In the constructor, populate the element.
// - In connectedCallback, there are various methods you can use when a view is reattached to the dom. eg.: title, description, etc.
// - at the end of the file define the custom element, and export a created instance of that web component.

// A layout file works the same, but you have to import TrsLayout class instead. In a layout component <layout-target> element must be present where the view gets rendered.

// Some things to notice, what happens under the hood:
// - these view and layout elements has a display: contents css property, so they are not omitted to the dom, therefore cant be styled, but wont mess with your styling.
// - The body element will have the following attributes based on the state of the spa(so loading screens can be made easily)(true or false):
//     - has-trs-layout
//     - trs-view-is-loading
//     - trs-layout-is-loading

// For internal links trs-link attribute must be present. That way, the page wont reload, it will use the spa router to navigate.

export class TrsRouter{

    constructor(routes){

        window.router = this;

        this.routes = routes;
        this.layout = null;
        this.params = {};

        window.addEventListener('popstate', () => {
            this.run();
        });

        window.addEventListener('click', e => {

            const TrsLink = e.target.closest("[trs-link]");

            if(TrsLink){
                e.preventDefault();
                this.navigateTo(TrsLink.href);
            }

        });

    }

    run(){

        const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

        const getParams = currentRoute => {

            const keys = Array.from(currentRoute.path.matchAll(/:(\w+)/g)).map(result => result[1]);
            const values = location.pathname.match(pathToRegex(currentRoute.path)).slice(1);

            return Object.fromEntries(keys.map((key, i) => {
                return [key, values[i]];
            }));

        }

        this.currentRoute = this.routes.find(route => {
            return location.pathname.match(pathToRegex(route.path));
        });

        if(!this.currentRoute){
            alert('Nincs ilyen oldal! Visszairányítunk a főoldalra.');
            return this.navigateTo(this.routes[0].path);
        }

        this.params = getParams(this.currentRoute);

        this.render();

    }

    navigateTo(url){
        if(url === history.state) return;
        history.pushState(url, '', url);
        this.run();
    }

    async render(){

        document.body.setAttribute('trs-view-is-loading', true);

        if(this.currentRoute.layout){

            document.body.setAttribute('has-trs-layout', true);

            if(this.currentRoute.layout.toString() != this.layout){

                document.body.setAttribute('trs-layout-is-loading', true);
                const Layout = await this.currentRoute.layout();
                document.body.replaceChildren(Layout.default);
                document.body.setAttribute('trs-layout-is-loading', false);
                this.layout = this.currentRoute.layout.toString();

            }

            const View = await this.currentRoute.view();
            document.querySelector('layout-target').replaceChildren(View.default);

        }

        else{

            document.body.setAttribute('has-trs-layout', false);
            this.layout = null;

            const View = await this.currentRoute.view();
            document.body.replaceChildren(View.default);

        }

        document.body.setAttribute('trs-view-is-loading', false);

    }

}

export class TrsView extends HTMLElement{

    constructor(){
        super();
        this.classList.add('trs-view');
    }

    set title(title){
        this.titleValue = title;
        document.title = title;
    }

    get title(){
        return this.titleValue;
    }

    set description(description){

        this.descriptionValue = description;
        let descriptionTag = document.querySelector("meta[name=description]");

        if(descriptionTag) descriptionTag.setAttribute('content', description);
        else{

            descriptionTag = document.createElement('meta');
            descriptionTag.setAttribute('name', 'description');
            descriptionTag.setAttribute('content', description);
            document.head.appendChild(descriptionTag);

        }

    }

    get description(){
        return this.descriptionValue;
    }

}

export class TrsLayout extends HTMLElement{

    constructor(){
        super();
        this.classList.add('trs-layout');
    }

}

const TrsSpaStyle = document.createElement('style');
TrsSpaStyle.id = 'trs-spa-style';
TrsSpaStyle.textContent = `
    .trs-view, .trs-layout, layout-target{
        display: contents;
    }
`;
document.head.appendChild(TrsSpaStyle);