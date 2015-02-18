import Ember from 'ember';

export default Ember.Route.extend({
  titleToken: '',

  model(params) {
    let pluginSlug = params.plugin_slug;

    return this.store.findQuery('plugin', {
      where: {
        packageName: pluginSlug
      }
    }).then(records => {
      let plugin = records.get('firstObject');

      if (!plugin) {
        // TODO: move to 404
        return plugin;
      }

      this.set('titleToken', plugin.get('name'));

      return plugin;
    });
  },

});
