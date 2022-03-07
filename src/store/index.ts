import clone from '@/lib/clone';
import idCreate from '@/lib/idCreate';
import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router';
Vue.use(Vuex)

type RootState = {
  recordList: RecordItem[],
  tagList: tag[],
  currentTag?: tag
}

const store= new Vuex.Store({
  state: {
    recordList: [] as RecordItem[],
    tagList: [] as tag[],
    currentTag:undefined
  } as RootState,
  mutations: {
    setCurrentTag(state,id:string) {  
    state.currentTag  =  state.tagList.filter((t) => t.id === id)[0];
    },
    fetchRecords(state) {
    state.recordList= JSON.parse(window.localStorage.getItem("recordList") || "[]") as RecordItem[]
     return this.recordList
  },
    createRecord(state,record) {
      const record2: RecordItem = clone(record);
    state.recordList.push(record2);
    record2.createAt = new Date();
    store.commit('saveRecords')
      
    },
    saveRecords(state) { 
       return window.localStorage.setItem("recordList", JSON.stringify(state.recordList));
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
    },
    updateTag(state, payload: { id: string, name: string }) {
      const {id, name} = payload;
      const idList = state.tagList.map(item => item.id);
      if (idList.indexOf(id) >= 0) {
        const names = state.tagList.map(item => item.name);
        if (names.indexOf(name) >= 0) {
          window.alert('标签名重复了');
        } else {
          const tag = state.tagList.filter(item => item.id === id)[0];
          tag.name = name;
          store.commit('saveTag');
        }
      }
    },
   removeTag(state, id: string) {
      let index = -1;
      for (let i = 0; i < state.tagList.length; i++) {
        if (state.tagList[i].id === id) {
          index = i;
          break;
        }
      }
      if (index >= 0) {
        state.tagList.splice(index, 1);
        store.commit('saveTag');
        router.back();
      } else {
        window.alert('删除失败');
      }

    },
  },


 })
export default store
