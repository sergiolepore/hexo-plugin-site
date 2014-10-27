import DS from 'ember-data';

var PluginInstallation = DS.Model.extend({
  platform  : DS.attr('string'),
  plugin    : DS.belongsTo('plugin')
});

export default PluginInstallation;
