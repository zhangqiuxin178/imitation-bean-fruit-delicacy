<template>
  <div class="box">
    <div class="search-bar">
      <div class="search">
        <p class="return" @click="$router.push({ path: '/' })"></p>
        <div class="ipt-box">
          <span class="search-mirror"><img src="../assets/res/drawable-xxhdpi-v4/icon_menu_search.png" /></span>
          <input type="search" ref="value" placeholder="家常菜" v-model.trim="keywords" />
        </div>
      </div>
      <div class="cancel" @click="getCookbook">搜索</div>
    </div>

    <div class="hot-box" v-if="!keywords">




      <div class="history-search">
        <div class="search-box">
          <div class="title">历史搜索</div>
          <img src="../assets/res/drawable-xxhdpi-v4/icon_menu_delete.png" alt="删除历史记录" class="del" @click="del">
        </div>
        <ul class="history-list">
          <li class="history-item" v-for="(item,index) in historyList" :key="index"
            @click="goCookbook,(ks = item)">{{item}}</li>
        </ul>
      </div>


      <h3>热门搜索</h3>
      <div class="hot-search">
        <div class="search-category" v-for="(l, i) in searchArr" :key="i" @click="goCookbook, (ks = l.title)">
          {{ l.title }}
        </div>
      </div>
    </div>

    <ul class="list" v-if="keywords">
      <li class="item" v-for="(s, i) in searchStrArr" :key="i" @click="getCookbook, (keywordsStr = s.name)">
        <span class="it-o">{{ s.name }}</span><span class="it-t" v-if="s.tag" :style="{
          backgroundColor: s.tag.background_color,
          border: '1px solid s.tag.border_color',
          borderRadius: '999px',
          width: '60px',
          height: '25px',
          lineHeight: '25px',
          textAlign: 'center',
          color: s.tag.text_color,
        }">{{ s.tag.name }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { debounce } from "lodash-es";

export default {
  data() {
    return {
      keywords: "",
      keywordsStr: "",
      ks: '',
      list: false,
      searchArr: [],
      searchStrArr: [],
      cookbookList: {},
      cookObj: {},
      historyList: [],
      search_val: '',
    };
  },
  computed: {
    getkeywords() {
      return `https://apis.netstart.cn/douguo/recipe/search/suggests?kw=${this.keywords}`;
    },
    getCookbookList() {
      // this.keywordsStr
      return `https://apis.netstart.cn/douguo/recipe/search?keyword=${this.keywordsStr}&order=0&type=0&offset=0&limit=20`;
    },
    goCookbookList() {
      // this.keywordsStr
      return `https://apis.netstart.cn/douguo/recipe/search?keyword=${this.ks}&order=0&type=0&offset=0&limit=20`;
    },
  },
  watch: {
    getkeywords(newVal) {
      this.getdata(newVal);
    },
    getCookbookList(newVal) {
      this.getCookbook(newVal);
    },
    goCookbookList(newVal) {
      this.goCookbook(newVal)

    }

  },

  created() {
    this.getSearch = debounce(this.getSearch);
    // 定义数组接收本地存储的历史记录
    let a = localStorage.historyList;
    if (a) {
      // 将数组转字符串
      this.historyList = JSON.parse(a);
    }
  },

  mounted() {
    this.getSearch();

  },
  methods: {
    getSearch() {
      this.$axios
        .get("https://apis.netstart.cn/douguo/recipe/search/hot")
        .then(({ data }) => {
          this.searchArr = data.result.suggestdetails;
          //   console.log(this.searchArr);
        });
    },
    async getdata() {
      let b = this.getkeywords;
      let { data } = await this.$axios.get(b);
      this.searchStrArr = data.result.suggests;
      // console.log(this.searchStrArr);
    },
    async getCookbook() {
      this.keywordsStr = this.$refs.value.value


      //判断是否有重复
      let index = this.historyList.findIndex(ele => {
        return ele == this.keywordsStr;
      });
      //如果有的话就删除重复
      if (index != -1) {
        this.historyList.splice(index, 1);
      }
      //向数组第一位添加
      this.historyList.unshift(this.keywordsStr);

      // 本地存储历史记录数组
      localStorage.historyList = JSON.stringify(this.historyList);

      let k = this.getCookbookList;
      let { data } = await this.$axios.get(k);
      this.cookbookList = data.result;
      // console.log(this.cookbookList);
      // 转成字符串 储存到本地数据
      this.cookbookList = JSON.stringify(this.cookbookList);
      sessionStorage.setItem("cookbookList", this.cookbookList);

      this.$router.push({
        path: "/cookbook",
      }).catch(err => {
        console.log('输出报错', err)
      })

    },
    async goCookbook() {
      //判断是否有重复
      let index = this.historyList.findIndex(ele => {
        return ele == this.ks;
      });
      //如果有的话就删除重复
      if (index != -1) {
        this.historyList.splice(index, 1);
      }
      //向数组第一位添加
      this.historyList.unshift(this.ks);

      // 本地存储历史记录数组
      localStorage.historyList = JSON.stringify(this.historyList);



      let v = this.goCookbookList;
      let { data } = await this.$axios.get(v);
      this.cookObj = data.result;
      console.log(this.cookObj);
      // 转成字符串 储存到本地数据
      this.cookObj = JSON.stringify(this.cookObj);
      sessionStorage.setItem("cookbookList", this.cookObj);

      this.$router.push({
        path: "/cookbook",
      }).catch(err => {
        console.log('输出报错', err)
      })

      
    },
    // 删除本地
    del() {
      this.$nextTick(() => {
        localStorage.clear();
        this.historyList = [];
      })

    },
  }
}
</script>

<style lang="scss" scoped>
.search-bar {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;

  .cancel {
    margin-top: 7px;
  }

  .search {
    position: relative;
    display: flex;

    .return {
      width: 20px;
      height: 20px;
      margin-top: 16px;
      background-image: url(../assets/res/drawable-xxhdpi-v4/icon_back_black.png);
      background-size: 20px 20px;
      background-repeat: no-repeat;
      background-position: center center;
    }

    .ipt-box {
      margin: 10px 0 0 45px;

      .search-mirror {
        position: absolute;
        width: 20px;
        height: 20px;
        left: 70px;
        top: 17px;

        img {
          width: 100%;
        }
      }

      input {
        width: 235px;
        height: 35px;
        border-radius: 5px;
        padding-left: 25px;
        background: #eee;
      }
    }
  }
}

h3 {
  margin-top: 20px;
  font-weight: 700;
}

.search-box {
  display: flex;
  align-items: center;
  justify-content: space-between;

  .title {
    margin-top: 20px;
    font-weight: 700;
  }

  .del {
    width: 25px;
    height: 25px;
  }

}


.history-list {
  display: flex;
  width: 100vw;
  margin-top: 15px;

  .history-item {
    height: 25px;
    line-height: 25px;
    padding: 0 10px;
    margin-left: 5px;
    border-radius: 5px;
    text-align: center;
    background-color: #eee;
  }
}

.hot-search {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;

  .search-category {
    height: 30px;
    margin-top: 10px;
    margin-left: 15px;
    padding: 0 20px;
    line-height: 30px;
    white-space: nowrap;
    text-align: center;
    background: #eee;
    border-radius: 5px;

    &:nth-child(-n + 5) {
      background: #ffffff;
      color: #e2483c;
      border: 1px solid #e2483c;
    }
  }
}

.list {
  list-style: none;
  width: 94vw;
  margin: 0 auto;

  .item {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 30px;
    line-height: 30px;
    margin-top: 15px;
    border-bottom: 1px solid #777;
  }
}
</style>