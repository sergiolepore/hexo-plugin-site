import Ember from 'ember';

function extractHostname(value) {
  var urlRegexp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  var urlDecomposerRegex = /^([^:\/?#]+:)?(?:\/\/([^\/?#]*))?([^?#]+)?(\?[^#]*)?(#.*)?/;

  if (!/^https?:\/\//i.test(value)) {
    value = 'http://' + value;
  }

  if (!urlRegexp.test(value)) {
    return '';
  }

  // [0] - Original
  // [1] - Protocol
  // [2] - Hostname
  // [3] - Uri
  // [4] - Parameters
  // [5] - Hash
  var urlParts = value.match(urlDecomposerRegex);

  return urlParts[2];
}

export {
  extractHostname
};

export default Ember.Handlebars.makeBoundHelper(extractHostname);
