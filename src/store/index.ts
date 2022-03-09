import clone from '@/lib/clone';
import idCreate from '@/lib/idCreate';
import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router';
Vue.use(Vuex)

const store= new Vuex.Store({
  state: {
    groupList: [],
    createRecordError: null,
    createTagError: null,
    recordList: [] as RecordItem[],
    tagList: [] as Tag[],
    currentTag: undefined,
    defaultTag: [
      { name: "餐饮", iconName: "eat" },
      { name: "购物", iconName: "shopping" },
      { name: "交通", iconName: "traffic" },
      { name: "娱乐", iconName: "entertainment" },
      { name: "日用", iconName: "daily" },
      { name: "医疗", iconName: "medical" },
      { name: "零食", iconName: "snacks" },
      { name: "房贷", iconName: "home" },
      { name: "文教", iconName: "education" },
    ]
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
     record2.createAt = new Date().toISOString();
    store.commit('saveRecords')
    },
    saveRecords(state) { 
       return window.localStorage.setItem("recordList", JSON.stringify(state.recordList));
    },
     
    fetchTag(state) {      
     state.tagList = JSON.parse(window.localStorage.getItem("tagList") || "[]") 
      if (!state.tagList || state.tagList.length === 0) {
        store.commit('InstalTags')
      }
    },

    InstalTags(state) {
      window.localStorage.setItem("tagList", JSON.stringify(state.defaultTag));
      state.tagList = state.tagList.concat(state.defaultTag);
    },
    
    createTag(state, payload: { name: string, iconName: string }) {
      const {iconName, name} = payload;
      const names= state.tagList.map(item=>item.name)
      if (names.indexOf(name) >= 0) {
       window.alert("标签重复了");
      return  "duplicated"
    }
    const id =idCreate().toString()
    state.tagList.push({ id, name: name ,iconName:iconName})
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
