
<template>
  <Layout>
    <div class="topWrapper">
      <div class="mouthData">
        <button>
          {{ timeDay()}}
          <Icon name="arrowRight" />
        </button>
        <div class="dataList">
          <div class="data">
            <span class="titleMouth">本月支出</span>
            <span class="account">0</span>
          </div>
          <div class="data">
            <span class="titleMouth">本月收入</span>
            <span class="account">0</span>
          </div>
        </div>
      </div>
    </div>

    <span class="wrapper">
      <Tabs
        classPrefix="type"
        :data-source="recordTypeList"
        :value="type"
        @update:value="onUpdate"
      />
      <ul>
        <li v-for=" (group,index) in groupList " :key="index">
          <h4 class="title">
            {{conversionTime(group.title)}}
            <span>{{group.total}}</span>
          </h4>
          <ol>
            <li class="record" v-for=" item in group.item" :key="item.id">
              <!-- <span>
                <Icon :name="item.tags" />
              </span>-->
              <aside>
                <span>{{tagString(item.tags)}}</span>
                <span>
                  <span class="notes">{{timeFormat(item.createAt)}}</span>
                  <span class="notes">{{item.notes}}</span>
                </span>
              </aside>
              <span>{{item.type}}{{item.amount}}</span>
            </li>
          </ol>
        </li>
      </ul>
    </span>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import Tabs from "@/components/Tabs.vue";
import { Component, Prop } from "vue-property-decorator";
import recordTypeList from "@/constants/recordTypeList";
import dayjs from "dayjs";
import clone from "@/lib/clone";
import Icon from "@/components/Icon.vue";

@Component({
  components: {
    Tabs,
    Icon,
  },
})
export default class Book extends Vue {
  type = "-";
  recordTypeList = recordTypeList;
  timeDay() {
    return dayjs(new Date()).format("YYYY-MM-DD");
  }
  onUpdate(value: string) {
    this.type = value;
    console.log("type", this.type);
  }

  timeFormat(day: string) {
    return dayjs(day).format("HH:mm:ss");
  }

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

  tagString(tags: Tag[]) {
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
    const newList = clone(this.recordList);
    const classesList = newList.filter((t) => {
      return t.type === this.type;
    });
    classesList.sort(
      (a, b) => dayjs(b.createAt).valueOf() - dayjs(a.createAt).valueOf()
    );
    type Result = {
      title: string;
      item: RecordItem[];
      total?: number;
    }[];
    if (classesList.length === 0) {
      return [] as Result;
    }

    const result: Result = [
      {
        title: dayjs(classesList[0].createAt).format("YYYY-MM-DD"),
        item: [classesList[0]],
      },
    ];

    for (let i = 0; i < classesList.length; i++) {
      const current = classesList[i];
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

    // for (let i = 0; i <= newList.length; i++) {
    //   const z = newList[i].tags;
    //   console.log("z", z);

    // }
    console.log(classesList);

    return result;
  }
}
</script>

<style lang="scss" scoped>
%item {
  padding: 8px 16px;
  line-height: 24px;
  display: flex;
  justify-content: space-between;
  align-content: center;
}
.topWrapper {
  background: #ff9400;
  border-radius: 0 0 40px 40px;
  padding-top: 30px;
  .mouthData {
    display: flex;
    align-items: center;
    flex-direction: column;
    background: #fff;
    margin: 0 10px;
    border-radius: 10px;
    padding: 20px;
    > button {
      border: none;
      width: 140px;
      margin: 10px 0;
      background: #f6f6f6;
      padding: 10px;
      border-radius: 6px;
      .icon {
        margin-left: 6px;
      }
    }
    .dataList {
      display: flex;
      justify-content: space-evenly;
      align-items: center;
      width: 300px;
      margin-top: 10px;
      .data {
        display: flex;
        flex-direction: column;
        .titleMouth {
          color: #999;
          font-size: 14px;
        }
        .account {
          color: #333;
          font-weight: 600;
          font-size: 18px;
        }
      }
    }
  }
}
::v-deep .wrapper {
  display: flex;
  flex-direction: column;
  height: 93vh;
  margin-top: 10px;
  > .tabs {
    overflow: auto;
    width: 300px;
    margin: 0 auto;
    margin-bottom: 20px;
    .type-tabs-item {
      border-radius: 8px;
      font-size: 18px;
      color: #999;
      background: #eee;
      height: 54px;
      &.selected {
        border-radius: 8px;
        background: #ff9400;
        color: #fff;
        &::after {
          display: none;
        }
      }
    }
  }
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
