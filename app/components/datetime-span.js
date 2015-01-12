import Ember  from 'ember';
import moment from 'moment';

export default Ember.Component.extend({

  datetime : '',
  classes  : '',

  datetimeISO: function() {
    let datetime = this.get('datetime');

    return moment(datetime).toISOString();
  }.property('datetime'),

});
