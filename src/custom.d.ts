type RecordItem = {
  tags: string[];
  notes: string;
  type: string;
  amount: number;
  createAt?: Date;
};
type tag = {
  id: string
  name:string
}
type tagListName = {
  data:tag[]
  fetch: () => tag[]
  create: (name: string) => "success" | "duplicated"
  save: () => void
  update: (id: string, name: string) => "success" | "no found" 
  remove:(id: string)=>boolean
}
interface Window {
  store:{ 
  tagList: tag[];
  createTag: (name: string) => void
  removeTag: (id: string) => boolean
  updateTag: tagListName["update"]
  findTag: (id: string) => tag | undefined
  recordList: RecordItem[]
  createRecord:(record:RecordItem)=>void
  }
  
}