<template>
  <div id="app">
    <router-view></router-view>
    <nav class="tab-bar" v-if="$route.meta.showNav">
      <router-link class="tab-bar-item icom-home" tag="div" to="/"></router-link>
      <router-link class="tab-bar-item icom-class" tag="div" to="/class"></router-link>
      <!-- <router-link
        class="tab-bar-item icom-shopping"
        tag="div"
        to="/shopping"
      ></router-link> -->
      <router-link class="tab-bar-item icom-favorites" tag="div" to="/favorites"></router-link>
      <router-link class="tab-bar-item icom-mine" tag="div" to="/mine"></router-link>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      collectionArr: [],
      f:null
    }
  },
  watch: {
    $route: function () {
      window.scrollTo(0, 0);
      //document.body.scrollTop = 0;
      //document.documentElement.scrollTop = 0;
    },
  },
  createdc() {
    let a = localStorage.collectionArr;
    // let e = localStorage.e
    // if(e) {
    //   this.f = JSON.parse(e)
    // }
    if (a) {
      // 将数组转字符串
      this.collectionArr = JSON.parse(a);
    }
    //在页面刷新时将vuex里的信息保存到localStorage里
    window.addEventListener("pagehide", () => {
      localStorage.collectionArr = JSON.stringify(this.collectionArr)
      // localStorage.f = JSON.stringify(this.f)
    })
  }
};
</script>

<style lang="scss" scoped>
.tab-bar {
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 55px;
  line-height: 55px;
  text-align: center;
  background-color: white;

  .tab-bar-item {
    flex: 1;
    background-size: 30px 30px;
    background-repeat: no-repeat;
    background-position: center center;

    &.icom-home {
      background-image: url(./assets/res/drawable-xxhdpi-v4/icon_home_cook_normal_image.png);
    }

    &.icom-class {
      background-image: url(./assets/res/drawable-xxhdpi-v4/icon_home_course_normal_image.png);
    }

    &.icom-shopping {
      background-image: url(./assets/res/drawable-xxhdpi-v4/icon_home_note_normal_image.png);
    }

    &.icom-favorites {
      background-image: url(./assets/res/drawable-xxhdpi-v4/icon_home_mall_normal_image.png);
    }

    &.icom-mine {
      background-image: url(./assets/res/drawable-xxhdpi-v4/icon_home_mine_normal_image.png);
    }

    &.router-link-exact-active {
      &.icom-home {
        background-image: url(./assets/res/drawable-xxhdpi-v4/icon_home_cook_image.png);
      }

      &.icom-class {
        background-image: url(./assets/res/drawable-xxhdpi-v4/icon_home_course_image.png);
      }

      &.icom-shopping {
        background-image: url(./assets/res/drawable-xxhdpi-v4/icon_home_note_image.png);
      }

      &.icom-favorites {
        background-image: url(./assets/res/drawable-xxhdpi-v4/icon_home_mall_image.png);
      }

      &.icom-mine {
        background-image: url(./assets/res/drawable-xxhdpi-v4/icon_home_mine_image.png);
      }
    }
  }
}
</style>
