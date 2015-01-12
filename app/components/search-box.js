import Ember from 'ember';

export default Ember.Component.extend({
  query: '',

  actions: {
    /**
     * Action called when the search button is clicked
     */
    fireSearch() {
      // use the clean string (without extra whitespaces)
      let query = this.get('query');

      // call the main action
      // {{search-box action="anAction"}}
      this.sendAction('action', query);
    }
  },

  keyPress(e) {
    if (e.which === 13) { // if ENTER was pressed
      this.send('fireSearch'); // call fireSearch action
    }
  }
});
