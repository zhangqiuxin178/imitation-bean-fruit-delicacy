<template>
  <div class="about">


    <!-- <div v-for="(a,i) in collectionArr" :key="i"> {{a.r.collect_count_text}}</div> -->




    <h1 style="font-size: 20px; font-weight: 700;margin-left: 10px;margin-top: 10px; margin-bottom: 15px;">豆果推荐</h1>
    <div class="favorites" v-for="(f,i) in favorites" :key="i" @click="getRecipeDetails, (recipeId = f.item_id)">
      <div class="favorites-img">
        <img :src="f.p_gif ? f.p_gif : f.img">
      </div>

      <div class="favorites-r">
        <div class="title">{{ f.trim_title }}</div>
        <div class="like">{{ f.views_count_text }}</div>
        <div class="num">{{ f.collect_count_text }}</div>
        <div class="user">
          <div class="user-img">
            <img :src="f.u.p">
          </div>
          <div class="name">{{ f.u.n }}</div>
        </div>
      </div>
    </div>
    <wd-infinite-load ref="loadmore" @loadmore="getFavorites"></wd-infinite-load>
  </div>
</template>

<script>
import { debounce } from "lodash-es"
export default {
  data() {
    return {
      recipeId: null,
      recipe: {},
      favorites: [],
      loading: false,
      offset: 0,
      limit: 20,
      time: Infinity,
      timer: null,
      collectionArr: []
    }
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
  created() {
    this.getFavorites = debounce(this.getFavorites)
    let a = localStorage.collectionArr;
    if (a) {
      // 将数组转字符串
      this.collectionArr = JSON.parse(a);
    }
    this.addFavorite = debounce(this.addFavorite)
  },
  mounted() {
    this.getFavorites()
  },
  methods: {
    getFavorites() {
      this.loading = true;
      if (this.time) {
        this.timer = setTimeout(() => {
          this.offset++;
          this.limit++;
        }, 1000);

        this.$axios
          .get(`https://apis.netstart.cn/douguo/home/ffeeds/${this.offset}/${this.limit}`)
          .then(({ data }) => {
            this.favorites = data.result.rfs

            this.favorites.push(...data.result.rfs)
            console.log(this.favorites);

            this.loading = false;
            // 模拟请求，请求3次，3次结束后设置加载结束
            this.time--;
          })

      }

    },
    async getRecipeDetails() {
      let a = this.getRecipeId;
      let data = await this.$axios.get(a);

      // this.recipe = data.data.result.recipe;
      console.log(data.data);
      this.recipe = data.data.result.recipe;
      this.recipe = JSON.stringify(this.recipe)
      sessionStorage.setItem("recipe", this.recipe);

      this.$router.push({
        path: "/menu",
      });
    },
  }
}
</script>

<style lang="scss" scoped>
.favorites {
  display: flex;
  width: 94vw;
  margin: 0 auto;
  margin-bottom: 15px;

  .favorites-img {
    width: 125px;
    height: 125px;
    border-radius: 6px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .favorites-r {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: flex-start;
    margin-left: 5px;

    .title {
      font-weight: 700;
      font-size: 13px;
    }

    .like {
      font-size: 12px;
      color: #777;
    }

    .num {
      font-size: 12px;
      color: #777;
    }

    .user {
      display: flex;
      align-items: center;

      .user-img {
        width: 20px;
        height: 20px;
        border-radius: 999px;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .name {
        margin-left: 5px;
        font-size: 13px;
      }
    }
  }




}
</style>