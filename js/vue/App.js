"use strict";

// TODO move to vendors
import Vue from 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.esm.browser.min.js'
import { MountedController } from "./MountedController.js";
import { WizardHeader, WizardTabContent } from "./components/WizardComponents.js";

class App {

    constructor() {
        this._renderView();
    }

    _renderView() {

        new Vue({
            el: '#vue-register-contest',
            data: {

            },

            components: {
                'wizard-header': WizardHeader,
                'wizard-tab-content': WizardTabContent,
            },

            beforeCreate() {

            },

            mounted() {
                new MountedController();
            },

            methods: {

            },

        });
    }
}

export { App }