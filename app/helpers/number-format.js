import Ember   from 'ember';
import numeral from 'numeral';

function numberFormat(value, options) {
  if (value === undefined) {
    value = 0;
  }

  return numeral(value).format(options);
}

export {
  numberFormat
};

export default Ember.Handlebars.makeBoundHelper(numberFormat);
