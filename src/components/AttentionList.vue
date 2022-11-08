<template>
  <div class="attention">
    <div class="nav">
      <h3 class="nav-h3">豆果美食,会做饭很酷~</h3>
      <p class="p-one">你关注人的动态会出现在这</p>
      <p class="p-two">为你推荐了一些有趣的人,快关注TA们吧</p>
    </div>

    <div class="content-list">
      <div class="content" v-for="(c, i) in contentArr" :key="i" @click="getRecipeDetails, (recipeId = c.item_id)">
        <div class="content-bar" v-if="c.u">
          <div class="user-img">
            <img :src="c.u.p" />
          </div>
          <div class="user">
            <div class="user-name">
              {{ c.u.n }}<span class="user-lv">LV.{{ c.u.lv }}</span>
            </div>
            <div class="num">
              <span class="num-one">{{ c.u.followers_count_text }}</span> ·
              <span class="num-two">{{ c.u.recipes_count_text }}</span>
            </div>
          </div>
          <div class="us-r">关注</div>
        </div>
        <div class="list-img">
          <img :src="c.p_gif ? c.p_gif : c.img" />
          <span class="img-b" v-if="c.p_gif">
            <img src="../assets/res/drawable-xxhdpi-v4/gdt_ic_native_volume_off.png" />
          </span>
        </div>

        <div class="list-foot">
          <div class="foot-l" v-for="(b, i) in c.collect_users" :key="i">
            <div class="l-img" v-if="b.p">
              <img :src="b?.p" />
            </div>
          </div>
          <p class="collect-num">{{ c.collect_count_text }}</p>
          <div class="right">
            <p class="one"></p>
            <p class="two"></p>
            <p class="three"></p>
          </div>
        </div>
        <div class="title">{{ c.trim_title }}</div>
      </div>
      <wd-infinite-load ref="loadmore" @loadmore="getAttention" ></wd-infinite-load>
    </div>
  </div>
</template>

<script>
import { debounce } from "lodash-es";

export default {
  props: {
    // contentArr: Array,
    // getIndex: Function,
    // loading: Boolean,
  },
  data() {
    return {
      recipeId: null,
      recipe: {},
      contentArr: [],
      loading: false,
      offset: 0,
      limit: 10,
      timer: null,
      time: Infinity,
    };
  },
  created() {
    this.getAttention = debounce(this.getAttention)
  },
  mounted() {
    this.getAttention()
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
    getAttention() {
      this.loading = true;
      if (this.time) {
        this.timer = setTimeout(() => {
          this.offset++;
          this.limit++;
        }, 1000);

        this.$axios
          .get(
            `https://apis.netstart.cn/douguo/home/ffeeds/${this.offset}/${this.limit}`
          )
          .then(({ data }) => {
            this.contentArr = data.result.rfs;

            this.contentArr.push(...data.result.rfs);

            // console.log(this.contentArr);

            this.loading = false;
            // 模拟请求，请求3次，3次结束后设置加载结束
            this.time--;
            // console.log(this.contentArr);
          });
      }

    }
  },
};
</script>


<style lang="scss" scoped>
.nav {
  width: 100vw;
  height: 90px;
  padding: 3px;
  margin-top: 15px;
  margin-bottom: 20px;
  background-color: #fafafa;

  .nav-h3 {
    padding-top: 15px;
    font-weight: 600;
  }

  .p-one {
    padding: 10px 0 0 0;
    margin-bottom: 5px;
    color: #777;
    font-size: 12px;
  }

  .p-two {
    color: #777;
    font-size: 12px;
  }
}

.content-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  margin-bottom: 15px;

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

  .user {
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-left: 5px;

    .user-name {
      font-size: 13px;
      font-weight: 600;

      .user-lv {
        margin-left: 4px;
        color: #dcc27b;
        font-size: 12px;
        font-weight: 200;
      }
    }

    .num {
      color: #777;
      font-size: 12px;
      margin-top: 4px;
    }
  }

  .us-r {
    width: 55px;
    height: 30px;
    line-height: 30px;
    border-radius: 999px;
    text-align: center;
    background-color: #ffc533;
  }
}

.list-img {
  position: relative;
  width: 100vw;
  margin-bottom: 15px;

  img {
    width: 100%;
  }

  .img-b {
    position: absolute;
    right: 15px;
    bottom: 15px;
    width: 25px;
    height: 25px;

    img {
      width: 100%;
      height: 100%;
    }
  }
}

.list-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  margin-bottom: 15px;

  .collect-num {
    flex: 1;
    margin-left: 5px;
    font-size: 12px;
  }

  .foot-l {
    display: flex;

    .l-img {
      width: 20px;
      height: 20px;
      overflow: hidden;
      border-radius: 999px;
    }
  }

  .right {
    display: flex;

    .one {
      width: 20px;
      height: 20px;
      background-image: url(../assets/res/drawable-xxhdpi-v4/icon_friend_unfavorite.png);
      background-size: 20px 20px;
      background-repeat: no-repeat;
      background-position: center center;
    }

    .two {
      width: 20px;
      height: 20px;
      margin: 0 20px;
      background-image: url(../assets/res/drawable-xxhdpi-v4/icon_attention_friend_comment.png);
      background-size: 20px 20px;
      background-repeat: no-repeat;
      background-position: center center;
    }

    .three {
      width: 20px;
      height: 20px;
      background-image: url(../assets/res/drawable-xxhdpi-v4/icon_attention_friend_share.png);
      background-size: 20px 20px;
      background-repeat: no-repeat;
      background-position: center center;
    }
  }
}

.title {
  margin-bottom: 20px;
  padding: 0 10px;
}
</style>