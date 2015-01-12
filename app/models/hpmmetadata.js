import DS    from 'ember-data';
import Ember from 'ember';

// prevent the inflector to alter the model name
// otherwise it will look for `hpmmetadatum` model
Ember.Inflector.inflector.uncountable('hpmmetadata');

export default DS.ModelFragment.extend({
  token        : DS.attr('string'),
  hexoVersion  : DS.attr('string')
});
