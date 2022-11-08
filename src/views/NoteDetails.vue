<template>
  <div class="about">
    <div class="top">
      <div class="return" @click="$router.go(-1)"></div>

      <div class="user">
        <div class="user-box">
          <div class="user-img">
            <img :src="note?.author.p" />
          </div>
          <div class="user-lv">
            <div class="user-name">
              <div class="user-lv-item">
                {{ note?.author.n }}<span>LV.{{ note?.author.lvl }}</span>
              </div>
              <p class="day">{{ note?.straight_text }}</p>
            </div>
          </div>
        </div>
      </div>

      <div class="note-box">
        <div class="note-ellipsis">关注</div>
        <div class="note-r"></div>
      </div>
    </div>

    <wd-swipe @change="handleItemChange" :autoplay="false" class="auto-play-box">
      <wd-swipe-item v-for="(item, i) in note?.images" :key="i">
        <div class="auto-play">
          <img :src="item.u" />
        </div>
      </wd-swipe-item>
      <template #indicators>
        <div class="custom-indicators">
          {{ customIndex + 1 }}/ {{ note?.images.length }}
        </div>
        <p class="custom-item">{{ note.selection_text }}</p>
      </template>
    </wd-swipe>

    <h3 class="title">{{ note?.title }}</h3>

    <div class="content">
      {{ note?.contents[0]?.c
      }}<span class="content-it" v-if="note?.contents[1]">{{
      note?.contents[1]?.c
      }}</span>

      <div class="count-box">
        <div class="time">发布时间:{{ note?.publishtime }}</div>
        <div class="count">
          <p class="collection">{{ note?.favo_count }}次收藏</p>
          <p class="count-num">{{ note?.like_count }}次赞</p>
        </div>
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
        <span class="collection">赞</span>
      </div>
      <div class="transmission-list">
        <p class="transmission-icon"></p>
        <span class="transmission">收藏</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      customIndex: 0,
    };
  },
  computed: {
    note() {
      let recipeList = sessionStorage.getItem("note");
      let note = JSON.parse(recipeList);
      return note
    },
  },
  methods: {
    handleItemChange(index) {
      this.customIndex = index;
    },
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
  z-index: 10;
  background-color: rgb(255, 255, 255, 1);
  margin-bottom: 20px;

  .user {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-right: 105px;

    .user-box {
      margin-left: 5px;
      display: flex;
      align-items: center;
    }

    .user-name {
      font-size: 14px;
      color: #000;
    }

    .user-lv {
      margin-left: 3px;
      font-size: 12px;
      color: #d5b560;

      .user-lv-item {
        font-size: 12px;

        span {
          margin-left: 3px;
          font-size: 12px;
          color: #d5b560;
        }
      }

      .day {
        margin-top: 3px;
        color: #777;
        font-size: 12px;
      }
    }

    .user-img {
      width: 25px;
      height: 25px;
      border-radius: 999px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .return {
    width: 20px;
    height: 20px;
    background-image: url(../assets/res/drawable-xxhdpi-v4/microapp_m_lefterbackicon_titlebar_light.png);
    background-size: 20px 20px;
    background-repeat: no-repeat;
    background-position: center center;
  }

  .note-box {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .note-ellipsis {
      width: 60px;
      height: 25px;
      margin-right: 5px;
      line-height: 25px;
      font-size: 14px;
      text-align: center;
      border-radius: 15px;
      background-color: #ffc533;
    }

    .note-r {
      width: 20px;
      height: 20px;
      background-image: url(../assets/res/drawable-xxhdpi-v4/icon_menu_more_black.png);
      background-size: 20px 20px;
      background-repeat: no-repeat;
      background-position: center center;
    }
  }
}

.wd-swipe {
  padding-top: 40px;

  .wd-swipe__container {
    padding-top: 40px;
  }
}

.auto-play-box {
  position: relative;
  height: 500px;

  .auto-play {
    width: 100vw;
    height: 500px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .custom-item {
    position: absolute;
    bottom: 20px;
    left: 20px;
    z-index: 10;
    width: 30px;
    height: 15px;
    line-height: 15px;
    font-size: 12px;
    text-align: center;
    background-color: #ffc533;
  }

  .custom-indicators {
    position: absolute;
    bottom: 20px;
    right: 20px;
    width: 40px;
    height: 20px;
    line-height: 20px;
    border: 1px solid #fff;
    border-radius: 999px;
    font-size: 12px;
    color: #fff;
    text-align: center;
  }
}

.title {
  margin-top: 15px;
  margin-bottom: 15px;
  font-size: 18px;
  font-weight: 700;
}

.content {
  font-size: 15px;
  line-height: 25px;
  padding-bottom: 50px;
  white-space: pre-wrap;
}

.content-it {
  color: #50969f;
  font-size: 15px;
}

.count-box {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  margin-bottom: 15px;
  font-size: 12px;
  color: #777;

  .count {
    display: flex;
    justify-content: space-between;
    margin-right: 5px;

    .count-num {
      margin-left: 10px;
    }
  }
}

.foot {
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-evenly;
  position: fixed;
  width: 100vw;
  height: 50px;
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

    .comments {
      margin-left: 5px;
    }
  }

  .collection-list {
    display: flex;
    align-items: center;

    .collection-icon {
      display: inline-block;
      width: 15px;
      height: 15px;
      background-image: url(../assets/res/drawable-xxhdpi-v4/icon_detail_unlike.png);
      background-size: 15px 15px;
      background-repeat: no-repeat;
      background-position: center center;
    }

    .collection {
      margin-left: 5px;
    }
  }

  .transmission-list {
    display: flex;
    align-items: center;

    .transmission-icon {
      display: inline-block;
      width: 15px;
      height: 15px;
      background-image: url(../assets/res/drawable-xxhdpi-v4/icon_friend_unfavorite.png);
      background-size: 15px 15px;
      background-repeat: no-repeat;
      background-position: center center;
    }

    .transmission {
      margin-left: 5px;
    }
  }
}
</style>