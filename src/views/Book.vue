
<template>
  <Layout>
    <Tabs classPrefix="type" :data-source="recordTypeList" :value.sync="type" />
    <Tabs classPrefix="interval" :data-source="intervalList" :value.sync="interval" />
    <ul>
      <li v-for=" (group,index) in result " :key="index">
        <!-- {{ group}} -->
        <h4>{{group.title}}</h4>
        <ol>
          <li
            v-for=" item in group.items"
            :key="item.createAt"
          >{{tagString(item.tags)}}{{item.createAt}}{{item.type}}{{item.amount}}</li>
        </ol>
      </li>
    </ul>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import Tabs from "@/components/Tabs.vue";
import { Component } from "vue-property-decorator";
import intervalList from "@/constants/intervalList";
import recordTypeList from "@/constants/recordTypeList";

@Component({
  components: {
    Tabs,
  },
})
export default class Book extends Vue {
  tagString(tags: tag[]) {
    if (tags.length === 0) {
      return "无";
    } else {
      return tags.map((item) => item.name).join(",");
    }
  }
  mounted() {
    this.$store.commit("fetchRecords");
  }
  get recordList() {
    return (this.$store.state as RootState).recordList;
  }
  get result() {
    const { recordList } = this;
    console.log("recordList", recordList);
    const hashTable: { [K: string]: { title: string; items: RecordItem[] } } =
      {};
    for (let i = 0; i < recordList.length; i++) {
      const [date, time] = recordList[i].createAt!.split("T");
      // console.log("date", date);

      hashTable[date] = hashTable[date] || { title: date, items: [] };
      // console.log("hashTable[date]", hashTable[date]);

      hashTable[date].items.push(recordList[i]);
    }
    console.log("hashTable", hashTable);

    return hashTable;
  }

  type = "-";
  interval = "day";
  intervalList = intervalList;
  recordTypeList = recordTypeList;
}
</script>

<style lang="scss" scoped>
::v-deep .type-tabs-item {
  &.selected {
    background: #fff;
    &::after {
      display: none;
    }
  }
}
::v-deep .interval-tabs-item {
  height: 48px;
}
</style>