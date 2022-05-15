<template>
  <v-row>
    <v-col cols="4">
      <v-card class="column-1" :loading="loading">
        <v-card-title class="two-column">
          <span>List of rules</span>
          <span>
            <v-btn icon>
              <v-icon>mdi-magnify</v-icon>
            </v-btn>
            <AddNewRule
            />
          </span>
        </v-card-title>
        <v-divider />
        <v-list v-if="rules.length">
          <v-list-item
            v-for="(rule, index) of rules"
            :key="rule.id"
            :style="index >= rules.length - 1 ? '' : 'border-bottom: 1px solid #F2F6FC'"
            @click="ruleClick(rule)"
            class="two-column"
          >
            <v-list-item-icon style="padding-left: 15px">
              <v-badge
                dot
                data-inline
                :color="rule.active ? 'success' : 'grey'"
                offset-y="15"
                offset-x="15"
              ></v-badge>
              <span>{{ rule.name }}</span>
            </v-list-item-icon>
            <!-- <v-list-item-content style="display: none">
              <pre>{{ rule }}</pre>
            </v-list-item-content> -->
            <v-list-item-content class="text-right">
              <div>
                <v-btn icon>
                  <v-icon
                    small
                    :color="rule.active ? 'black' : 'success'"
                    @click="changeActive(rule)"
                  >
                    {{ `mdi-arrow-${rule.active ? 'left' : 'right'}-thin` }}
                  </v-icon>
                </v-btn>
              </div>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <div v-else class="text-center pt-13 mt-13">
          <v-icon large>mdi-file-document-outline</v-icon>
          <h4>Rules not found</h4>
          <div>Please create new rule</div>
        </div>
      </v-card>
    </v-col>
    <v-col cols="8">
      <v-card class="column-2">
        <v-card-title class="alert-title-wrap">
          <v-alert
            dense
            :icon="false"
            class="alert-title alert-bg"
          >
            <v-row class="two-column">
              <v-col cols="6">
                Active Rules
              </v-col>
              <v-col cols="6" class="text-right">
                <span class="right-column">
                  Running: <strong class="color-primary">1</strong>
                </span>
              </v-col>
            </v-row>
          </v-alert>
        </v-card-title>
        <v-divider />

        <v-list>
          <v-list-item
            v-for="(rule, index) of activeRules"
            :key="rule.id"
            :style="index >= activeRules.length - 1 ? '' : 'border-bottom: 1px solid #F2F6FC'"
          >
            <v-list-item-content>
              <v-list-item-title>
                <v-icon small style="margin-top: -1px; margin-right: 3px;">mdi-eye-outline</v-icon>
                {{ rule.name }}
                <v-list-item-icon>
                  <v-btn
                    small
                    plain
                    :color="openedRules[rule.id] ? 'primary' : ''"
                    @click="togleOpened(rule)"
                  >
                    <v-icon small style="margin-top: -1px; margin-right: 3px;">
                      {{ `mdi-text-box${openedRules[rule.id] ? '-outline' : '' }` }}
                    </v-icon>
                    {{ openedRules[rule.id] ? 'Hide' : 'Show' }}
                    details
                  </v-btn>
                  <v-btn
                    small
                    plain
                    @click="changeActive(rule)"
                  >
                    <v-icon small style="margin-top: -1px; margin-right: 3px;">mdi-trash-can</v-icon>
                    Remove from list
                  </v-btn>
                </v-list-item-icon>
              </v-list-item-title>
              <v-list-item-subtitle
                v-if="openedRules[rule.id]"
              >
                <v-alert
                  class="alert-bg"
                  v-for="detail of rule.configuration"
                  :key="detail.key"
                >
                  <v-row>
                    <v-col cols="4">
                      <v-icon>mdi-magnify</v-icon>
                      looking for:
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        data-solo
                        filled
                        disabled
                        :value="detail.key"
                        class="text-field"
                        label="Key"
                        placeholder="Put key for search"
                      >
                      </v-text-field>
                    </v-col>
                    <v-col cols="4">
                      <v-text-field
                        filled
                        disabled
                        :value="detail.value"
                        class="text-field"
                        label="Value"
                        placeholder="Put value for search"
                      >
                      </v-text-field>
                    </v-col>
                  </v-row>
                </v-alert>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import AddNewRule from '../components/AddNewRule.vue'

import api from '../common/api'

window.api = api;

export default {
  components: { AddNewRule },
  data() {
    return {
      loading: false,
      openedRules: {},
      rules: [
        // {
        //   id: 1,
        //   name: 'Rule name 1',
        //   disabled: false,
        //   active: true,
        //   opened: false,
        //   details: [{
        //     someInfo: 'Details Info 1',
        //     date: (new Date()).toUTCString(),
        //   }],
        // }, {
        //   id: 2,
        //   name: 'Rule name 2',
        //   disabled: true,
        //   active: false,
        //   opened: false,
        //   details: [{
        //     someInfo: 'Details Info 2',
        //     date: (new Date()).toUTCString(),
        //   }],
        // },
      ],
    };
  },
  created() {
    window.that = this;
    this.loadRules()
  },
  computed: {
    activeRules() {
      return this.rules.filter(({ active }) => active)
    },
  },
  methods: {
    ruleClick(rule) {
      console.log(' - rule:97 >', rule); // eslint-disable-line no-console
    },
    changeActive(rule) {
      rule.active = !rule.active
      // rule.disabled = !rule.disabled
    },
    togleOpened(rule) {
      // rule.opened = !rule.opened
      this.openedRules = {
        ...this.openedRules,
        [rule.id]: !this.openedRules[rule.id],
      }
    },
    async loadRules() {
      this.loading = true
      try {
        this.rules = await api.rules.get()
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<style scoped>
  .column-1, .column-2 {
    min-height: 400px;
  }
  .two-column {
    justify-content: space-between;
  }
  .alert-title-wrap {
    padding-bottom: 8px;
  }
  .alert-bg {
    background-color: #F2F6FC;
    width: 100%;
  }
  .alert-title {
    display: block;
    padding: 5px 10px;
    margin-bottom: 0;
    font-size: 20px;
  }
  .right-column {
    font-size: 14px;
  }
  .color-primary {
    color: #1976d2;
  }
</style>

<style>
  .text-field .v-input__slot {
    background-color: white !important;
    border-radius: 10px;
  }
  .text-field .v-input__slot input {
    font-size: 17px;
  }
</style>
