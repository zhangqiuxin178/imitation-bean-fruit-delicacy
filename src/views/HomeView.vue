<template>
  <div class="home">
    <div class="search-bar">
      <div class="add">+</div>
      <div class="search">
        <span class="search-mirror"><img src="../assets/res/drawable-xxhdpi-v4/icon_menu_search.png" /></span>
        <input class="input" type="text" @click="$router.push({ path: '/search' })" placeholder="家常菜" />
      </div>
      <div class="but" @click="$router.push({ path: '/recipe' })"></div>
      <span class="ringtones"></span>
    </div>

    <div class="tab-bar">
      <wd-tabs v-model="tab" swipeable>
        <wd-tab v-for="(item, i) in hometabs" :key="i" :title="item.title">

          <AttentionList v-if="tab == 0" />

          <HelloWorld :tab="tab" v-if="tab == 1" />

          <NoteView v-if="tab == 2" />

          <VidioList v-if="tab == 3" />

          <ActivityList v-if="tab == 4" />

          <MotherList v-if="tab == 5" />

          <BakingList v-if="tab == 6" />
        </wd-tab>
      </wd-tabs>
    </div>
  </div>
</template>


<script>
import { debounce } from "lodash-es";
import HelloWorld from "../components/HelloWorld.vue";
import NoteView from "../components/NoteView.vue";
import AttentionList from "../components/AttentionList.vue";
import VidioList from "../components/VidioList.vue";
import ActivityList from "../components/ActivityList.vue";
import MotherList from "../components/MotherList.vue"
import BakingList from '../components/BakingList.vue'

export default {
  data() {
    return {
      loading: false,
      hometabs: [],
      tab: 1,

    };
  },
  components: {
    HelloWorld,
    NoteView,
    AttentionList,
    VidioList,
    ActivityList,
    MotherList,
    BakingList
  },
  created() {
    this.getTabs = debounce(this.getTabs);
  },
  mounted() {
    this.getTabs();
  },

  beforeDestory() {
    clearInterval(this.timer);
  },

  methods: {
    getTabs() {
      this.$axios
        .get("https://apis.netstart.cn/douguo/config.json")
        .then(({ data }) => {
          this.hometabs = data.result.hometabs.tabs;

          this.hometabs[5].title = '话题'
          // console.log(this.hometabs);

        });
    },

  },
};
</script>

<style lang="scss" scoped>
.search-bar {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 40px;
  z-index: 1;
  margin: 0 auto;
  background-color: white;

  .add {
    width: 25px;
    height: 25px;
    line-height: 20px;
    text-align: center;
    font-size: 26px;
    font-weight: 700;
    background: rgb(255, 204, 0);
    border-radius: 999px;
  }

  .but {
    width: 30px;
    height: 30px;
    background-image: url(../assets/res/drawable-xxhdpi-v4/icon_menu_food_kinds.png);
    background-size: 30px 30px;
    background-repeat: no-repeat;
    background-position: center center;
  }

  .ringtones {
    width: 30px;
    height: 30px;
    background-image: url(../assets/res/drawable-xxhdpi-v4/icon_menu_message.png);
    background-size: 30px 30px;
    background-repeat: no-repeat;
    background-position: center center;
  }

  .search {
    position: relative;

    .search-mirror {
      position: absolute;
      width: 20px;
      height: 20px;
      left: 5px;
      top: 3px;

      img {
        width: 100%;
      }
    }

    .input {
      width: 210px;
      height: 24px;
      padding-left: 25px;
    }
  }
}


:deep(.wd-tabs__nav) {
  height: 42px;
  overflow: hidden;
  position: fixed;
  top: 40px;
  left: 0;
  z-index: 1;
}

:deep(.wd-tabs__container) {
  padding-top: 80px;
}
</style>
