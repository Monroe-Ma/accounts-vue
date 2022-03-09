<template>
  <Layout class-prefix="layout">
    <Output @update:value="onUpdateAmount" :value="record.amount" />
    <Tags @update:value="record.tags = $event" :value="record.tags" />
    <div>
      <button>
        {{ s()}}
        <Icon name="xiajiantou" />
      </button>
      <Tabs class="x" classPrefix="cagney" :data-source="recordTypeList" :value.sync="record.type" />
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
import { Component } from "vue-property-decorator";
import tagStore from "@/store/tagStore";
import recordTypeList from "@/constants/recordTypeList";
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
  recordTypeList = recordTypeList;
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
  s() {
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

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
.cagney-tabs-item {
  background: #fff;
  width: 30% !important;
  border-radius: 40px;
  display: flex;
  justify-content: flex-end;
  &.selected {
    background: #ff9400;
    color: #fff;
    &::after {
      display: none;
    }
  }
}
</style>