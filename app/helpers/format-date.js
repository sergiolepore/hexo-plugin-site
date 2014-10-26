import Ember  from 'ember';
import moment from 'moment';

export function formatDate(value, options) {
  return moment(value).format(options);
}

export default Ember.Handlebars.makeBoundHelper(formatDate);
