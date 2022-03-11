<template>
  <Layout class-prefix="layout">
    <Output @update:value="onUpdateAmount" :value="record.amount" />
    <Tags @update:value="record.tags = $event" />
    <div class="classesItem">
      <button is-link @click="showPopup">
        {{ selectDateStr}}
        <Icon name="arrowRight" />
      </button>
      <van-popup
        v-model="show"
        position="bottom"
        :style="{ height: '30%' }"
        round
        overlay
        get-container="#app"
      >
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          title="选年月日"
          :min-date="minDate"
          :max-date="maxDate"
          :formatter="formatter"
          @confirm="onConfirm"
          @cancel="onCancel"
        />
      </van-popup>

      <Tabs classPrefix="cagney" :data-source="recordTypeList" :value.sync="record.type" />
    </div>
    <FormItem class="note" fileName="备注" placeholder="在这里输入备注" :value.sync="record.notes" />
    <NumberPad @update:value="onUpdateAmount" @submit="saveRecord" :value="record.amount" />
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import Tags from "@/components/Account/Tags.vue";
import FormItem from "@/components/Account/FormItem.vue";
import NumberPad from "@/components/Account/NumberPad.vue";
import { Component, Emit, Prop } from "vue-property-decorator";
import tagStore from "@/store/tagStore";
import { writeTypeList } from "@/constants/recordTypeList";
import Tabs from "../components/Tabs.vue";
import Output from "@/components/Account/Output.vue";
import dayjs from "dayjs";
import clone from "@/lib/clone";
import { Popup, DatetimePicker } from "vant";
Vue.use(Popup, DatetimePicker);

const tagList = tagStore.fetchTag();
type RecordItem = {
  tags: string[];
  notes: string;
  type: string;
  amount: number;
  createAt?: string;
};
@Component({
  components: { Tags, FormItem, NumberPad, Tabs, Output },
})
export default class Account extends Vue {
  @Prop(String) tagValue!: string[];

  recordTypeList = writeTypeList;
  tags = tagList;
  minDate = new Date(2020, 0, 1);
  maxDate = new Date(2025, 10, 1);
  currentDate = new Date();
  show = false;
  selectDateStr: string = dayjs(new Date()).format("YYYY-MM-DD");
  @Emit()
  formatter(type: string, val: string) {
    if (type === "month") {
      return `${val}月`;
    } else if (type === "day") {
      return `${val}日`;
    }
    return val;
  }
  showPopup() {
    this.show = true;
  }
  onConfirm(value: Date) {
    this.selectDateStr = dayjs(value).format("YYYY-MM-DD");
    this.show = false;
  }
  onCancel() {
    this.show = false;
  }
  get recordList() {
    return this.$store.state.count;
  }

  record: RecordItem = {
    tags: [],
    notes: "",
    type: "-",
    amount: 0,
  };
  created() {
    this.$store.commit("fetchRecords");
  }
  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  onUpdateAmount(value: number) {
    console.log(value);
    this.record.amount = value;
  }
  saveRecord() {
    (this.record.createAt = this.selectDateStr),
      this.$store.commit("createRecord", this.record);
    if (this.$store.state.createRecordError === null) {
      window.alert("已保存");
    }
    console.log("createRecord", clone(this.record));
    this.record.notes = "";
    // console.log("createRecord", this.record);
  }
}
</script>

<style lang="scss" scoped>
.classesItem {
  display: flex;
  justify-content: space-between;
  background: #fff;
  margin: 10px;
  padding: 0 20px;
  > button {
    margin: 10px 0;
    border: 1px solid #eee;
    background: #fff;
    padding: 0 10px;
    border-radius: 6px;
  }
}
::v-deep .cagney-tabs-item {
  background: #fff;
  border-radius: 40px;
  padding: 0 20px;
  margin: 10px 0;
  height: 44px;
  background: #eee;
  margin-left: 10px;
  font-size: 16px;
  color: #333;
  &.selected {
    background: #ff9400;
    color: #fff;
    &::after {
      display: none;
    }
  }
}
::v-deep .note {
  margin-bottom: 10px;
  flex-grow: 1;
  > label {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    > span {
      display: block;
    }
  }
}
</style>