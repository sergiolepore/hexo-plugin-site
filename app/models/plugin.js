import DS from 'ember-data';
import semver from 'semver';

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
  installations: DS.hasMany('plugininstallation'),
  installationCount: DS.attr('number'),

  hexoVersionSupport: function() {
    var latestVersion = this.get('versions').reduce(function(a,b) {
      // filter all plugin versions to get the latest
      if (!a) {
        return b;
      }

      return semver.gte(a.get('number'), b.get('number'))? a : b;
    });

    var hexoVersion = latestVersion.get('hexoVersion');

    return hexoVersion? hexoVersion : 'N/D';
  }.property('versions.@each'),

});

export default Plugin;
