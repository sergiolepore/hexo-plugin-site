import DS from 'ember-data';

var Keyword = DS.Model.extend({
  name: DS.attr('string'),
  plugins: DS.hasMany('plugin')
});

export default Keyword;
