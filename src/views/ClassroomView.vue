<template>
  <div class="about">

    <div class="box">
      <h3>用户教学视频:</h3>
    </div>
    <wd-pull-refresh v-model="isLoading" @refresh="refresh" tip-text="刷新成功" top-pull-text>
      <div class="video-bar" v-for="(v,i) in videoList" :key="i">
        <div class="user">
          <div class="user-img">
            <img :src="v.r?.a.p" />
          </div>
          <div class="user-name">{{ v.r?.a.n }}</div>
          <div class="user-lv">LV.{{ v.r?.a.lvl }}</div>
        </div>

        <div class="vidio-list" v-if="v.r" @click="getRecipeDetails, (recipeId = v.r.id)">
          <img :src="v.r.p" />
          <span class="icon"><img src="../assets/res/drawable-xxhdpi-v4/icon_course_sub_play_gray.png" /></span>
        </div>
        <div class="stdname">{{ v.r?.stdname ? v.r?.stdname + ':' : ''}}</div>
        <div class="n" style="margin-bottom: 10px;">{{ v.r?.n }}</div>
      </div>
      <wd-infinite-load ref="loadmore" @loadmore="getVideoList"></wd-infinite-load>
    </wd-pull-refresh>
  </div>
</template>

<script>
import { debounce } from "lodash-es";
export default {
  data() {
    return {
      recipeId: null,
      recipe: {},
      videoList: [],
      offset: 10,
      limit: 20,
      timer: null,
      time: Infinity,
      loading: false,
      isLoading: false,
      list: []
    }
  },
  created() {
    this.getVideoList = debounce(this.getVideoList)
  },
  mounted() {
    this.getVideoList()
  },
  computed: {
    getRecipeId() {
      return `https://apis.netstart.cn/douguo/recipe/detail/${this.recipeId}`;
    },
  },
  watch: {
    getRecipeId(newVal) {
      this.getRecipeDetails(newVal);
    },
  },
  methods: {
    async getRecipeDetails() {
      let a = this.getRecipeId;
      let data = await this.$axios.get(a);

      // this.recipe = data.data.result.recipe;
      // console.log(data.data);
      this.recipe = data.data.result.recipe;
      this.recipe = JSON.stringify(this.recipe)
      sessionStorage.setItem("recipe", this.recipe);

      this.$router.push({
        path: "/menu",
      });
    },
    getVideoList() {
      this.loading = true;
      if (this.time) {
        this.timer = setTimeout(() => {
          this.offset++;
          this.limit++;
        }, 1000);

        this.$axios
          .get(`https://apis.netstart.cn/douguo/home/videos/${this.offset}/${this.limit}`)
          .then(({ data }) => {
            this.videoList = data.result.list
            this.videoList.push(...data.result.list)
            console.log(this.videoList);
            this.loading = false;
            // 模拟请求，请求3次，3次结束后设置加载结束
            this.time--;
          })
      }

    },
    refresh() {
      setTimeout(() => {
        this.offset++;
        this.limit++;
      }, 1000)

      this.$axios
        .get(`https://apis.netstart.cn/douguo/home/videos/${this.offset}/${this.limit}`)
        .then(({ data }) => {
          this.list = data.result.list
          this.isLoading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.about {
  padding-top: 50px;
  padding-bottom: 55px;
}

.box {
  width: 100vw;
  height: 45px;
  position: fixed;
  top: 0;
  left: 0;
  background: #fff;
  z-index: 1;

  h3 {
    font-weight: 700;
    font-size: 20px;
    top: 50%;
    transform: translate(10px, 10px);
  }
}

.video-bar {

  .user {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    margin-top: 15px;
    padding: 0 10px;

    .user-img {
      width: 30px;
      height: 30px;
      border-radius: 999px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
      }
    }

    .user-name {
      margin: 0 5px;
      font-size: 13px;
      font-weight: 600;
    }

    .user-lv {
      margin-left: 4px;
      color: #dcc27b;
      font-size: 12px;
      font-weight: 200;
    }
  }

  .vidio-list {
    position: relative;
    width: 100vw;
    margin-bottom: 15px;

    .icon {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 35px;
      height: 35px;
    }

    img {
      width: 100%;
    }
  }

  .stdname {
    font-weight: 600;
    margin-top: 5px;
    margin-bottom: 5px;
  }
}
</style>
