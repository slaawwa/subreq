<template>
  <div>
      <h1>Test</h1>
      <div v-for="(item, i) in todos" :key="i">
          {{item}}
      </div>
      <v-card>

        <v-btn color="primary">
            Primary
        </v-btn>

      </v-card>

    <v-chip
        color="yellow"
    >chip</v-chip>

      
  </div>
</template>

<script>
// import store from '../store/store'
export default {
    // store,
    data: ()=> {
        return {
            todos: [], // store.state.todo
        }
    }
}
</script>

<style>

</style>