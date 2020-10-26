<template>
  <div class="tile is-ancestor">
    <div class="tile is-vertical">
      <div class="tile is-parent">
        <article class="tile is-child notification is-light">
          <Unit description="RSS"/>
          <div class="tile is-child notification is-info is-light">
            <p class="is-5">RSSから情報を取得する </p>
            <div class="level">
              <div class="level-left"></div>
              <div class="levle-right">
                <div class="level-item">
                  <input type="button" class="button is-small" v-on:click="rssSourceShow" value="Add">
                  <modal name="rsssource-panel" height="auto">
                    <div class="modal-body">
                      <div class="section">
                        <h3 class="title">Add RSS Source</h3>
                        <input type="text" class="input" name='url' placeholder="Enter URL">
                        <div class="level">
                          <div class="level-left"></div>
                          <div class="level-right">
                            <input type="button" class="button is-small" name="add-url" value="Add">
                          </div>
                        </div>
                      </div>
                    </div>
                  </modal>
                </div>
              </div>
            </div>
            <div class="select">
              <select name="rss-source" id="">
                <option value="Source1">Source 1</option>
                <option value="Source2">Source 2</option>
                <option value="Source3">Source 3</option>
              </select>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
import Unit from './Unit'
export default {
  name: 'Text',
  components: {
    Unit
  },
  methods: {
    rssSourceShow: function () {
      this.$modal.show('rsssource-panel')
    },
    rssSourceClose: function () {
      this.$modal.hide('rsssource-panel')
    }
  }
}
</script>
