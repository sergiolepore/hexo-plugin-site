import DS from 'ember-data';

var Plugin = DS.Model.extend({
  name: DS.attr('string'),
  packageName: DS.attr('string'),
  description: DS.attr('string'),
  readme: DS.attr('string'),
  repositoryUrl: DS.attr('string'),
  website: DS.attr('string'),
  lastModified: DS.attr('date'),
  lastVersion: DS.attr('string'),
  user: DS.belongsTo('user'),
  keywords: DS.hasMany('keyword'),
  keywordCache: DS.attr('string'),
  versions: DS.hasMany('pluginversion'),
  installations: DS.hasMany('plugininstallation')
});

export default Plugin;
