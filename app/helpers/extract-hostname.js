import Ember from 'ember';

function extractHostname(value) {
  var urlRegexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

  if (!/^https?:\/\//i.test(value)) {
    value = 'http://' + value;
  }

  if (!urlRegexp.test(value)) {
    return '';
  }

  return new URL(value).hostname;
}

export {
  extractHostname
};

export default Ember.Handlebars.makeBoundHelper(extractHostname);
