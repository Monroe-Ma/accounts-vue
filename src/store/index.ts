import clone from '@/lib/clone';
import Vue from 'vue'
import Vuex from 'vuex'



Vue.use(Vuex)

const store= new Vuex.Store({
  state: {
    recordList:[] as RecordItem[]
  },
  mutations: {
      fetchRecords(state) {
   state.recordList= JSON.parse(window.localStorage.getItem("recordList") || "[]") as RecordItem[]
     return this.recordList
  },
    createRecord(state,record) {
    const record2 : RecordItem= clone(record);
    state.recordList.push(record2);
    record2.createAt = new Date();
    store.commit("saveRecords")
      
    // recordStore.saveRecords()
    },
     saveRecords(state) { 
    return  window.localStorage.setItem("recordList", JSON.stringify( state.recordList));
  },
  },

 })
export default store
