<template>
  <div>
    <v-card :loading="loading">
      <v-card-text>
        <v-row
          gutters
        >
          <v-col>

            <v-btn-toggle
              dense
              group
              mandatory
              style="display: inline-block"
              v-model="activeKey"
            >
              <v-btn
                text
                rounded
                small
                elevation="0"
                color="primary"
                style="border-radius: 15px;"
                v-for="item of tabs"
                :key="item.id"
                :value="item.id"
              >
                {{ item.name }}
                <v-btn
                  x-small
                  icon
                  plain
                  :value="item.id"
                  style="padding: 2px"
                  @click.stop="closeTag(item)"
                >
                  <v-icon x-small>mdi-window-close</v-icon>
                </v-btn>
              </v-btn>
            </v-btn-toggle>
            
            <v-dialog
              v-model="showNewModal"
              persistent
              max-width="600px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  data-elevation="4"
                  link
                  data-outlined
                  text
                  plain
                  v-bind="attrs"
                  v-on="on"
                >
                  + Add new
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">Add new profile</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col
                        cols="12"
                        sm="12"
                        md="12"
                      >
                        <v-text-field
                          required
                          autofocus
                          v-model="newTab"
                          @keydown.esc="closeModal"
                          @keypress.enter="addNew"
                          label="Name of service"
                          hint="Please input some field text"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="closeModal"
                  >
                    Close
                  </v-btn>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="addNew"
                  >
                    Save
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

          </v-col>
          <v-col style="text-align: right">
            <v-btn
              icon
              style="position: absolute; right: -40px; top: -5px"
            >
              <v-icon>mdi-information-outline</v-icon>
            </v-btn>

          </v-col>
        </v-row>

      </v-card-text>
    </v-card>



    <v-spacer style="margin-top: 10px; margin-bottom: 10px"></v-spacer>
    <v-card :loading="loadingLogs">
      <v-card-title style="justify-content: space-between">
        Json logs
        <v-btn
          x-small
          text
          color="primary"
          :disabled="!activeTab || (filteredItems && filteredItems.length === 0)"
          @click="clearHistory"
        >
          <v-icon small>mdi-history</v-icon>
          Clear history
        </v-btn>
      </v-card-title>

      <v-divider/>

      <v-card-text style="min-height: 400px">
        <div v-if="activeTab">

          <v-list>
            <v-list-item
              v-for="(item, index) in filteredItems"
              :key="item.id"
              :style="index >= (filteredItems ? filteredItems.length : 0) - 1 ? '' : 'border-bottom: 1px solid lightgray;'"
              @click="setOpen(item)"
            >
              <v-list-item-icon>
                <v-badge
                  dot
                  data-inline
                  :color="item.disabled ? 'grey' : 'success'"
                  offset-y="15"
                  offset-x="15"
                ></v-badge>
                <strong>{{ activeTab.text }}</strong>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>
                <!-- <v-icon color="indigo">mdi-phone</v-icon> -->
                  Detected:
                </v-list-item-title>
                <v-list-item-subtitle>
                  {{ item.text }}
                </v-list-item-subtitle>
              </v-list-item-content>

              <v-list-item-icon>
                <v-icon small style="margin-top: -1px; margin-right: 3px;">mdi-clock-time-four-outline</v-icon>
                {{ item.date }}
                <v-icon color="primary" v-if="openedItem === item">mdi-triangle-small-up</v-icon>
                <v-icon color="grey lighten-1" v-else>mdi-triangle-small-down</v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list>

          
          <v-card v-if="openedItem">
            <Editor
              @onInit="onInit"
              :validKeys="activeTab.validKeys"
              :value="toString(openedItem.data)"
            />
          </v-card>

        </div>
        <v-row v-else justify="center">
          <v-col align="center" cols="6" style="margin: 100px 0">
            <v-icon large>mdi-file-document-outline</v-icon>
            <h4>Json not found</h4>
            <div>
              Subscribe to the resource to get the required decoding.
              <br />
              In the topic section
            </div>
          </v-col>
        </v-row>
        
        <v-alert
          data-dense
          text
          type="info"
          :icon="false"
          v-if="activeTab && filteredItems && filteredItems.length === 0"
        >
          <strong>Detected: </strong>
          <span>Empty</span>
        </v-alert>
      </v-card-text>

      <v-divider
        v-if="openedItem"
      />
      <v-card-actions
        v-if="openedItem"
      >
        <v-alert
          data-dense
          text
          data-color="#F2F6FC"
          :icon="false"
          width="100%"
          style="background-color: #F2F6FC !important;"
        >
          <div style="color: #000">
            Detected:
            <v-btn color="primary">
              Rule name
            </v-btn>
            <v-btn color="white" style="margin-left: 10px">
              Rule name <span style="color: blue">(2)</span>
            </v-btn>
          </div>
        </v-alert>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>

import api from '@/common/api';
import Editor from '../components/Editor.vue';

const DAY_IN_SECONDS = 1000 * 60 * 60 * 24;
function getDate(plusDays = 0) {
  const d = new Date(Date.now() + (plusDays * DAY_IN_SECONDS));
  return d.toGMTString();
}


export default {
  components: { Editor },
  data() {
    const data = {
      brainIdentifier: '7257a32b-7d4d-4c36-98e6-310b7a661127',
      name: '2. Room Recognition',
      brainReleaseIdentifier: 'e32252b3-a053-4139-8535-f689eb7fbc4e',
      environment: 'staging',
      url: '',
      byteCount: 5690,
      dateTrained: '2021-12-29T19:55:42.000Z',
      dateReleased: '2021-08-27T14:10:58.000Z',
      backbone: {
        backboneIdentifier: '7081710f-b5e7-4dcc-9c96-b4f834e163e4',
        backends: {
          'x86-CPU': {
            backend: 'Caffe',
            byteCount: 8021613
          },
          'x86-CUDA': {
            backend: 'Caffe',
            byteCount: 8021613
          },
          'x86-OpenVINO': {
            backend: 'OpenVINO',
            byteCount: 4326420
          }
        }
      },
      brainVersionType: 'Learning',
      roi: null
    }
    const items = [
      { id: 1, text: 'Rule 1, Rule 2, Rule 3', disabled: false, date: getDate(+1), data },
      { id: 2, text: 'Rules 1', disabled: false, date: getDate(+2), data: { name: data.name } },
      { id: 3, text: '-', disabled: true, date: getDate(+3), data: { url: data.url, backbone: data.backbone } },
    ]
    const validKeys = ['url', 'byteCount', 'dateTrained', 'dateReleased', 'backboneIdentifier', 'backends'];
    if (!window) {
      window.items = items;
      window.validKeys = validKeys;
    }
    return {
      newTab: '',
      showNewModal: false,
      activeKey: 1,
      openedItem: null,
      loading: true,
      loadingLogs: false,
      logs: [],
      tabs: [
        // { text: 'Neurala', id: 1, items, validKeys },
      ],
    }
  },
  computed: {
    activeTab() {
      if (!this.activeKey) {
        return null;
      }
      return this.tabs.find(({ id }) => id === this.activeKey)
    },
    filteredItems() {
      if (this.openedItem) {
        return [this.openedItem];
      }
      return this.logs;
    },
  },
  watch: {
    activeKey(key) {
      if (key) {
        this.getLogs(key)
      }
      this.openedItem = null;
    },
  },
  async created() {
    window.th = this
    this.loading = true;
    try {
      this.tabs = await api.topics.get()
    } finally {
      this.loading = false
    }
  },
  methods: {
    closeTag(item) {
      this.tabs = this.tabs.filter(i => i !== item);
    },
    closeModal() {
      this.showNewModal = false
    },
    addNew() {
      // const itemRec = {
      //   id: 12,
      //   text: 'Rule 2, Rule 3',
      //   disabled: false,
      //   date: 'Sun, 24 Apr 2022 21:54:34 GMT',
      //   data: { name: 'Turbo', url: '/img' },
      // };
      const newTab = {
        name: this.newTab,
        id: Date.now(),
        // items: [itemRec],
        // validKeys: ['url', 'name'],
      };
      this.tabs = [newTab, ...this.tabs];
      this.activeKey = newTab.id;
      this.newTab = '';
      this.openedItem = null;
      this.showNewModal = false;
    },
    clearHistory() {
      this.openedItem = null;
      this.logs = [];
    },
    setOpen(item) {
      this.openedItem = item === this.openedItem ? null : item;
    },
    async getLogs(topicId) {
      this.loadingLogs = true
      try {
        this.logs = await api.logs.get(topicId)
      } finally {
        this.loadingLogs = false
      }
    },
    toString(obj) {
      try {
        return JSON.stringify(obj, null, 2);
      } catch (e) {
        return e.toString();
      }
    },
    onInit(e) {
      e?.setReadOnly(true);
      e?.setOptions({ maxLines: 50 })
      window.th = this;
    },
  },
}

</script>

