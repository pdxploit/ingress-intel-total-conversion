// PLUGIN HOOKS ////////////////////////////////////////////////////////
// Plugins may listen to any number of events by specifying the name of
// the event to listen to and handing a function that should be exe-
// cuted when an event occurs. Callbacks will receive additional data
// the event created as their first parameter. The value is always a
// hash that contains more details.
//
// For example, this line will listen for portals to be added and print
// the data generated by the event to the console:
// window.addHook('portalAdded', function(data) { console.log(data) });
//
// Boot hook: booting is handled differently because IITC may not yet
//            be available. Have a look at the plugins in plugins/. All
//            code before “// PLUGIN START” and after “// PLUGIN END” os
//            required to successfully boot the plugin.
//
// Here’s more specific information about each event:
// portalAdded: called when a portal has been received and is about to
//              be added to its layer group. Note that this does NOT
//              mean it is already visible or will be, shortly after.
//              If a portal is added to a hidden layer it may never be
//              shown at all. Injection point is in
//              code/map_data.js#renderPortal near the end. Will hand
//              the Leaflet CircleMarker for the portal in "portal" var.
// portalDetailsUpdated: fired after the details in the sidebar have
//              been (re-)rendered. Provides data about the portal that
//              has been selected.

window._hooks = {}
window.VALID_HOOKS = ['portalAdded', 'portalDetailsUpdated'];

window.runHooks = function(event, data) {
  if(VALID_HOOKS.indexOf(event) === -1) throw('Unknown event type: ' + event);

  if(!_hooks[event]) return;
  $.each(_hooks[event], function(ind, callback) {
    callback(data);
  });
}


window.addHook = function(event, callback) {
  if(VALID_HOOKS.indexOf(event) === -1) throw('Unknown event type: ' + event);
  if(typeof callback !== 'function') throw('Callback must be a function.');

  if(!_hooks[event])
    _hooks[event] = [callback];
  else
    _hooks[event].push(callback);
}
