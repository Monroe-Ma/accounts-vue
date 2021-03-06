import clone from "@/lib/clone";

const localStorageKeyName = "recordList"

const recordStore = {
    recordList:[] as RecordItem[],
  fetchRecords() {
   this.recordList= JSON.parse(window.localStorage.getItem(localStorageKeyName) || "[]") as RecordItem[]
     return this.recordList
  },
  saveRecords() { 
    return  window.localStorage.setItem(localStorageKeyName, JSON.stringify( this.recordList));
  },

  createRecord (record: RecordItem) {
    const record2 : RecordItem= clone(record);
    this.recordList&&this.recordList.push(record2);
    record2.createAt = new Date().toISOString();
    recordStore.saveRecords()
 
  }

}
recordStore.fetchRecords()

export default recordStore