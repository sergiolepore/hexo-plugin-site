import Ember from 'ember';

var SearchBoxComponent = Ember.Component.extend({
  query: '',

  actions: {
    /**
     * Action called when the search button is clicked
     */
    fireSearch: function() {
      // use the clean string (without extra whitespaces)
      var query = this.get('query');

      // call the main action
      // {{search-box action="anAction"}}
      this.sendAction('action', query);
    }
  },

  keyPress: function(e) {
    if (e.which === 13) { // if ENTER was pressed
      this.send('fireSearch'); // call fireSearch action
    }
  }
});

export default SearchBoxComponent;
