'use strict';


const dataWldSourceMessageMarkersDelimiter = ";"

jQuery.fn.extend({
    // refactor: too much responsibility: update DOM and check vali
    validateWldTargetMessage: function () {
        const invalidFeedbackSourceMessageInputId = $(this).closest( "div.form-check" ).find("input.form-check-input").attr('id');
        // selector to support special characters in id attribute e.g.: '[', ']' -> id="discipline[]-invalid-message".
        const invalidFeedbackTargetMessage = $( '[id="' + $(this).attr('data-wld-target-message') + '"]');
        const invalidFeedbackTargetMessageAcceptableSourceMessageMarkers = invalidFeedbackTargetMessage.attr("data-wld-acceptable-source-message-markers" );

        let dataWldSourceMessageMarkers = invalidFeedbackTargetMessage.attr("data-wld-source-message-markers" );

        // remove current element from markers and potential duplicates
        dataWldSourceMessageMarkers = dataWldSourceMessageMarkers.replace(dataWldSourceMessageMarkersDelimiter + invalidFeedbackSourceMessageInputId + dataWldSourceMessageMarkersDelimiter, "");
        invalidFeedbackTargetMessage.css('display', 'none');

        if( $(this).is(":visible") === true ) {
            dataWldSourceMessageMarkers += (dataWldSourceMessageMarkersDelimiter + invalidFeedbackSourceMessageInputId + dataWldSourceMessageMarkersDelimiter);
        }

        // 2* - because, two dataWldSourceMessageMarkersDelimiter was added to one marker
        let isInvalid = dataWldSourceMessageMarkers.count(dataWldSourceMessageMarkersDelimiter) > (2 * invalidFeedbackTargetMessageAcceptableSourceMessageMarkers);

        if(isInvalid) {
            invalidFeedbackTargetMessage.css('display', 'block');
            invalidFeedbackTargetMessage.text( $(this).text() );
        }

        invalidFeedbackTargetMessage.attr("data-wld-source-message-markers" , dataWldSourceMessageMarkers);

        return !isInvalid;
    },

    isFormValidate: function(tabJQueryIdToValidate) {
        if($(this).length > 1) {
            console.err($(this));
            throw "Only one form can be validate!";
        }

        const tabToValidate = $(tabJQueryIdToValidate);

        // should be set before checkValidity()
        tabToValidate.addClass('was-validated');

        // jQuery for $('#register-contest-container-form') return object array.
        if ($(this)[0].checkValidity() === true) {
            return true;
        }

        const invalidFeedbackMessages = tabToValidate.find('.invalid-feedback.invalid-feedback-wld-source-message');

        if (invalidFeedbackMessages.length > 0) {

            // if none exist any elements, use the result of global validation
            let innerValidated = true;

            invalidFeedbackMessages.each(function(i) {
                const that = this;
                $(this).parent()
                        .parent()
                        .change(function(i) {
                            innerValidated = $(that).validateWldTargetMessage() === false ? false : innerValidated;
                        });
                innerValidated = $(that).validateWldTargetMessage() === false ? false : innerValidated;
            });
        }

        // check custom feedback messages
        let invalidFeedbackTargetMessages = tabToValidate.find('.invalid-feedback.invalid-feedback-wld-target-message')
                                                         .filter(function(){
            return $(this).attr('style') === 'display: block;';
        });

        // if custom feedback messages length is empty then check framework
        if(invalidFeedbackTargetMessages.length === 0) {
            invalidFeedbackTargetMessages = tabToValidate.find('div[class^="invalid-feedback"]:not(.invalid-feedback-wld-target-message, .invalid-feedback.invalid-feedback-wld-source-message)')
                                                         .filter(function(){
                return $(this).css('display') === 'block';
            });
        }

        return invalidFeedbackTargetMessages.length < 1;
    },

});