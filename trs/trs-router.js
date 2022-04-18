export default class TrsRouter{

    constructor(routes){

        this.routes = routes;
        this.currentLayout = null;

        window.addEventListener('popstate', this.run);

        document.body.addEventListener('click', e => {

            const isTrsLink = e.target.closest("[trs-link]");

            if(isTrsLink){
                e.preventDefault();
                this.navigateTo(isTrsLink.href);
            }

        });

        this.run = () => {

            const pathToRegex = path => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

            const getParams = currentRoute => {

                const keys = Array.from(currentRoute.path.matchAll(/:(\w+)/g)).map(result => result[1]);
                const values = location.pathname.match(pathToRegex(currentRoute.path)).slice(1);

                return Object.fromEntries(keys.map((key, i) => {
                    return [key, values[i]];
                }));

            }

            let currentRoute = this.routes.find(route => {
                return location.pathname.match(pathToRegex(route.path));
            });

            if(!currentRoute){
                alert('Nincs ilyen oldal! Visszairányítunk a főoldalra.');
                return this.navigateTo(this.routes[0].path);
            }

            window.params = getParams(currentRoute);

            // render
            if(currentRoute.layoutComponent){

                document.body.classList.add('has-layout');

                if(currentRoute.layoutComponent === this.currentLayout){

                    document.body.classList.add('component-loading');

                    currentRoute.component().then(module => { 
                        document.getElementById('layout-target').replaceChildren(module.default);
                        document.body.classList.remove('component-loading');
                    });

                }

                else{

                    document.body.classList.add('layout-loading');
                    document.body.classList.add('component-loading');

                    currentRoute.layoutComponent().then(module => { 
                        document.body.replaceChildren(module.default);
                        document.body.classList.remove('layout-loading');
                        this.currentLayout = module.default;
                        currentRoute.component().then(module => { 
                            document.getElementById('layout-target').replaceChildren(module.default);
                            document.body.classList.remove('component-loading');
                        });
                    });

                }

            }

            else{

                document.body.classList.remove('has-layout');
                this.currentLayout = null;

                document.body.classList.add('component-loading');

                currentRoute.component().then(module => { 
                    document.body.replaceChildren(module.default);
                    document.body.classList.remove('component-loading');
                });

            }

        }

        this.navigateTo = url => {
            history.pushState(null, null, url);
            this.run();
        }

    }

}

export class TrsRouterComponent extends HTMLElement{

    constructor(){
        super()
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