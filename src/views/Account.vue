<template>
  <Layout class-prefix="layout">
    <Output @update:value="onUpdateAmount" :value="record.amount" />
    <Tags @update:value="record.tags = $event" :value="record.tags" />
    <div class="classesItem">
      <button>
        {{ timeDay()}}
        <Icon name="arrowRight" />
      </button>
      <Tabs classPrefix="cagney" :data-source="recordTypeList" :value.sync="record.type" />
    </div>
    <FormItem class="note" fileName="备注" placeholder="在这里输入备注" :value.sync="record.notes" />
    <NumberPad
      class="x"
      @update:value="onUpdateAmount"
      @submit="saveRecord"
      :value="record.amount"
    />
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import Tags from "@/components/Account/Tags.vue";
import FormItem from "@/components/Account/FormItem.vue";
import NumberPad from "@/components/Account/NumberPad.vue";
import { Component } from "vue-property-decorator";
import tagStore from "@/store/tagStore";
import { writeTypeList } from "@/constants/recordTypeList";
import Tabs from "../components/Tabs.vue";
import Output from "@/components/Account/Output.vue";
import dayjs from "dayjs";

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
  recordTypeList = writeTypeList;
  tags = tagList;
  get recordList() {
    return this.$store.state.count;
  }

  record: RecordItem = {
    tags: [],
    notes: "",
    type: "-",
    amount: 0,
  };
  timeDay() {
    return dayjs(new Date()).format("YYYY-MM-DD");
  }
  created() {
    this.$store.commit("fetchRecords");
  }
  onUpdateNotes(value: string) {
    this.record.notes = value;
  }

  onUpdateAmount(value: number) {
    this.record.amount = value;
  }
  saveRecord() {
    this.$store.commit("createRecord", this.record);
    if (this.$store.state.createRecordError === null) {
      window.alert("已保存");
      this.record.notes = "";
      // this.record.amount = 0;
      // console.log(this.record.amount);
    }
  }
}
</script>

<style lang="scss" scoped>
.classesItem {
  display: flex;
  justify-content: space-evenly;
  background: #fff;
  margin: 10px 0;
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