
<template>
  <Layout>
    <Tabs classPrefix="type" :data-source="recordTypeList" :value.sync="type" />
    <Tabs classPrefix="interval" :data-source="intervalList" :value.sync="interval" />
    <ul>
      <li v-for=" (group,index) in groupList " :key="index">
        <h4 class="title">
          {{conversionTime(group.title)}}
          <span>{{group.total}}</span>
        </h4>
        <ol>
          <li class="record" v-for=" item in group.item" :key="item.createAt">
            <aside>
              <span>{{tagString(item.tags)}}</span>

              <span>
                <span class="notes">{{dateFormat(item.createAt)}}</span>
                <span class="notes">{{item.notes}}</span>
              </span>
            </aside>

            <span>{{item.type}}{{item.amount}}</span>
          </li>
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
import dayjs from "dayjs";
import clone from "@/lib/clone";
@Component({
  components: {
    Tabs,
  },
})
export default class Book extends Vue {
  dateFormat(day: string) {
    return dayjs(day).format("MM-DD");
  }
  conversionTime(time: string) {
    const now = dayjs();
    const day = dayjs(time);
    if (day.isSame(now, "day")) {
      return "今天";
    } else if (day.isSame(now.subtract(1, "day"), "day")) {
      return "昨天";
    } else if (day.isSame(now.subtract(2, "day"), "day")) {
      return "前天";
    }
  }

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
  get groupList() {
    const { recordList } = this;
    type Result = {
      title: string;
      item: RecordItem[];
      total?: number;
    }[];
    const newList = clone(recordList).sort(
      (a, b) => dayjs(b.createAt).valueOf() - dayjs(a.createAt).valueOf()
    );
    if (newList.length === 0) {
      return [] as Result;
    }

    const result: Result = [
      {
        title: dayjs(newList[0].createAt).format("YYYY-MM-DD"),
        item: [newList[0]],
      },
    ];
    for (let i = 0; i < newList.length; i++) {
      const current = newList[i];
      const last = result[result.length - 1];
      if (dayjs(last.title).isSame(dayjs(current.createAt), "day")) {
        last.item.push(current);
      } else {
        result.push({
          title: dayjs(current.createAt).format("YYYY-MM-DD"),
          item: [current],
        });
      }
    }
    result.map(
      (group) =>
        (group.total = group.item.reduce((sum, item) => {
          return sum + item.amount;
        }, 0))
    );
    return result;
  }

  type = "-";
  interval = "day";
  intervalList = intervalList;
  recordTypeList = recordTypeList;
}
</script>

<style lang="scss" scoped>
::v-deep {
  .type-tabs-item {
    background: #c4c4c4;
    &.selected {
      background: white;
      &::after {
        display: none;
      }
    }
  }
  .interval-tabs-item {
    height: 48px;
  }
}
%item {
  padding: 8px 16px;
  line-height: 24px;
  display: flex;
  justify-content: space-between;
  align-content: center;
}
.title {
  @extend %item;
}
.record {
  border-bottom: 1px solid #eee;
  background: white;
  @extend %item;
  > aside {
    display: flex;
    flex-direction: column;
    > span {
      .notes {
        margin-right: auto;
        /* margin-left: 16px; */
        color: #999;
      }
    }
  }
}
</style>
