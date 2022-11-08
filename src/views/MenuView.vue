<template>
  <div class="recipe-box" :style="{ backgroundColor: headColor }" v-if="recipe">
    <div class="top">
      <div class="return" @click="$router.go(-1)"></div>
      <div class="recipe-box">
        <div class="recipe-pyq"></div>
        <div class="recipe-wx"></div>
        <div class="recipe-r"></div>
      </div>
    </div>

    <!-- {{ this.$route.query }} -->
    <div class="recipe-img">
      <video v-if="recipe.vfurl" :src="recipe.vfurl" width="100%" height="100%" controls></video>
      <img v-else-if="!recipe.vfurl" @click="toggle" :src="recipe.photo_path" />
    </div>

    <h3 class="title">{{ recipe.title }}</h3>
    <div class="user" v-if="recipe.user.avatar_medium">
      <div class="user-box" v-if="recipe.user.avatar_medium">
        <div class="user-img" v-if="recipe.user.avatar_medium">
          <img :src="recipe.user.avatar_medium ? recipe.user.avatar_medium : ''" />
        </div>

        <div class="user-name">{{ recipe.user.nickname }}</div>
        <div class="user-lv">LV.{{ recipe.user.lvl }}</div>
      </div>
      <div class="user-ellipsis">关注</div>
    </div>
    <div class="cookstory">{{ recipe.cookstory }}</div>
    <div class="activity" v-if="recipe.cookstorys[1]">
      {{ recipe.cookstorys[1].c }}
      <a v-if="recipe.cookstorys[2]" :href="recipe.cookstorys[2].u" class="ac-sp">{{ recipe.cookstorys[2].c }}</a>
    </div>
    <div class="time">
      <div class="time-one">
        <span class="sp-i"><img :src="recipe.cook_time_image" /></span>{{ recipe.cook_time }}
      </div>
      <div class="time-two" v-if="recipe.cook_difficulty_image">
        <span class="sp-i"><img :src="recipe.cook_difficulty_image" /></span>{{ recipe.cook_difficulty }}
      </div>
    </div>

    <div class="lngredients">
      <div class="lngredients-bar">
        <span style="font-weight: 700">食材清单</span><span style="font-size: 12px; color: #67a3ac">加入购物清单</span>
      </div>

      <div class="lngredients-list" v-for="l in recipe.major" :key="l.title">
        <a class="lngredients-a" :href="l.tu">{{ l.title }}</a>
        <span class="lngredients-item">{{ l.note }}</span>
      </div>
    </div>

    <div class="steps">
      <div class="steps-bar">
        <span style="font-weight: 700">烹饪步骤</span><span style="font-size: 12px; color: #67a3ac">点击图片进入烹饪模式</span>
      </div>
      <div class="steps-list" v-for="a in recipe.cookstep" :key="a.position">
        <div class="steps-num">
          步骤{{ a.position }} / {{ recipe.cookstep.length }}
        </div>
        <div class="steps-img" @click="$preview({ urls: [a.image] })">
          <img :src="a.image" />
        </div>
        <div class="steps-item">{{ a.content }}</div>
      </div>
      <p style="color: #b4b4b4; font-size: 12px">{{ recipe.release_time }}</p>
      <div class="but">
        <p class="icon-one" style="width: 32px; height: 32px"></p>
        <span>学传做</span>
      </div>
    </div>

    <div class="foot">
      <input type="text" placeholder="说点什么" />
      <div class="comments-list">
        <span class="comments-icon"></span>
        <span class="comments">评论</span>
      </div>
      <div class="collection-list">
        <span class="collection-icon"></span>
        <span class="collection">收藏</span>
      </div>
      <div class="transmission-list">
        <p class="transmission-icon"></p>
        <span class="transmission">传学做</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    recipe() {
      let recipeList = sessionStorage.getItem("recipe");
      let recipe = JSON.parse(recipeList);
      return recipe;
    },
    headOpacity() {
      let o = Math.floor((1 - this.scorll / 600) * 100) / 100;
      o = o >= 0 ? o : 0;

      return o;
    },
    headColor() {
      let o = this.headOpacity >= 0.6 ? this.headOpacity : 0.6;
      return `rgba(255,255,255,${o})`;
    },
  },
  methods: {
    toggle() {
      this.$preview({
        urls: [this.recipe.photo_path],
      });
    },
    // showSteps() {
    //   this.$preview({
    //     urls: [...this.recipe.cookstep],
    //   });
    // },
  },
};
</script>

<style lang="scss" scoped>
.top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100vw;
  height: 40px;
  position: fixed;
  top: 0;
  left: 0;

  background-color: rgb(255, 255, 255, 1);
  margin-bottom: 20px;

  .return {
    width: 20px;
    height: 20px;
    background-image: url(../assets/res/drawable-xxhdpi-v4/microapp_m_lefterbackicon_titlebar_light.png);
    background-size: 20px 20px;
    background-repeat: no-repeat;
    background-position: center center;
  }

  .recipe-box {
    width: 50vw;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .recipe-pyq {
      width: 20px;
      height: 20px;
      background-image: url(../assets/res/drawable-xxhdpi-v4/icon_menu_pengyouquan_gray.png);
      background-size: 20px 20px;
      background-repeat: no-repeat;
      background-position: center center;
    }

    .recipe-wx {
      width: 20px;
      height: 20px;
      background-image: url(../assets/res/drawable-xxhdpi-v4/icon_menu_weixin_gray.png);
      background-size: 20px 20px;
      background-repeat: no-repeat;
      background-position: center center;
    }

    .recipe-r {
      width: 20px;
      height: 20px;
      background-image: url(../assets/res/drawable-xxhdpi-v4/icon_menu_more_black.png);
      background-size: 20px 20px;
      background-repeat: no-repeat;
      background-position: center center;
    }
  }
}

.wd-navbar.bar {
  position: fixed;
  top: 0;
  left: 0;
  height: 45px;
  background-color: #fff;
}

.recipe-img {
  width: 100vw;
  height: 50vh;
  margin: 50px 0 15px 0;

  img {
    width: 100%;
    height: 100%;
  }
}

.title {
  margin-bottom: 15px;
  font-size: 25px;
  font-weight: 700;
}

.user {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;

  .user-box {
    margin-left: 5px;
    display: flex;
    align-items: center;
  }

  .user-name {
    font-size: 14px;
    color: #000;
  }

  .user-ellipsis {
    width: 70px;
    height: 30px;
    margin-right: 5px;
    line-height: 30px;
    text-align: center;
    border-radius: 15px;
    background-color: #ffc533;
  }

  .user-lv {
    margin-left: 3px;
    font-size: 12px;
    color: #d5b560;
  }

  .user-img {
    width: 40px;
    height: 40px;
    border-radius: 999px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
    }
  }
}

.activity {
  margin-top: 10px;
  margin-bottom: 15px;

  .ac-sp {
    text-decoration-line: none;
    color: #50969f;
  }
}

.time {
  display: flex;
  justify-content: space-evenly;
  margin-top: 20px;
  margin-bottom: 20px;

  .time-one {
    display: flex;
    align-items: center;
    font-weight: 700;

    .sp-i {
      width: 20px;
      height: 20px;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .time-two {
    display: flex;
    align-items: center;
    font-weight: 700;

    .sp-i {
      width: 20px;
      height: 20px;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}

.lngredients {
  margin-bottom: 20px;

  .lngredients-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .lngredients-list {
    display: flex;
    margin: 20px 0 10px 10px;
    justify-content: space-between;

    .lngredients-a {
      text-decoration-line: none;
      color: #67a3ac;
    }

    .lngredients-item {
      margin-right: 10px;
    }
  }
}

.steps {
  .steps-list {
    margin: 15px 0 20px;
  }

  .steps-item {
    margin-top: 5px;
    margin-left: 5px;
    font-size: 14px;
  }

  .steps-bar {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  .steps-img {
    display: block;
    width: 100vw;
    height: 221px;
    border-radius: 5px;
    overflow: hidden;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .steps-num {
    margin: 8px 0;
    margin-left: 5px;
    font-size: 14px;
    font-weight: 600;
  }
}

.but {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px 10px 70px 10px;
  width: 345px;
  height: 52px;
  line-height: 52px;
  border-radius: 999px;
  text-align: center;
  background-color: #ffc533;

  .icon-one {
    display: inline-block;
    width: 20px;
    height: 20px;
    background-image: url(../assets/res/drawable-xxhdpi-v4/icon_small_upload_note.png);
    background-size: 20px 20px;
    background-repeat: no-repeat;
    background-position: center center;
  }
}

.foot {
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-evenly;
  position: fixed;
  width: 100vw;
  height: 55px;
  bottom: 0;
  left: 0;
  background-color: #fff;

  input {
    width: 125px;
    height: 25px;
    border-radius: 999px;
    padding-left: 10px;
    background-color: #f5f5f5;
  }

  .comments-list {
    display: flex;
    align-items: center;

    .comments-icon {
      display: inline-block;
      width: 15px;
      height: 15px;
      background-image: url(../assets/res/drawable-xxhdpi-v4/icon_all_comment_bottom.png);
      background-size: 15px 15px;
      background-repeat: no-repeat;
      background-position: center center;
    }
  }

  .collection-list {
    display: flex;
    align-items: center;

    .collection-icon {
      display: inline-block;
      width: 15px;
      height: 15px;
      background-image: url(../assets/res/drawable-xxhdpi-v4/icon_friend_unfavorite.png);
      background-size: 15px 15px;
      background-repeat: no-repeat;
      background-position: center center;
    }
  }

  .transmission-list {
    display: flex;
    align-items: center;

    .transmission-icon {
      display: inline-block;
      width: 15px;
      height: 15px;
      background-image: url(../assets/res/drawable-xxhdpi-v4/icon_upload_note_bar.png);
      background-size: 15px 15px;
      background-repeat: no-repeat;
      background-position: center center;
    }
  }
}
</style>