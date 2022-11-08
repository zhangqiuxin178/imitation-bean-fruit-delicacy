<template>
  <div>
    <div>
      <wd-swipe class="auto-play">
        <wd-swipe-item class="auto-play-bar" v-for="item in dataArr" :key="item.t">
          <img :src="item.i" />
        </wd-swipe-item>
      </wd-swipe>

      <div class="content" v-for="(v, i) in contentArr" :key="i">
        <div class="user" v-if="v.r">
          <div class="user-one" v-if="v.r">
            <div class="user-img">
              <img :src="v?.r.a.p" />
            </div>
            <div class="user-name">{{ v?.r.a.n }}</div>
            <div class="user-lv">LV.{{ v?.r.a.lvl }}</div>
          </div>
          <div class="user-ellipsis"></div>
        </div>

        <div class="cuisine-img" v-if="v.r" @click="getRecipeDetails, (recipeId = v?.r.id)"><img :src="v?.r.p" /></div>

        <div class="collection" v-if="v.r">
          <div class="collection-one" v-if="v.r">
            <div class="collection-expression" v-for="(a,i) in v?.r.collect_users" :key="i">
              <div class="collection-img"><img :src="a.p" /></div>
            </div>
            <div class="collection-item">{{ v?.r.fc }}收藏</div>
          </div>

          <div class="collection-num" @click="addFavorite(v?.r.id)" v-if="v.r">
            <i :class="{isCollection: v.collection}"></i>
            <!-- <img v-if="collection" src="../assets/res/drawable-xxhdpi-v4/icon_friend_unfavorite.png">
            <img v-else src="../assets/res/drawable-xxhdpi-v4/icon_friend_favorite.png"> -->
          </div>
        </div>

        <div class="dish-name" v-if="v.r">{{ v.r.stdname }}</div>
      </div>
      <wd-infinite-load ref="loadmore" @loadmore="getLoading" :loading="loading"></wd-infinite-load>
    </div>
  </div>
</template>

<script>
import { debounce } from "lodash-es";
export default {


  props: {
    tab: Number,
  },
  data() {
    return {
      recipeId: null,
      localArr: [],
      collectionId: null,
      recipe: {},
      collection: true,
      collectionArr: [],
      collectioObj: {},
      dataArr: [],
      contentArr: [],
      loading: false,
      index: -1,
      offset: 0,
      limit: 20,
      time: Infinity,
      timer: null
    };
  },
  computed: {
    getRecipeId() {
      return `https://apis.netstart.cn/douguo/recipe/detail/${this.recipeId}`;
    },

  },
  created() {
    this.getLoading = debounce(this.getLoading)
    let a = localStorage.collectionArr;
    if (a) {
      // 将数组转字符串
      this.collectionArr = JSON.parse(a);
    }
    this.addFavorite = debounce(this.addFavorite)
  },
  mounted() {
    this.getLoading()
    this.addFavorite()
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
      this.recipe = data.data.result.recipe;
      this.recipe = JSON.stringify(this.recipe)
      sessionStorage.setItem("recipe", this.recipe);

      this.$router.push({
        path: "/menu",
      });
    },
    addFavorite(id) {
      this.contentArr = this.contentArr.map(item => {
        if (item.r.id === id) {
          item.collection = !item.collection
          return item;
        }
        return item;
      })

      let c = this.contentArr

      //       .filter(i => {

      // return i.collection === true
      // // if (i.collection === true) {
      // //   if (i.r != null) {
      // //     this.collectionArr.unshift(i.r)
      // //     localStorage.collectionArr = JSON.stringify(this.collectionArr)
      // //   }
      // // }
      // })

      c.forEach(c => {
        if (c.collection === true) {
          if (this.collectionArr.indexOf(c.r.id) == -1) {

            this.collectionArr.unshift(c.r)
            c.r.fc++
            // let e = c.collection
            // localStorage.e = JSON.stringify(e)
            localStorage.collectionArr = JSON.stringify(this.collectionArr)
          }
        } else {
          // let a = localStorage.collectionArr;
          // if (a) {
          //   // 将数组转字符串
          //   this.collectionArr = JSON.parse(a);
          // }
          delete this.collectionArr.filter(i => i.r.id !== id)
          localStorage.collectionArr = JSON.stringify(this.collectionArr)
          console.log(this.collectionArr);
        }
      })




      // console.log(this.collectionArr);

      // this.contentArr.forEach(a => {
      //   if(a.collection === true) {
      //     this.contentArr.unshift(a)
      //     localStorage.contentArr = JSON.stringify(this.contentArr)
      //   }
      // })
    },

    

    getLoading() {
      this.loading = true;

      if (this.time) {
        this.timer = setTimeout(() => {
          this.offset++;
          this.limit++;
        }, 1000);

        this.$axios
          .get(
            `https://apis.netstart.cn/douguo/home/recommended/${this.offset}/${this.limit}`
          )
          .then(({ data }) => {

            this.dataArr = data.result.banner;


            let a = data.result.list.filter(i => i.r)

            // this.contentArr = this.contentArr.map(item => {
            //   if (item.collection === undefined) {
            //     item.collection = false;
            //     return item
            //   }
            // })

            let b = a.map(item => {
              if (item.collection === undefined) {
                item.collection = false;
                return item
              }
            })

            this.contentArr.push(...b);
            // console.log(this.contentArr);


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
.tab-bar {
  margin-top: 20px;

  .classify {
    display: flex;
    overflow: auto;

    .classify-item {
      margin: 0 13px 0 5px;
      font-size: 15px;
      white-space: nowrap;
    }

    &::-webkit-scrollbar {
      display: none;
    }

    .active {
      font-size: 18px;
      font-weight: 700;
      border-width: 18px;
      border-bottom: 3px solid #fc0;
    }
  }
}

.auto-play {
  width: 100vw;
  height: 170px;
  margin-top: 15px;

  .auto-play-bar {
    width: 100%;
    height: 100%;

    img {
      width: 100%;
      height: 100%;
    }
  }
}

.content {
  width: 100vw;
  margin-top: 20px;

  .user {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 15px;
    white-space: nowrap;
    align-items: center;
    justify-content: space-between;

    .user-one {
      display: flex;
      align-items: center;

      .user-lv {
        font-size: 12px;
        color: #d7b969;
      }

      .user-name {
        margin: 0 3px;
      }

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
    }

    .user-ellipsis {
      width: 20px;
      height: 20px;
      background-image: url(../assets/res/drawable-xxhdpi-v4/icon_menu_more_black.png);
      background-size: 20px 20px;
      background-repeat: no-repeat;
      background-position: center center;
    }
  }
}

.cuisine-img {
  width: 100vw;

  img {
    width: 100%;
  }
}

.collection {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;

  .collection-one {
    display: flex;
    align-items: center;
    position: relative;

    .collection-item {
      flex: 1;
      margin-left: 5px;
      font-size: 12px;
    }

    .collection-img {
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

  .collection-num {
    width: 25px;
    height: 25px;

    // background-image: url(../assets/res/drawable-xxhdpi-v4/icon_friend_unfavorite.png);
    // background-size: 25px 25px;
    // background-repeat: no-repeat;
    // background-position: center center;
    i {
      display: block;
      width: 25px;
      height: 25px;
      background-image: url(../assets/res/drawable-xxhdpi-v4/icon_friend_unfavorite.png);
      background-size: 25px 25px;
      background-repeat: no-repeat;
      background-position: center center;
    }

    .isCollection {
      display: block;
      width: 25px;
      height: 25px;
      background-image: url(../assets/res/drawable-xxhdpi-v4/icon_friend_favorite.png);
      background-size: 25px 25px;
      background-repeat: no-repeat;
      background-position: center center;
    }


    img {
      width: 100%;
      height: 100%;
    }
  }


}
</style>
