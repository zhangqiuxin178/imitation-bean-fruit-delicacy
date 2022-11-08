<template>
  <div class="vidio">
    <div class="vidio-bar" v-for="(c, i) in vidioArr" :key="i" @click="getRecipeDetails, (recipeId = c.r.id)">
      <div class="user" v-if="c.r">
        <div class="user-img">
          <img :src="c.r.a.p" />
        </div>
        <div class="user-name">{{ c.r.a.n }}</div>
        <div class="user-lv">LV.{{ c.r.a.lvl }}</div>
      </div>
      <div class="vidio-list" v-if="c.r">
        <img :src="c.r.p" />
        <span class="icon"><img src="../assets/res/drawable-xxhdpi-v4/icon_course_sub_play_gray.png" /></span>
      </div>
      <div class="vidio-foot" v-if="c.r">
        <div class="foot-user">
          <div class="foot-user-img" v-for="(a, i) in c.r.collect_users" :key="i">
            <img :src="a.p" />
          </div>
        </div>
        <div class="foot-num">{{ c.r.collect_count_text }}</div>
        <div class="collect"></div>
      </div>
      <div class="foot-title">{{ c.r?.n }}</div>
    </div>
    <wd-infinite-load ref="loadmore" @loadmore="getVideo"></wd-infinite-load>
  </div>
</template>

<script>
import { debounce } from "lodash-es";

export default {
  props: {
    // vidioArr: Array,
  },
  data() {
    return {
      recipeId: null,
      recipe: {},
      vidioArr: [],
      offset: 0,
      limit: 20,
      timer: null,
      time: Infinity,
      loading: false
    };
  },
  created() {
    this.getVideo = debounce(this.getVideo)
  },
  mounted() {
    this.getVideo()
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
    getVideo() {
      this.loading = true;
      if (this.time) {
        this.timer = setTimeout(() => {
          this.offset++;
          this.limit++;
        }, 1000);
        this.$axios
          .get(`https://apis.netstart.cn/douguo/home/videos/${this.offset}/${this.limit}`)
          .then(({ data }) => {
            this.vidioArr = data.result.list;
            this.vidioArr.push(...data.result.list)
            // console.log(this.vidioArr);
            this.loading = false;
            // 模拟请求，请求3次，3次结束后设置加载结束
            this.time--;
          });
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.vidio {
  padding-bottom: 50px;
}

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
    bottom: 15px;
    right: 15px;
    width: 25px;
    height: 25px;
  }

  img {
    width: 100%;
  }
}

.vidio-foot {
  display: flex;
  margin-left: 5px;

  .foot-num {
    flex: 1;
    margin-left: 5px;
    font-size: 12px;
  }

  .foot-user {
    display: flex;

    .foot-user-img {
      width: 20px;
      height: 20px;
      border-radius: 999px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}

.foot-title {
  margin-top: 10px;
  margin-left: 5px;
}

.collect {
  width: 20px;
  height: 20px;
  background-image: url(../assets/res/drawable-xxhdpi-v4/icon_friend_unfavorite.png);
  background-size: 20px 20px;
  background-repeat: no-repeat;
  background-position: center center;
}
</style>