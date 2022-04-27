<template>
  <div>
    <v-app id="app">

      <!-- <v-navigation-drawer app> -->
        <!-- -->
      <!-- </v-navigation-drawer> -->

      <v-app-bar app style="background-color: #fff">
        <v-container :style="{ paddingLeft: 0, paddingBottom: 0 }">
        <!-- <v-app-bar-title>Service Name</v-app-bar-title> -->
        <!-- <v-toolbar-title>My files</v-toolbar-title> -->
        <!-- <v-spacer></v-spacer> -->

        <!-- <v-btn variant="text" data-icon="mdi-magnify">12</v-btn> -->
          <v-btn
            text
            plain
            data-btn
            data-menu
            to="/"
            class-active="active"
          >
            Main
          </v-btn>
          <v-btn
            text
            plain
            data-btn
            data-menu
            to="/rules"
            class-active="active"
          >
            Rules
          </v-btn>
          <!-- <v-btn
            text
            plain
            data-btn
            data-menu
            to="/editor"
            class-active="active"
          >
            Editor
          </v-btn> -->

          <!-- <v-spacer></v-spacer> -->

          

          <v-menu left bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-badge
                color="black0"
                data-dropdown
                data-color="transparent"
                dot
                data-content="⌄"
                data-avatar
                data-inline
                data-floating
                style="float: right"
              >
              
                <v-btn
                  text
                  plain
                  icon
                  small
                  v-on="on"
                  v-bind="attrs"
                >
                  <v-icon>mdi-cog-outline</v-icon>
                </v-btn>
              </v-badge>
            </template>
            <v-list>
              <v-list-item
                v-for="(item, index) in settingMenu"
                :key="index"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

        </v-container>
      </v-app-bar>

      <!-- Sizes your content based upon application components -->
      <v-main>

        <!-- Provides the application the proper gutter -->
        <v-container data-fluid>
          <!-- If using vue-router -->
          <router-view></router-view>
        </v-container>
      </v-main>

      <v-footer app>
        <!-- -->
      </v-footer>
    </v-app>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      settingMenu: [
        { title: 'Profile' },
        { title: 'History' },
        { title: 'Logout' },
      ],
    }
  },
}
</script>

<style scoped>
  main {
    background-color: #E5E5E5;
  }
</style>

<style>
/* #app .container {
  outline: 1px solid goldenrod;
} */
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  /* margin-top: 60px; */
}

[data-dropdown] [aria-label="Badge"] {
  /* outline: 1px solid red; */
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid rgb(114, 114, 114);
  border-radius: 3px !important;
}

.myMarker {
  position: absolute;
  background: rgba(255,100,100,0.5);
  z-index: 20;
}
.v-btn__content {
  text-transform: none;
}
.v-btn__content1 {
  color: #438EFF;
}

/* [data-btn]:not(.v-btn--active) .v-btn__content {
  color: black !important;
} */
.v-btn--plain:hover .v-btn__content {
  opacity: .62 !important;
}
.v-btn--plain:not(.v-btn--active):not(.v-btn--loading):not(:focus):not(:hover) .v-btn__content {
  opacity: 1 !important;
}

[data-btn] {
  text-transform: initial !important;
}
[data-menu] {
  border-radius: 0 !important;
}
[data-menu]:not(:hover) {
  border-bottom: 2px solid transparent;
}
.v-btn--active[data-menu] {
  color: #438EFF !important;
}
[data-menu]:hover, .v-btn--active[data-menu] {
  border-bottom: 2px solid #438EFF;
}
</style>
