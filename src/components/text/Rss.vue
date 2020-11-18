<!--
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
                        <input type="text" class="input" name='name' v-model="name" placeholder="Enter URL">
                        <input type="text" class="input" name='url' v-model="url" placeholder="Enter URL">
                        <div class="level">
                          <div class="level-left"></div>
                          <div class="level-right">
                            <input type="button" class="button is-small" name="add-url" v-on:click="registerNewFeed" value="Add">
                          </div>
                        </div>
                      </div>
                    </div>
                  </modal>
                </div>
              </div>
            </div>
            <p v-show="loading">Loading...</p>
            <div v-show="!loading" class="select">
              <select name="rss-source" id="" v-model="selected">
                <option disabled selected>RSSのソースを選択</option>
                <option v-for="feed in this.feeds" v-bind:key = feed.id v-bind:value="feed.name">{{feed.name}}</option>
              </select>
            </div>
            <nav class="level">
              <div class="level-left"></div>
              <div class="level-right">
                <div class="level-item">
                  <p class="button is-small is-warning" v-on:click="sendDisplayRequest">Send</p>
                </div>
              </div>
            </nav>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>
-->
<template>
  <v-container>
    <v-dialog v-model="dialogEdit" width="500">
      <template v-slot:activator="{ on }">
        <v-data-table :headers="headers" :items="feeds" item-key="id" :search="search">
          <template v-slot:[`item.edit`]="{ item }">
            <v-icon small @click="editFeed(item)">mdi-pencil</v-icon>
            <v-icon small @click="deleteFeed(item)">mdi-delete</v-icon>
            <v-bottom-sheet v-model="dialogDelete">
              <v-sheet class="text-center" height="200px">
                This is sheet
              </v-sheet>
            </v-bottom-sheet>
            <v-icon small @click="sendDisplayRequest(item)">mdi-play</v-icon>
          </template>
        </v-data-table>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Edit RSS Source</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col>
                <v-text-field label="Name" v-model="editedFeed.name" required></v-text-field>
                <v-text-field label="URL" v-model="editedFeed.url" hint="https://examplecom/rss.xml" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogEdit = false">
            Cancel
          </v-btn>
          <v-btn color="blue darken-1" @click="updateFeed(editedFeed)" text>
            Update
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogAdd" width="500">
      <template v-slot:activator="{ on }">
        <v-btn fab color="pink" dark accent fixed right bottom v-on="on">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Add RSS Source</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col>
                <v-text-field label="Name" required></v-text-field>
                <v-text-field label="URL" hint="https://examplecom/rss.xml" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialogAdd = false">
            Cancel
          </v-btn>
          <v-btn color="blue darken-1" text>
            Add
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  name: 'Rss',
  components: {
  },
  data: () => ({
    feeds: [],
    name: '',
    url: '',
    loading: true,
    dialogEdit: false,
    dialogDelete: false,
    dialogAdd: false,
    editedFeed: '',
    deletedFeed: ''
  }),
  methods: {
    rssSourceShow: function () {
      this.$modal.show('rsssource-panel')
    },
    rssSourceClose: function () {
      this.$modal.hide('rsssource-panel')
    },
    registerNewFeed: function () {
      let name = this.name
      let url = this.url
      this.axios.post('/api/add/feed', {
        name: name,
        url: url
      })
        .then((res) => alert('登録完了: ' + name))
        .catch((e) => alert(e))
    },
    sendDisplayRequest: function (item) {
      let selected = item.name
      // alert(selected)
      this.axios.post('/api/show/feed', {
        name: selected
      })
        .then((res) => alert('ニュース配信開始: ' + selected))
        .catch((e) => alert(e))
    },
    editFeed: function (item) {
      console.log('press')
      console.log(item)
      this.dialogEdit = true
      this.editedFeed = item
    },
    deleteFeed: function (item) {
      console.log('Delete')
      console.log(item)
      this.dialogDelete = true
      this.deletedFeed = item
    },
    updateFeed: function (item) {
      this.axios.post('/api/update/feed', {
        id: item.id,
        name: item.name,
        url: item.url
      })
        .then((res) => alert('アップデート成功'))
        .catch((e) => alert(e))
    }
  },
  async mounted () {
    console.log('mounted')
    await this.axios.get('/api/get/feed')
      .then(res => {
        console.log(res.data)
        console.log(res.status)
        this.feeds = res.data.feeds
      })
    this.loading = false
  },
  computed: {
    headers () {
      return [
        {
          text: 'Source',
          align: 'start',
          sortable: true,
          value: 'name'
        },
        {
          text: 'URL',
          align: 'start',
          sortable: false,
          value: 'url'
        },
        {
          text: 'Edit',
          align: 'center',
          sortable: false,
          value: 'edit'
        }
      ]
    }
  }
}
</script>
