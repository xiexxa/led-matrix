<!--
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
-->

<template>
  <v-container>
    <template>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-center">Name</th>
              <th class="text-center">created</th>
              <th class="text-center">Edit</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in phrases" :key="item.body">
              <td>{{ item.body }}</td>
              <td>{{ item.created_at }}</td>
              <td>
                <!-- 編集 -->
                <template>
                  <div class="text-center">
                    <v-dialog v-model="dialogEdit" width="500">
                      <template v-slot:activator="{  }">
                        <v-icon small @click="editPhrase(item)">mdi-pencil</v-icon>
                        <v-icon small @click="sendDisplayRequest(item.body)">mdi-play</v-icon>
                        <v-icon small @click="deletePhrase(item.id)">mdi-delete</v-icon>
                      </template>
                      <v-card>
                        <v-card-title class="headline gray lighten-2">
                          編集
                        </v-card-title>
                        <v-card-text>
                          {{editBody}}
                          <v-text-field label="編集" v-model="editBody"></v-text-field>
                        </v-card-text>
                        <v-divider></v-divider>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="primary" @click="editPhrase(item)" text>Cancel</v-btn>
                          <v-btn color="primary" @click="updatePhrase(item, editBody)" text>Update</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </div>
                </template>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </template>
    <v-btn fab color="pink" dark accent fixed right bottom>
      <v-icon>mdi-plus</v-icon>
    </v-btn>
    <v-dialog v-model="dialogAdd" width="500">
      <template v-slot:activator="{ on }">
        <v-btn fab color="pink" dark accent fixed right bottom v-on="on">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Add Phrase</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col>
                <v-text-field label="Phrase" v-model="textPhrase" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogAdd = false">
            Cancel
          </v-btn>
          <v-btn color="blue darken-1" @click="addPhrase(textPhrase)" text>
            Add
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
export default {
  name: 'Text',
  components: {
  },
  data: () => ({
    phrases: [],
    search: '',
    loading: true,
    dialogAdd: false,
    dialogEdit: false,
    editBody: ''
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
    },
    deletePhrase: function (id) {
      console.log(id)
      this.axios.post('/api/delete/phrase', {
        id: id
      })
        .then((res) => alert(res.data))
        .catch((e) => alert(e))
    },
    editPhrase: function (item) {
      console.log(item)
      this.dialogEdit = !this.dialogEdit
      this.editBody = item.body
    },
    updatePhrase: function (item, editBody) {
      console.log(item)
      console.log(editBody)
      item.body = editBody
      console.log(item)
      this.axios.post('/api/update/phrase', {
        item: item
      })
        .then((res) => alert(res.data))
        .catch((e) => alert(e))
    },
    addPhrase: function (text) {
      console.log(text)
      this.axios.post('/api/add/phrase', {
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
        console.log(res.data.phrases)
        console.log(res.status)
        this.phrases = res.data.phrases
        console.log(this.phrases)
      })
    this.loading = false
  },
  computed: {
    headers () {
      return [
        {
          text: 'Phrase',
          align: 'start',
          sortable: true,
          value: 'body'
        }
      ]
    }
  }
}
</script>
