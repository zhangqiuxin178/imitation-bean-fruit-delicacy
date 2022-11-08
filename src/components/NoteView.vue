<template>
  <nav>
    <div class="note">
      <div class="note-one">
        <div class="note-top" v-for="(l,i) in notoOneArr" :key="i" @click="getMotherList,(motherId = l.id)">
          <span class="note-img"><img :src="l.icon" /></span>
          <p class="note-item">{{ l.name }}</p>
        </div>
      </div>

      <div class="note-two">
        <div class="note-bottom" v-for="a in notoTwoArr" :key="a.id" @click="getMotherList,(motherId = a.id)">
          <span class="note-img"><img :src="a.icon" /></span>
          <p class="note-item">{{ a.name }}</p>
        </div>
      </div>
    </div>

    <div class="centent">
      <!-- <div
        class="centent-box"
        v-for="(l, i) in dataArr"
        :key="i"
        @click="getNoteDetails, (noteId = l.activity.id)"
      >
        <div class="centent-list" v-if="l.activity">
          <div class="centent-img">
            <img :src="l.activity.image || l.note.image_u" />
            <p class="centent-item">{{ l.activity.name }}</p>
          </div>

          <div class="centent-bottom">
            <div class="bottom-item">
              <span class="sp-img"><img :src="l.activity.author.p" /></span>
              <span class="sp-name">{{ l.activity.author.n }}</span>
            </div>
            <div class="bottom-right-img">
              <span class="right-img"
                ><img :src="l.activity.action_icon"
              /></span>
              <p class="right-name">{{ l.activity.action_title }}</p>
            </div>
          </div>
        </div>
      </div> -->

      <div class="centent-box" v-for="(a,i) in contentArr" :key="i" @click="getNoteDetails, (noteId = a.note.id)">
        <div class="centent-list" v-if="a.note">
          <div class="centent-img">
            <img :src="a.note.image_u" />
          </div>
          <div class="straight-text">{{ a.note?.straight_text }}</div>
          <p class="centent-item">{{ a.note.title }}</p>

          <div class="centent-bottom" v-if="a.note">
            <div class="bottom-item">
              <span class="sp-img"><img :src="a.note.author.p" /></span>
              <span class="sp-name">{{ a.note.author.n }}</span>
            </div>
            <div class="bottom-right" v-if="a.note">
              <p class="right-icon"></p>
              <span class="right-name">{{ a.note.like_count }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <wd-infinite-load ref="loadmore" @loadmore="getNote" :loading="loading"></wd-infinite-load>
    <div class="centent"></div>
  </nav>
</template>

<script>
export default {
  props: {
    // notoOneArr: Array,
    // notoTwoArr: Array,
    // dataArr: Array,
    // contentArr: Array,
    // loading: Boolean,
    // getIndex: Function,
  },
  data() {
    return {
      loading: false,
      noteId: null,
      note: {},
      notoOneArr: [],
      notoTwoArr: [],
      contentArr: [],
      dataArr: [],
      offset: 0,
      limit: 10,
      timer: null,
      time: Infinity,
      motherId: null,
      motherArr: []
    };
  },
  computed: {
    getNoteId() {
      return `https://apis.netstart.cn/douguo/note/detail/${this.noteId}`;
    },
    getMotherId() {
      return `https://apis.netstart.cn/douguo/note/topicdetail/${this.motherId}/0/20`
    }
  },
  watch: {
    getNoteId(newVal) {
      this.getNoteDetails(newVal);
    },
    getMotherId(newVal) {
      this.getMotherList(newVal);
    },
  },
  methods: {
    async getNoteDetails() {
      let b = this.getNoteId;
      let data = await this.$axios.get(b);

      this.note = data.data.result.note;
      // console.log(this.note);
      this.note = JSON.stringify(this.note)
      sessionStorage.setItem("note", this.note);

      this.$router.push({
        path: "/note",
      });
    },
    getNote() {
      this.loading = true;

      if (this.time) {
        this.timer = setTimeout(() => {
          this.offset++;
          this.limit++;
        }, 1000);
        this.$axios
          .get(
            `https://apis.netstart.cn/douguo/home/notes/${this.offset}/${this.limit}`
          )
          .then(({ data }) => {
            this.notoOneArr = data.result.topics[0];
            this.notoTwoArr = data.result.topics[1];

            let m = data.result.list;
            this.dataArr = m.filter((item) => item.activity);
            this.contentArr.push(...m.filter((item) => item.note)); //= m.filter((item) => item.note);
            console.log(this.notoTwoArr);

            this.loading = false;
            // 模拟请求，请求3次，3次结束后设置加载结束
            this.time--;
          });
      }
    },
    async getMotherList() {
      let a = this.getMotherId
      let data = await this.$axios.get(a)

      this.motherArr = data.data.result
      this.motherArr = JSON.stringify(this.motherArr)
      sessionStorage.setItem("mother", this.motherArr)

      console.log(data.data.result);
      this.$router.push({
        path: "/mother",
      });
    }
  },
};
</script>

<style lang="scss" scoped>
.note {
  overflow-x: auto;
  white-space: nowrap;

  .note-one {
    display: flex;
  }

  .note-two {
    display: flex;
    margin-bottom: 10px;
  }

  .note-top,
  .note-bottom {
    display: flex;
    margin-left: 10px;
    padding: 5px 10px;
    border-radius: 10px;
    background-color: #f3f9fa;
    align-items: baseline;
  }

  .note-item {
    color: #68a4ac;
    font-size: 12px;
  }

  .note-img {
    width: 11px;
    height: 10px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  &::-webkit-scrollbar {
    display: none;
  }
}

.centent {
  // margin: 10px;
  column-count: 2;
  column-gap: 10px;
  margin-bottom: 10px;

  .centent-box {
    display: flex;

    .centent-list {
      margin: 10px;

      .straight-text {
        color: #777;
        font-size: 12px;
        margin-bottom: 10px;
      }

      .centent-item {
        margin-bottom: 10px;
        color: #000;
        font-size: 14px;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      .centent-img {
        margin-bottom: 10px;
        border-radius: 5px;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .centent-bottom {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: flex-start;

        .bottom-right-img {
          display: flex;
          align-items: center;
          margin-bottom: 10px;

          .right-img {
            width: 15px;
            height: 15px;

            img {
              width: 100%;
              height: 100%;
            }
          }

          .right-name {
            color: #777;
            font-size: 12px;
          }
        }

        .bottom-item {
          display: flex;
          align-items: center;
          margin-bottom: 10px;

          .sp-name {
            color: #777;
            font-size: 13px;
          }

          .sp-img {
            width: 15px;
            height: 15px;
            margin-right: 5px;
            border-radius: 999px;
            overflow: hidden;

            img {
              width: 100%;
              height: 100%;
            }
          }
        }

        .bottom-right {
          display: flex;
          justify-content: space-between;
          align-items: center;

          .right-icon {
            display: inline-block;
            width: 15px;
            height: 15px;
            background-image: url(../assets/res/drawable-xxhdpi-v4/icon_comment_unlike_2.png);
            background-size: 15px 15px;
            background-repeat: no-repeat;
            background-position: center center;
          }

          .right-name {
            color: #777;
            font-size: 12px;
          }
        }
      }
    }
  }
}
</style>