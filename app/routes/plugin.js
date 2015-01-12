import Ember from 'ember';

var PluginRoute = Ember.Route.extend({
  titleToken: '',

  model(params) {
    var pluginSlug = params.plugin_slug;

    return this.store.find('plugin', {
      where: {
        packageName: pluginSlug
      }
    }).then(records => {
      var plugin = records.get('firstObject');

      if (!plugin) {
        // TODO: move to 404
        return plugin;
      }

      this.set('titleToken', plugin.get('name'));

      return plugin;
    });
  },

});

export default PluginRoute;
