// usage: video is trds-video
// add lazy-src or lazy-poster for lazy resources
// dont need to add preload none as it will be automatically added to if there is a poster

import '../libs/wc-polyfill.js';
import TrdsElement from '../trds-element.js';

TrdsElement.addStyle(`
    video[is="trds-video"]{
        display: block;
        max-width: var(--element--max-width);
        width: 100%;
        height: auto;
        object-fit: contain;           
    }
`);

const TrdsVideoSrcIntersectionHandler = new IntersectionObserver(function(entries){
    entries.forEach(function(entry) {
        if(entry.isIntersecting){
            entry.target.loadVideo();
            TrdsVideoSrcIntersectionHandler.unobserve(entry.target);
        }
    });
}, {rootMargin: "0px 0px 200px 0px"});

const TrdsVideoPosterIntersectionHandler = new IntersectionObserver(function(entries){
    entries.forEach(function(entry) {
        if(entry.isIntersecting){
            entry.target.loadPoster();
            TrdsVideoPosterIntersectionHandler.unobserve(entry.target);
        }
    });
}, {rootMargin: "0px 0px 200px 0px"});

class TrdsVideo extends HTMLVideoElement{
    
    constructor(){ 
        super()

        this.rendered = false;

    }

    connectedCallback(){

        if(!this.rendered) this.render();

    }

    render = () => {

        if(this.hasAttribute('lazy-poster') || this.hasAttribute('poster'))
            this.setAttribute('preload', 'none');

        if(this.hasAttribute('lazy-src')) 
            TrdsVideoSrcIntersectionHandler.observe(this)

        if(this.hasAttribute('lazy-poster'))
            TrdsVideoPosterIntersectionHandler.observe(this);

        this.rendered = true;

    }

    loadPoster = () => this.poster = this.getAttribute('lazy-poster');
    loadVideo = () => this.src = this.getAttribute('lazy-src');

}

customElements.define('trds-video', TrdsVideo, {extends: 'video'});