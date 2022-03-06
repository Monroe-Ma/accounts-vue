import clone from "@/lib/clone";

const localStorageKeyName = "recordList"

const recordListModel = {
  data: [] as RecordItem[],
  create(record: RecordItem) {
     const record2 : RecordItem= clone(record);
      this.data.push(record2);
      record2.createAt = new Date();
      this.save()
   },
  fetch() {
    return JSON.parse(window.localStorage.getItem(localStorageKeyName) || "[]") as RecordItem[]
  },

  save() { 
    
    return  window.localStorage.setItem(localStorageKeyName, JSON.stringify( this.data));
  }
  }

export default recordListModel