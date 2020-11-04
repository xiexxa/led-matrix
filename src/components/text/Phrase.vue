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
                  <th>文</th>
                </tr>
              </thead>
              <tbody>
                <p v-show="loading">Loading...</p>
                <tr v-show="!loading" v-for="phrase in this.phrases" v-bind:key = phrase.id>
                  <th v-on:click="sendDisplayRequest(phrase.body)">{{phrase.body}}</th>
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
    phrases: [],
    textbox: '',
    loading: true
  }),
  methods: {
    phraseShow: function () {
      this.$modal.show('phrase-panel')
    },
    registerNewPhrase: function () {
      let textbox = this.textbox
      this.axios.post('/api/add/phrase', {
        text: textbox
      })
        .then((res) => alert('登録完了: ' + textbox))
        .catch((e) => alert(e))
    },
    sendDisplayRequest: function (text) {
      this.axios.post('/api/show/text', {
        text: text
      })
        .then((res) => alert(res.data))
        .catch((e) => alert(e))
    }
  },
  async mounted () {
    console.log('mounted')
    await this.axios.get('/api/get/phrase')
      .then(res => {
        console.log(res.data)
        console.log(res.status)
        this.phrases = res.data.phrases
      })
    this.loading = false
  }
}
</script>
