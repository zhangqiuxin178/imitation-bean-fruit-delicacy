<template>
  <nav>
    <div class="top">
      <div class="return" @click="$router.go(-1)"></div>
      <div class="recipe-classification">菜谱分类</div>
      <div class="search" @click="$router.push({ path: '/search' })"></div>
    </div>

    <div class="category">
      <recipe-type :recipeSelectionArr="recipeSelectionArr" :id="id" @setId="setId" />
      <div class="category-list" v-for="(a,i) in recipeSelectionArr" :key="i">
        <div class="box">
          <div class="dishes" v-for="(b,i) in a.cs" :key="i">
            <div class="Cuisine" v-if="id == a.id">
              <div class="Cuisine-img">
                <!-- <img :src="b.image_url" /> -->
                {{ b.name }}
              </div>
              <div class="Cuisine-list">
                <div class="Cuisine-item" v-for="c in b.cs" :key="c.id" @click="getCookbook, (keywordsStr = c.name)">
                  {{ c.name }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { debounce } from "lodash-es";
import RecipeType from "../components/RecipeType.vue";

export default {
  data() {
    return {
      recipeSelectionArr: [],
      id: 1,
      keywordsStr: "",
    };
  },
  components: { RecipeType },
  computed: {
    getCookbookList() {
      // this.keywordsStr
      return `https://apis.netstart.cn/douguo/recipe/search?keyword=${this.keywordsStr}&order=0&type=0&offset=0&limit=20`;
    },
  },
  watch: {
    getCookbookList(newVal) {
      this.getCookbook(newVal);
    },
  },

  created() {
    this.getRecipe = debounce(this.getRecipe);
  },
  mounted() {
    this.getRecipe();
  },
  methods: {
    getRecipe() {
      this.$axios
        .get("https://apis.netstart.cn/douguo/recipe/flatcatalogs")
        .then(({ data }) => {
          this.recipeSelectionArr = data.result.cs;
          console.log(this.recipeSelectionArr);
        });
    },
    setId(id) {
      this.id = id;
    },
    async getCookbook() {
      // this.keywordsStr = this.$refs.value.value

      let k = this.getCookbookList;
      let { data } = await this.$axios.get(k);
      this.cookbookList = data.result;
      console.log(this.cookbookList);
      // 转成字符串 储存到本地数据
      this.cookbookList = JSON.stringify(this.cookbookList);
      sessionStorage.setItem("cookbookList", this.cookbookList);

      this.$router.push({
        path: "/cookbook",
      }).catch(err => {
        console.log('输出报错', err)
      })
    },
  },
};
</script>

<style lang="scss" scoped>
.top {
  display: flex;
  justify-content: space-between;
  width: 100vw;
  height: 40px;
  position: fixed;
  top: 0;
  left: 0;
  background-color: white;
  margin-bottom: 20px;

  .return {
    width: 30px;
    height: 30px;
    background-image: url(../assets/res/drawable-xxhdpi-v4/microapp_m_lefterbackicon_titlebar_light.png);
    background-size: 30px 30px;
    background-repeat: no-repeat;
    background-position: center center;
  }

  .recipe-classification {
    font-size: 18px;
  }

  .search {
    width: 30px;
    height: 30px;
    background-image: url(../assets/res/drawable-xxhdpi-v4/icon_menu_search.png);
    background-size: 30px 30px;
    background-repeat: no-repeat;
    background-position: center center;
  }
}

.category {
  display: flex;
  /* flex-direction: row; */
  margin-top: 40px;
  justify-content: space-around;

  .category-list {
    display: flex;
    // width: 200px;
    margin-top: 10px;
    text-align: center;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;

    .category-item {
      flex: 0 0 100px;
      width: 100px;
      height: 40px;
      line-height: 40px;
      text-align: center;
    }

    .box {
      display: flex;
      flex-direction: column;
      align-content: stretch;
      align-items: baseline;
      height: 40px;

      .Cuisine {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 50px;

        .Cuisine-list {
          display: flex;
          width: 100%;
          // height: 160px;
          flex-wrap: wrap;
          justify-content: space-evenly;
          align-items: flex-start;

          .Cuisine-item {
            border: 1px solid rgb(134, 122, 141);
            background-color: #fff;
            border-radius: 5px;
            width: 100px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            margin-top: 6px;
            font-size: 14px;
            white-space: nowrap;
          }
        }

        .Cuisine-img {
          margin-bottom: 15px;
          font-size: 25px;

          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}
</style>