
<template>
  <Layout>
    <div class="topWrapper">
      <div class="mouthDataWrapper">
        <div class="mouthData">
          <button is-link @click="showPopup">
            {{selectDateStr}}
            <Icon name="arrowRight" />
          </button>
          <van-popup
            v-model="show"
            position="bottom"
            :style="{ height: '30%' }"
            round
            get-container="#app"
            overlay
          >
            <van-datetime-picker
              v-model="currentDate"
              type="year-month"
              title="选择年月"
              :min-date="minDate"
              :max-date="maxDate"
              @confirm="onConfirm"
              @cancel="onCancel"
            />
          </van-popup>

          <div class="dataList">
            <div class="data">
              <span class="titleMouth">本月支出</span>
              <span class="account">{{mouthPay.paySum}}</span>
            </div>
            <div class="data">
              <span class="titleMouth">本月收入</span>
              <span class="account">{{mouthPay.incomeSum}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="tabsWrapper">
      <Tabs
        classPrefix="type"
        :data-source="recordTypeList"
        :value="type"
        @update:value="onUpdate"
      />
    </div>
    <span v-if="groupList.length>0" class="wrapper">
      <ul>
        <li v-for=" (group,index) in groupList " :key="index">
          <h4 class="title">
            {{conversionTime(group.title)}}
            <span>{{group.total}}</span>
          </h4>
          <ol>
            <li class="record" v-for=" item in group.item" :key="item.id">
              <ul>
                <li class="iconBg">
                  <Icon :name="item.tags[0] && item.tags[0].iconName" />
                </li>
                <li>
                  <span>{{tagString(item.tags)}}</span>
                  <span>
                    <span class="notes">{{timeFormat(item.createAt)}}</span>
                    <span class="notes">{{item.notes}}</span>
                  </span>
                </li>
              </ul>
              <span>{{item.type}}{{item.amount}}</span>
            </li>
          </ol>
        </li>
      </ul>
    </span>
    <div v-else class="noRecord">
      <Icon name="noRecords" />
      <span>暂无相关信息</span>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import Tabs from "@/components/Tabs.vue";
import { Component, Emit } from "vue-property-decorator";
import { recordTypeList } from "@/constants/recordTypeList";
import dayjs from "dayjs";
import clone from "@/lib/clone";
import Icon from "@/components/Icon.vue";
import { DatetimePicker, Cell, Popup } from "vant";
import "vant/lib/index.css";
Vue.use(DatetimePicker);
Vue.use(Popup);
Vue.use(Cell);

@Component({
  components: {
    Tabs,
    Icon,
    Cell,
    Popup,
    DatetimePicker,
  },
})
export default class Book extends Vue {
  type = "o";
  recordTypeList = recordTypeList;
  show = false;
  minDate = new Date(2020, 0, 1);
  maxDate = new Date(2025, 10, 1);
  currentDate = new Date();
  selectDateStr: string = dayjs(new Date()).format("YYYY-MM");
  @Emit()
  showPopup() {
    this.show = true;
  }
  formatter(type: string, val: string) {
    if (type === "month") {
      return `${val}月`;
    } else if (type === "day") {
      return `${val}日`;
    }
    return val;
  }
  onConfirm(value: Date) {
    this.selectDateStr = dayjs(value).format("YYYY-MM");
    this.show = false;
  }
  onUpdate(value: string) {
    this.type = value;
  }
  timeFormat(day: string) {
    return dayjs(day).format("HH:ss:mm");
  }
  onCancel() {
    this.show = false;
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
    } else {
      return time;
    }
  }

  tagString(tags: Tag[]) {
    // console.log(tags);
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
  get mouthPay() {
    const newList = clone(this.recordList);
    const revenueList = newList.filter(
      (c) => dayjs(c.createAt).toString().indexOf(this.selectDateStr) >= 0
    );

    const paySum = revenueList
      .filter((t) => t.type === "-")
      .reduce((sum, item) => {
        return sum + item.amount;
      }, 0);

    const incomeSum = revenueList
      .filter((t) => t.type === "+")
      .reduce((sum, item) => {
        return sum + item.amount;
      }, 0);

    return { incomeSum, paySum };
  }
  get groupList() {
    const newList = clone(this.recordList);
    const classesList = newList.filter((t) => {
      return this.type === "o" ? true : t.type === this.type;
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
        item: [],
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
  .mouthDataWrapper {
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
      /* box-shadow: 0 10px 30px 0 rgb(0 0 0 / 10%); */
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
}
::v-deep .tabsWrapper {
  background: #fff;
  padding: 10px 0;
  margin-top: 10px;
  .tabs {
    margin-top: 10px;
    overflow: auto;
    width: 300px;
    margin: 0 auto;

    background: #fff;
    .type-tabs-item {
      border-radius: 8px;
      font-size: 18px;
      color: #999;

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

.noRecord {
  margin-top: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #666;
  .icon {
    width: 100px;
    height: 100px;
  }
}
.wrapper {
  display: flex;
  flex-direction: column;
  margin-top: 10px;
}
.title {
  @extend %item;
}
.record {
  border-bottom: 1px solid #eee;
  background: white;
  @extend %item;
  > ul {
    display: flex;
    list-style: none;
    align-items: center;
    .iconBg {
      width: 40px;
      height: 40px;
      background: #fff2e9;
      border-radius: 20px;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-right: 10px;
      .icon {
        fill: #ff9400;
      }
    }
    > li {
      display: flex;
      flex-direction: column;
      .notes {
        margin-right: auto;
        /* margin-left: 16px; */
        color: #999;
      }
    }
  }
}
</style>
