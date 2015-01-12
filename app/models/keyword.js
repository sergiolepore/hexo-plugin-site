import DS from 'ember-data';

export default DS.Model.extend({
  name    : DS.attr('string'),
  plugins : DS.hasMany('plugin')
});
