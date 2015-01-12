import DS     from 'ember-data';
import Ember  from 'ember';

export default DS.Model.extend({
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
  hpmmetadata       : DS.hasOneFragment('hpmmetadata'),

  hexoVersionSupport: function() {
    let hpmMetadata = this.get('hpmmetadata');
    let hexoVersion = null;

    if (!Ember.isEmpty(hpmMetadata)) {
      hexoVersion = hpmMetadata.get('hexoVersion');
    }

    return hexoVersion? hexoVersion : 'N/D';
  }.property('hpmmetadata'),

  npmUrl: function() {
    let packageName = this.get('packageName');

    return `https://npmjs.org/package/${packageName}`;
  }.property('packageName'),

});
