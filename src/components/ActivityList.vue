<template>
  <div class="box">
    <div class="auto-play">
      <wd-swipe vertical height="50px">
        <wd-swipe-item v-for="(item, i) in bannerArr" :key="i">
          <div class="bar">
            <span class="nickname">{{ item.nickname }}</span> 刚参加了活动
            <span class="name">{{ item.name }}</span>
          </div>
        </wd-swipe-item>
      </wd-swipe>
      <div class="notice">公告</div>
    </div>

    <div class="new-box">
      <h3>热门活动上线中</h3>
      <div class="new" v-for="(a, i) in ongoingArr" :key="i">
        <div class="new-img">
          <img :src="a.image" />
        </div>
        <div class="foot">
          <div class="title">{{ a.name }}</div>
          <div class="right">立即参与 ></div>
        </div>
      </div>
    </div>

    <div class="old-box">
      <h3>往期回顾</h3>
      <div class="old" v-for="(b, i) in endyArr" :key="i">
        <div class="old-img">
          <img :src="b.image" />
        </div>
        <div class="old-foot">
          <div class="old-title">{{ b.name }}</div>
          <div class="old-right">查看详情 ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from "lodash-es";

export default {

  props: {
    // bannerArr: Array,
    // endyArr: Array,
    // ongoingArr: Array,
  },
  data() {
    return {
      bannerArr: [],
      ongoingArr: [],
      endyArr: [],
    }
  },
  created() {
    this.getActivity = debounce(this.getActivity)
  },
  mounted() {
    this.getActivity()
  },
  methods: {
    getActivity() {
      this.$axios
        .get(
          `https://apis.netstart.cn/douguo/home/events/getlists?offset=0limit=20`
        )
        .then(({ data }) => {
          this.bannerArr = data.data.banner;
          this.endyArr = data.data.ended.events;
          this.ongoingArr = data.data.ongoing.events;
          // console.log(data.data);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.auto-play {
  position: relative;
  margin: 15px auto;
  width: 94vw;
  height: 50px;
  border-radius: 3px;

  .notice {
    position: absolute;
    top: 17px;
    left: 16px;
  }
}

.bar {
  display: flex;
  align-items: center;
  width: 94vw;
  height: 50px;
  padding-left: 53px;
  font-size: 15px;
  background-color: #f5f5f5;
  overflow: hidden; //隐藏文字
  text-overflow: ellipsis; //显示 ...
  white-space: nowrap; //不换行

  .nickname {
    margin-right: 3px;
    font-weight: 700;
  }

  .name {
    margin-left: 3px;
    overflow: hidden; //隐藏文字
    font-weight: 700;
    text-overflow: ellipsis; //显示 ...
    white-space: nowrap; //不换行
  }
}

.notice {
  width: 30px;
  height: 20px;
  line-height: 20px;
  border-radius: 5px;
  font-size: 12px;
  font-weight: 600;
  text-align: center;
  background-color: #ffc533;
}

.new-box {
  padding-bottom: 20px;

  h3 {
    margin-left: 15px;
    font-size: 20px;
    font-weight: 700;
  }

  .new {
    width: 94vw;
    margin-bottom: 20px;

    .new-img {
      width: 94vw;
      margin: 20px 15px;

      img {
        width: 100%;
      }
    }

    .foot {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .title {
        margin-left: 15px;
        overflow: hidden;
        font-size: 18px;
        font-weight: 700;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      .right {
        font-size: 15px;
        color: #78aeb5;
        white-space: nowrap;
      }
    }
  }
}

h3 {
  margin-left: 15px;
  font-size: 20px;
  font-weight: 700;
}

.old-box {
  padding-bottom: 50px;

  .old {
    width: 94vw;
    margin-top: 15px;
    margin-bottom: 20px;

    .old-img {
      width: 94vw;
      margin: 20px 15px;

      img {
        width: 100%;
      }
    }

    .old-foot {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .old-title {
        margin-left: 15px;
        overflow: hidden;
        font-size: 18px;
        font-weight: 700;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      .old-right {
        font-size: 15px;
        color: #78aeb5;
        white-space: nowrap;
      }
    }
  }
}
</style>