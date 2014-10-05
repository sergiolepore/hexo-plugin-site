import DS from 'ember-data';
import ENV from 'hexo-plugin-site/config/environment';

export default DS.RESTAdapter.extend({
  host: ENV.APP.apiHost,
  namespace: '/v1',
  coalesceFindRequests: true
});
