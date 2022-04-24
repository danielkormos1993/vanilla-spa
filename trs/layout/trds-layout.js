// usage
// for page content, use the <main> element
// for sections, use the <trds-section> element

import TrdsElement from "../trds-element.js";
import './trds-section.js';

TrdsElement.addStyle(`

    body{
        box-sizing: border-box;
        display: grid;
        grid-template-rows: 1fr auto;
        min-height: 100vh;
        margin: 0;
        padding: 0;
    }

    main{
        display: flex;
        flex-direction: column;
    }

    body[view-is-loading=true]{
        position: fixed;
        overflow: hidden;
        height: 100vh;
        width: 100vw;
        visibility: hidden;        
    }

    

    body[has-trs-layout=true][trs-layout-is-loading=true],
    body[trs-view-is-loading=true][has-trs-layout=false],
    body[has-trs-layout=true][trs-view-is-loading=true] main{

        position: fixed;
        overflow: hidden;
        height: 100vh;
        width: 100vw;
        visibility: hidden;        

    }

    body[has-trs-layout=true][trs-view-is-loading=true] main{
        position: relative;
    }

    body[has-trs-layout=true][trs-layout-is-loading=true]:before,
    body[trs-view-is-loading=true][has-trs-layout=false]:before,
    body[has-trs-layout=true][trs-view-is-loading=true] main:before{
        content: '';
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color:var(--color--primary-bg);

    }

    body[has-trs-layout=true][trs-layout-is-loading=true]:after,
    body[trs-view-is-loading=true][has-trs-layout=false]:after,
    body[has-trs-layout=true][trs-view-is-loading=true] main:after{

        content: '';
        display: block;
        width: 1.5em;
        height: 1.5em;
        color: var(--color--primary);
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        border: .2em solid transparent;
        border-top: .2em solid currentColor;
        border-radius: 50%;
        animation: spin 2s linear infinite;
        visibility: visible;     

    }
    
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    body.loading trds-loader{
        visibility: hidden !important;
    }

`);