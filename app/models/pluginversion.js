import DS from 'ember-data';

var PluginVersion = DS.Model.extend({
  number: DS.attr('string'),
  time: DS.attr('date'),
  hexoVersion: DS.attr('string'),
  plugin: DS.belongsTo('plugin')
});

export default PluginVersion;
