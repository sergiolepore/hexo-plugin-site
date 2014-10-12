import Ember from 'ember';

var PluginRoute = Ember.Route.extend({
  titleToken: '',

  model: function(params) {
    var pluginSlug = params.plugin_slug;
    var _this = this;

    return this.store.find('plugin', {
      where: {
        packageName: pluginSlug
      }
    }).then(function(records) {
      var plugin = records.get('firstObject');

      if (!plugin) {
        // TODO: move to 404
        return plugin;
      }

      _this.set('titleToken', plugin.get('name'));

      return plugin;
    });
  },

});

export default PluginRoute;
