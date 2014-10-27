import DS     from 'ember-data';
import Ember  from 'ember';

var Plugin = DS.Model.extend({
  name              : DS.attr('string'),
  packageName       : DS.attr('string'),
  description       : DS.attr('string'),
  readme            : DS.attr('string'),
  repositoryUrl     : DS.attr('string'),
  website           : DS.attr('string'),
  lastModified      : DS.attr('date'),
  lastVersion       : DS.attr('string'),
  user              : DS.belongsTo('user'),
  keywords          : DS.hasMany('keyword'),
  keywordCache      : DS.attr('string'),
  versions          : DS.hasMany('pluginversion', { async: true }),
  installations     : DS.hasMany('plugininstallation', { async: true }),
  installationCount : DS.attr('number'),
  hpmMeta           : DS.hasOneFragment('hpmmeta'),

  hexoVersionSupport: function() {
    var hpmMeta     = this.get('hpmMeta');
    var hexoVersion = null;

    if (!Ember.isEmpty(hpmMeta)) {
      hexoVersion = hpmMeta.get('hexoVersion');
    }

    return hexoVersion? hexoVersion : 'N/D';
  }.property('hpmMeta'),

  npmUrl: function() {
    var packageName = this.get('packageName');

    return 'https://npmjs.org/package/%packageName%'.replace('%packageName%', packageName);
  }.property('packageName'),

});

export default Plugin;
