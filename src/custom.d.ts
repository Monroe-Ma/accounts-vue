declare module 'lodash'
type RecordItem = {
  tags: string[];
  notes: string;
  type: string;
  amount: number;
  createAt: string;
  createRecordError:Error;
  createTagError:Error;
};

type Tag = {
  id: string
  iconName:string
  name:string
}
type tagListName = {
  data:Tag[]
  fetch: () => Tag[]
  create: (name: string,iconName:string) => "success" | "duplicated"
  save: () => void
  update: (id: string, name: string) => "success" | "no found" 
  remove:(id: string)=>boolean
}
interface Window {
  store:{ 
  tagList: Tag[];
  createTag: (name: string) => void
  removeTag: (id: string) => boolean
  updateTag: tagListName["update"]
  findTag: (id: string) => tag | undefined
  recordList: RecordItem[]
  createRecord:(record:RecordItem)=>void
  }
  
}
type RootState = {
  recordList: RecordItem[],
  tagList: Tag[],
  currentTag?: Tag,
  defaultTag: any[],
  groupList:[]
}