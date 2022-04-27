<template>
  <v-dialog
    v-model="dialog"
    persistent
    max-width="600px"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        icon
        color="primary"
        v-bind="attrs"
        v-on="on"
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>
    <v-card color="#F2F6FC">
      <v-card-title class="justify-center">
        <div class="text-h5">Create new rule</div>
      </v-card-title>
      <v-card-text>
        <v-container>
          <h3>1. What to find in JSON?</h3>

          <v-row>
            <v-col
              cols="12"
              sm="6"
              md="6"
            >
              <v-text-field
                label="Rule name"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col
              cols="12"
              sm="6"
              md="6"
            >
              <v-text-field
                label="Key"
                hint="example of helper text only on focus"
              ></v-text-field>
            </v-col>
            <v-col
              cols="12"
              sm="6"
              md="6"
            >
              <v-text-field
                label="Value"
                hint="example of persistent helper text"
                persistent-hint
                required
              ></v-text-field>
            </v-col>
            <v-col
              cols="6"
              sm="6"
              md="6"
            >
              <v-checkbox label="Search in array"></v-checkbox>
            </v-col>
            <v-col
              cols="6"
              sm="6"
              md="6"
            >
              <v-text-field
                label="Array key name"
                persistent-hint
                required
              ></v-text-field>
            </v-col>
            <div v-if="false">
              <v-col cols="12">
                <v-text-field
                  label="Email*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Password*"
                  type="password"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-select
                  :items="['0-17', '18-29', '30-54', '54+']"
                  label="Age*"
                  required
                ></v-select>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-autocomplete
                  :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                  label="Interests"
                  multiple
                ></v-autocomplete>
              </v-col>
            </div>
          </v-row>

          <h3 class="pt-8 pb-6">2. What to find in JSON?</h3>
          <v-row>
            <v-col cols="12">
              Send to
              <v-text-field
                label="URL"
                placeholder="URL placeholder"
              >
              </v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-btn color="white">Query parameter</v-btn>
              <v-btn
                icon
                color="primary"
                class="ml-4"
              >
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          @click="dialog = false"
          color="white"
        >
          Cancel
        </v-btn>
        <v-btn
          color="primary"
          @click="dialog = false"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>

export default {
  data() {
    return {
      dialog: false,
    };
  },
}
</script>
