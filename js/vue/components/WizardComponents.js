"use strict";

/*

Template value (`{value}`) based on:
https://vuejs.org/v2/guide/components.html#Reusing-Components

"(...) JavaScript’s template literal to make multi-line templates more readable. These are not supported by Internet Explorer (IE), so if you must support IE (...)"

*/

const WizardHeader = {
    template: `<div class="register-contest-container-form-header">
                   <h3>Create Contest</h3>
                   <h6>Please fill data on following three steps to create Your Contest.</h6>
               </div>`
}

const WizardNavigation = {
    template: `<div class="nav justify-content-end" id="register-contest-container-navigation" role="tablist">
                   <a class="btn btn-outline-primary nav-link active" href="#tab-pane-1" role="tab" aria-controls="tab-pane-1" aria-selected="false" data-step="1/3"></a>
                   <a class="btn btn-outline-primary nav-link next" href="#tab-pane-2" role="tab" aria-controls="tab-pane-2" aria-selected="false" data-step="2/3"></a>
                   <a class="btn btn-outline-primary nav-link" href="#tab-pane-3" role="tab" aria-controls="tab-pane-3" aria-selected="false" data-step="3/3"></a>

                   <button class="btn btn-primary nav-link" type="submit" data-create="Create"></button>
               </div>`
}

// TODO
const WizardTabContent = {
    components: {
        'wizard-navigation': WizardNavigation
    },
    template: `<div class="tab-content">
                   <div class="tab-pane fade active show" id="tab-pane-1">
                       <div class="form-group wld-required-checkbox-group" id="discipline">
                           <!-- TODO add 'wld' prefix for all custom css classes -->
                           <!-- TODO sort by: popularity, name etc. -->
                           <label>Discipline(s):</label>
                           <div class="form-row">
                               <div class="form-check form-check-inline input-box clearfix">
                                   <input class="form-check-input float-left" type="checkbox" name="discipline[]" id="squash" value="squash" required="required" />
                                   <label class="form-check-label input-box-checked" for="squash">
                                       Squash
                                   </label>
                                   <div class="invalid-feedback invalid-feedback-wld-source-message" data-wld-target-message="discipline[]-invalid-message">Choose one of available disciplines.</div>
                               </div>
                               <div class="form-check form-check-inline input-box clearfix">
                                   <input class="form-check-input float-left" type="checkbox" name="discipline[]" id="tennis" value="tennis" required="required" />
                                   <label class="form-check-label input-box-checked" for="tennis">
                                       Tennis
                                   </label>
                                   <div class="invalid-feedback invalid-feedback-wld-source-message" data-wld-target-message="discipline[]-invalid-message">Choose one of available disciplines.</div>
                               </div>
                               <div class="form-check form-check-inline input-box clearfix">
                                   <input class="form-check-input float-left" type="checkbox" name="discipline[]" id="badminton" value="badminton" required="required" />
                                   <label class="form-check-label input-box-checked" for="badminton">
                                       Badminton
                                   </label>
                                   <div class="invalid-feedback invalid-feedback-wld-source-message" data-wld-target-message="discipline[]-invalid-message">Choose one of available disciplines.</div>
                               </div>
                               <div class="form-check form-check-inline input-box clearfix">
                                   <input class="form-check-input float-left" type="checkbox" name="discipline[]" id="table-tennis" value="table-tennis" required="required" />
                                   <label class="form-check-label input-box-checked" for="table-tennis">
                                       Table tennis
                                   </label>
                                   <div class="invalid-feedback invalid-feedback-wld-source-message" data-wld-target-message="discipline[]-invalid-message">Choose one of available disciplines.</div>
                               </div>
                               <div class="form-check form-check-inline input-box input-box-disabled clearfix">
                                   <input class="form-check-input float-left" type="checkbox" name="discipline[]" id="running" value="running" disabled="disabled" />
                                   <label class="form-check-label input-box-checked" for="running">
                                       Running
                                   </label>
                               </div>
                           </div>
                           <div class="invalid-feedback invalid-feedback-wld-target-message" id="discipline[]-invalid-message" data-wld-acceptable-source-message-markers="3" data-wld-source-message-markers=""></div>
                       </div>

                       <div class="form-group" id="kind-contest">
                           <!-- TODO sort by: popularity, name etc. -->
                           <!-- TODO https://en.wikipedia.org/wiki/Tournament#Knockout_tournaments -->
                           <label>Kind of contest:</label>
                           <div class="form-row">
                               <div class="form-check form-check-inline input-box clearfix">
                                   <input class="form-check-input float-left" type="radio" name="kind-contest" id="cup-ladder" value="cup-ladder" required="required" />
                                   <label class="form-check-label input-box-checked" for="cup-ladder">
                                       Cup ladder
                                   </label>
                               </div>
                               <div class="form-check form-check-inline input-box clearfix">
                                   <input class="form-check-input float-left" type="radio" name="kind-contest" id="soviet-ladder" value="soviet-ladder" required="required" />
                                   <label class="form-check-label input-box-checked" for="soviet-ladder">
                                       Soviet ladder
                                   </label>
                               </div>
                               <div class="form-check form-check-inline input-box clearfix">
                                   <input class="form-check-input float-left" type="radio" name="kind-contest" id="brazilian-ladder" value="brazilian-ladder" required="required" />
                                   <label class="form-check-label input-box-checked" for="brazilian-ladder">
                                       Brazilian ladder
                                   </label>
                               </div>
                               <div class="form-check form-check-inline input-box clearfix">
                                   <input class="form-check-input float-left" type="radio" name="kind-contest" id="group" value="group" required="required" />
                                   <label class="form-check-label input-box-checked" for="group">
                                       Group
                                   </label>
                               </div>
                               <div class="form-check form-check-inline input-box clearfix">
                                   <input class="form-check-input float-left" type="radio" name="kind-contest" id="group-ladder" value="group-ladder" required="required" />
                                   <label class="form-check-label input-box-checked" for="group-ladder">
                                       Elimination Group + Cup ladder
                                   </label>
                                   <!-- Hook: the last one from radio group has invalid-feedback for required check -->
                                   <div class="invalid-feedback invalid-feedback-wld-source-message" data-wld-target-message="kind-contest-invalid-message">Choose one of available kind of contest.</div>
                               </div>
                           </div>
                           <div class="invalid-feedback invalid-feedback-wld-target-message" id="kind-contest-invalid-message" data-wld-acceptable-source-message-markers="0" data-wld-source-message-markers=""></div>
                       </div>
                   </div>

                   <div class="tab-pane fade" id="tab-pane-2">
                       <div class="form-group">
                           <label for="contest-name">Contest name:</label>
                           <input type="text" class="form-control" name="contest-name" id="contest-name" placeholder="Contest name" required="required" />
                           <div class="invalid-feedback">Only number and characters. Avaialble special characters: TODO <!-- add tooltip --></div>
                       </div>

                       <div class="form-group" id="contest-type">
                           <label>Contest type - indvidual | teams:</label>
                           <div class="form-row">
                               <div class="form-check col radio-icons text-center clearfix">
                                   <input class="form-check-input float-left" type="radio" name="contest-type" id="indvidual" value="indvidual" required="required" />
                                   <label class="form-check-label radio-icons-label individual" for="indvidual">&nbsp;</label><!-- nbsp is required to validation work properly -->
                               </div>
                               <div class="form-check col radio-icons text-center clearfix">
                                   <input class="form-check-input float-left" type="radio" name="contest-type" id="team" value="team" required="required"/>
                                   <label class="form-check-label radio-icons-label team" for="team">&nbsp;</label><!-- nbsp is required to validation work properly -->
                                   <div class="invalid-feedback invalid-feedback-wld-source-message" data-wld-target-message="contest-type-invalid-message">Choose one of available contest type.</div>
                               </div>
                           </div>
                           <div class="invalid-feedback invalid-feedback-wld-target-message" id="contest-type-invalid-message" data-wld-acceptable-source-message-markers="0" data-wld-source-message-markers=""></div>
                       </div>

                       <div class="form-group">
                           <label for="participants-teams">Participiants/Teams:</label>
                           <input type="number" class="form-control" name="participants-teams" id="participants-teams" placeholder="Number of participants/teams" min="2" max="512" required="required" />
                           <div class="invalid-feedback">
                               Min value is 2. Max value is 512. <!-- add tooltip -->
                           </div>
                       </div>
                   </div>

                   <div class="tab-pane fade" id="tab-pane-3">

                       <div class="form-group" id="repository">
                           <label>Repository:</label>
                           <div class="form-row">
                               <div class="form-check col radio-icons text-center clearfix">
                                   <input class="form-check-input float-left" type="radio" name="repository" id="repository-public" value="repository-public" required="required" />
                                   <label class="form-check-label radio-icons-label repository-public" for="repository-public">&nbsp;</label><!-- nbsp is required to validation work properly -->
                                   <div style="text-align: left;"> <!-- TODO add css class -->
                                       Contest will be available by generated unique link.  All data will be store on wu-contest-organizer Google Drive (Sheets).
                                   </div>
                               </div>
                               <div class="form-check col radio-icons text-center clearfix">
                                   <input class="form-check-input float-left" type="radio" name="repository" id="repository-private" value="repository-private" required="required" />
                                   <label class="form-check-label radio-icons-label repository-private" for="repository-private">&nbsp;</label><!-- nbsp is required to validation work properly -->
                                   <div style="text-align: left;"> <!-- TODO add css class -->
                                       Contest will be available by generated unique link.  All data will be store on Your Google Drive (Sheets) - login on google and accept to access will be necessary.
                                   </div>
                                   <!-- Hook: the last one from radio group has invalid-feedback for required check -->
                                   <div class="invalid-feedback invalid-feedback-wld-source-message" data-wld-target-message="repository-invalid-message">Choose one of available repository.</div>
                               </div>
                           </div>
                           <div class="invalid-feedback invalid-feedback-wld-target-message" id="repository-invalid-message" data-wld-acceptable-source-message-markers="0" data-wld-source-message-markers=""></div>
                       </div>

                       <div class="form-group custom-control custom-checkbox">
                           <input class="custom-control-input" type="checkbox" name="term-and-conditions" id="term-and-conditions" required="required" />
                           <label class="custom-control-label" for="term-and-conditions">
                               Agree to terms and conditions
                           </label>
                           <div class="invalid-feedback">
                               You must agree before submitting.
                           </div>
                       </div>
                   </div>

                  <wizard-navigation></wizard-navigation>

               </div>`
}

export { WizardHeader, WizardTabContent }