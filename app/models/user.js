import DS from 'ember-data';

var User = DS.Model.extend({
  name: DS.attr('string'),
  email: DS.attr('string'),
  githubProfile: DS.attr('string'),
  npmProfile: DS.attr('string'),
  website: DS.attr('string'),
  donationsUrl: DS.attr('string'),
  plugins: DS.hasMany('plugin')
});

export default User;
