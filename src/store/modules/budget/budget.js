import Vue from 'vue';

const budgetStore = {
  namespaced: true,

  state: {
    list: {
      '1': {
        type: "INCOME",
        value: 100,
        comment: "Some comment",
        id: '1'
      },
      '2': {
        type: "OUTCOME",
        value: -50,
        comment: "Some outcome comment",
        id: '2'
      }
    }
  },
  getters: {
    storeGetList: ({list}) => list//Object.values(list)
  },
  mutations: {
    DELETE_ITEM(state,id) {
      Vue.delete(state.list, id);
    },
    ADD_ITEM(state, budgetItem) {
      Vue.set(state.list, budgetItem.id, budgetItem);
    }
  },
  actions: {
    storeDeleteItem({commit}, id) {
      commit('DELETE_ITEM', id);
    },
    storeAddItem({commit}, budgetItem) {
      commit('ADD_ITEM', budgetItem);
    }
  }
}

export default budgetStore;