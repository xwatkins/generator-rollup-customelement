var loadComponent = function() {
    class <%= camelCaseName %> extends HTMLElement {

        constructor() {
            super();
            console.log('The owls are not what they seem.');
        }

        connectedCallback() {
            console.log('We are connected. Time for a damn fine cup of coffee.')
        }

        attributeChangedCallback(attrName, oldVal, newVal) {}

    }
    customElements.define('<%= name %>', <%= camelCaseName %>);
}

// Conditional loading of polyfill
if (window.customElements) {
    loadComponent();
} else {
    document.addEventListener('WebComponentsReady', function() {
        loadComponent();
    });
}