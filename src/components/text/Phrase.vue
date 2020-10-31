<template>
  <div class="tile is-ancestor">
    <div class="tile is-vertical">
      <div class="tile is-parent">
        <article class="tile is-child notification is-light">
          <Unit description="定型文から選択して表示します。"/>
          <div class="tile is-child notification is-info is-light">
            <p class="is-5">定型文から選択する</p>
            <div class="level">
              <div class="level-left"></div>
              <div class="levle-right">
                <div class="level-item">
                  <input type="button" class="button is-small" v-on:click="phraseShow" value="Add">
                  <modal name="phrase-panel" width="90%" height="auto">
                    <div class="modal-body">
                      <div class="section">
                        <h3 class="title">Add phrase</h3>
                        <div class="field">
                          <div class="control">
                            <input type="text" class="input" name='phrase' v-model="textbox" placeholder='登録したいフレーズを入力'>
                          </div>
                        </div>
                        <div class="field">
                          <div class="level">
                            <div class="level-left"></div>
                            <div class="level-right">
                              <div class="control">
                                <input type="button" class="button is-info" name='send-phrase' v-on:click="registerNewPhrase" value='登録'>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </modal>
                </div>
              </div>
            </div>
            <table class="table is-fullwidth">
              <thead>
                <tr>
                  <th>Phrase</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Hello</th>
                </tr>
              </tbody>
            </table>
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
  data: () => ({
    textbox: ''
  }),
  methods: {
    phraseShow: function () {
      this.$modal.show('phrase-panel')
    },
    registerNewPhrase: function () {
      let textbox = this.textbox
      alert(textbox)
    }
  }
}
</script>
