import Ember  from 'ember';
import moment from 'moment';

function formatDateAgo(value) {
  return moment(value).fromNow();
}

export {
  formatDateAgo
};

export default Ember.Handlebars.makeBoundHelper(formatDateAgo);
