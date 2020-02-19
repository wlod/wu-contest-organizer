(function() {

    const tabPanePrefix = '#tab-pane-';
    const lastTabPaneHash = tabPanePrefix + '3'; // TODO policz na podstawie formularza
    const form = $('#register-contest-container-form');
    var currentHash = tabPanePrefix + '1'; // TODO policz na podstawie formularza
    var lastClickOnNavigationTabId = currentHash;

    {
        window.location.hash = currentHash;
    };

    $(window).on('hashchange', function() {
        if(lastClickOnNavigationTabId !== location.hash) {
            const currentHashId = currentHash.substring(tabPanePrefix.length);
            const locationHashId = location.hash.substring(tabPanePrefix.length);

            $('#register-contest-container-navigation').find('a[href="' + tabPanePrefix + locationHashId + '"]').click();

            if(locationHashId > currentHashId && form.isFormValidate(currentHash) === true) {
                currentHash = tabPanePrefix + locationHashId;
            }

            location.hash = currentHash;
        }
    });

    $(window).on('beforeunload', function(){
          if(typeof currentHash !== "undefined" && currentHash.substring(tabPanePrefix.length) !== lastClickOnNavigationTabId) {
               return 'Are you sure you want to leave?';
          }
    })

    $('#register-contest-container-navigation a, #register-contest-container-navigation button').on('click', function (e) {
        try {
            lastClickOnNavigationTabId = $(this).attr('href');

            if($(this).hasClass('next')) {
                const tabIdToValidate = $(this).prev().attr('aria-controls');

                if(form.isFormValidate('#' + tabIdToValidate) === false) {
                    event.preventDefault();
                    event.stopPropagation();
                    return;
                }
            }

            $(this).tab('show');
            $(this).removeClass('prev next');
            $(this).prev().prev().removeClass('prev');
            $(this).next().next().removeClass('next');
            $(this).prev().addClass('prev');
            $(this).next().addClass('next');

            currentHash =  $(this).attr('href');
        } catch(e) {
            console.log(e);
        }
    });

    $('#register-contest-container-form').submit(function(e) {

        e.preventDefault();
        sessionStorage['register-contest-container-form-data'] =  $("#register-contest-container-form").serialize();

        // TODO + browser history back
        const registerContestContainerFormData = sessionStorage['register-contest-container-form-data'];
        if (typeof registerContestContainerFormData !== "undefined") {
            $('#manage-contest-container').text( registerContestContainerFormData );
            $('#register-contest-container-form').hide();
            window.location.hash = "manage";
        }


    });

})();