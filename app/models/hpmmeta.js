import DS from 'ember-data';

var HpmMeta = DS.ModelFragment.extend({
  token:        DS.attr('string'),
  hexoVersion:  DS.attr('string')
});

export default HpmMeta;
