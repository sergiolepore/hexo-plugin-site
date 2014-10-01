import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  host: window.HexoPluginSite.APP.apiHost,
  namespace: '/v1'
});
