import Vue from 'vue'
// import Vuex from 'vuex'

// Vue.use(Vuex)

export default new Vuex.Store({
  state: {

    todo: ['admin', 'client', 'manager']

  },
  mutations: {

    addTodo(state,role){
      state.todo.push(role)
    },

    removeTodo(state, index){
      state.todo.splice(index,1)
    }

  },
  actions: {
  },
  modules: {
  }
})