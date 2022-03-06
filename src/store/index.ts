import clone from '@/lib/clone';
import idCreate from '@/lib/idCreate';
import Vue from 'vue'
import Vuex from 'vuex'



Vue.use(Vuex)

const store= new Vuex.Store({
  state: {
    recordList: [] as RecordItem[],
    tagList:[] as tag[]
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
    fetchTag(state) {
   return   state.tagList = JSON.parse(window.localStorage.getItem("tagList") || "[]") 
    
    },
   createTag(state,name: string){
    const names= state.tagList.map(item=>item.name)
    if (names.indexOf(name) >= 0) {
       window.alert("标签重复了");
      return  "duplicated"
    }
    const id =idCreate().toString()
    state.tagList.push({ id, name: name })
    store.commit("saveTag")
    window.alert("添加标签成功");
    return "success"
    },
    saveTag(state) {
    window.localStorage.setItem("tagList", JSON.stringify(state.tagList));
  }
  },


 })
export default store
