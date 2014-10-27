import Ember  from 'ember';
import moment from 'moment';

var DatetimeSpanComponent = Ember.Component.extend({

  datetime : '',
  classes  : '',

  datetimeISO: function() {
    var datetime = this.get('datetime');

    return moment(datetime).toISOString();
  }.property('datetime'),

});

export default DatetimeSpanComponent;
