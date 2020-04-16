"use strict";

// TODO - functionality should be split
class WizardBindAction {

    constructor() {
       this.bindView();
    }

    bindView() {

        const tabCount = $('#register-contest-container-form').find('div.tab-content div.tab-pane').length;
        const tabPanePrefix = '#tab-pane-';
        const lastTabPaneHash = tabPanePrefix + tabCount;
        const form = $('#register-contest-container-form');
        const manageHash = "#manage";
        var currentHash = '#' + $('#register-contest-container-form').find('div.tab-content div.tab-pane')[0].id;
        var lastClickOnNavigationTabId = currentHash;
        // TODO hashchange
        var lastURL = document.URL;

        window.location.hash = currentHash;
        $('#manage-contest-container').hide();

        $(window).on('hashchange', function(event) {
            // TODO hashchange
            // https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onhashchange
            Object.defineProperty(event, "oldURL", {enumerable:true,configurable:true,value:lastURL});
            Object.defineProperty(event, "newURL", {enumerable:true,configurable:true,value:document.URL});
            lastURL = document.URL;

            if(event.oldURL.includes(manageHash)) {
                $('#register-contest-container-form').show();
                $('#manage-contest-container').hide();
                return;
            }

            if(lastClickOnNavigationTabId !== location.hash) {
                const currentHashId = currentHash.substring(tabPanePrefix.length);
                const locationHashId = location.hash.substring(tabPanePrefix.length);

                $('#register-contest-container-navigation').find('a[href="' + tabPanePrefix + locationHashId + '"]').click();

                if(locationHashId > currentHashId && form.isFormValidate(currentHash) === true) {
                    currentHash = tabPanePrefix + locationHashId;
                }

                location.hash = currentHash;

                return;
            }
        });

        $(window).on('beforeunload', function(e){
              if(typeof currentHash !== "undefined" && currentHash.substring(tabPanePrefix.length) !== lastClickOnNavigationTabId) {
                    // If user cancel and return to process sessionStorage will be rebuilt after click [next] or [prev] buttons - Wizard is SPA
                    sessionStorage.removeItem('register-contest-container-form-data');
                    return 'Are you sure you want to leave?';
              }
        })

        $('#register-contest-container-navigation a, #register-contest-container-navigation button').on('click', function (e) {
            try {
                lastClickOnNavigationTabId = $(this).attr('href');
                // [next] & [prev] buttons should save form data
                sessionStorage['register-contest-container-form-data'] =  btoa($("#register-contest-container-form").serialize());

                if($(this).hasClass('next')) {
                    const tabIdToValidate = $(this).prev().attr('aria-controls');

                    if(form.isFormValidate('#' + tabIdToValidate) === false) {
                        event.preventDefault();
                        event.stopPropagation();
                        return;
                    }
                }

                if(typeof $(this).attr('href') !== "undefined") {
                    $(this).tab('show');
                    $(this).removeClass('prev next');
                    $(this).prev().prev().removeClass('prev');
                    $(this).next().next().removeClass('next');
                    $(this).prev().addClass('prev');
                    $(this).next().addClass('next');
                    currentHash = $(this).attr('href');
                } else {
                    currentHash = manageHash;
                }

            } catch(e) {
                console.log(e);
            }
        });

        $('#register-contest-container-form').submit(function(e) {

            e.preventDefault();

            // TODO - move to another "controller"
            const registerContestContainerFormData = sessionStorage['register-contest-container-form-data'];
            if (typeof registerContestContainerFormData !== "undefined") {
                $('#register-contest-container-form').hide();
                $('#manage-contest-container').text( atob(registerContestContainerFormData) );
                $('#manage-contest-container').show();
                location.hash = (manageHash);
            }
        });

    }

}

export { WizardBindAction }