const loadComponent = function() {
    class <%= camelCaseName %> extends HTMLElement {

        constructor() {
            super();
            // get properties here
        }

        connectedCallback() {
            // do stuff here
        }

        attributeChangedCallback(attrName, oldVal, newVal) {}

    }
    customElements.define('<%= name %>', <%= camelCaseName %>);
};

// Conditional loading of polyfill
if (window.customElements) {
    loadComponent();
} else {
    document.addEventListener('WebComponentsReady', function() {
        loadComponent();
    });
}
