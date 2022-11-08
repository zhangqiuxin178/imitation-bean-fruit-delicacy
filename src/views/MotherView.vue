<template>
    <div>
        <div class="search-bar">
            <div class="search">
                <p class="return" @click="$router.push({ path: '/' })"></p>
            </div>
        </div>
        <div class="title-img">
            <img :src="mother.topic.image">
        </div>
        <div class="title">{{mother.topic.name}}</div>
        <div class="title-list">参与用户:</div>

        <div class="list" v-for="(m,i) in mother.list" :key="i">


            <div class="list-img" @click="getRecipeDetails,(noteId = m.note.id)">
                <img :src="m.note.image_u">
            </div>
            <div class="user">
                <div class="user-one">
                    <div class="user-img">
                        <img :src="m.note.author.p" />
                    </div>
                    <div class="user-name">{{ m.note.author.n }}</div>
                    <div class="user-lv">LV.{{ m.note.author.lvl }}</div>
                </div>
            </div>
            <div class="list-title">{{ m.note.title }}</div>


        </div>


    </div>
</template>

<script>
export default {
    data() {
        return {
            noteId: null,
            note: {}
        }
    },
    computed: {
        mother() {
            let motherList = sessionStorage.getItem("mother");
            let mother = JSON.parse(motherList);
            return mother
        },
        getRecipeId() {
            return `https://apis.netstart.cn/douguo/note/detail/${this.noteId}`;
        },
    },
    watch: {
        getRecipeId(newVal) {
            this.getRecipeDetails(newVal);
        },
    },
    methods: {
        async getRecipeDetails() {
            let c = this.getRecipeId;
            let data = await this.$axios.get(c);


            this.note = data.data.result.note;
            console.log(this.note);
            this.note = JSON.stringify(this.note)
            sessionStorage.setItem("note", this.note);
            // console.log(data.data);

            this.$router.push({
                path: "/note",
            });
        },
    }
}
</script>

<style lang="scss" scoped>
.search-bar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 50px;
    background-color: white;

    .search {
        width: 100%;
        height: 100%;

        .return {
            width: 20px;
            height: 20px;
            margin-top: 16px;
            background-image: url(../assets/res/drawable-xxhdpi-v4/icon_back_black.png);
            background-size: 20px 20px;
            background-repeat: no-repeat;
            background-position: center center;
            margin-left: 10px;
        }
    }
}

.title-img {
    padding-top: 50px;
    width: 100vw;
    margin-bottom: 15px;

    img {
        width: 100%;
    }
}

.title,
.title-list {
    margin-bottom: 15px;
    font-size: 18px;
    font-weight: 700;
}

.list {
    margin-bottom: 15px;
    margin-left: 6px;

    .list-img {
        width: 100vw;

        img {
            width: 100%;
        }
    }

    .list-title {
        margin-bottom: 15px;
        font-size: 17px;
    }
}

.user {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 15px;
    margin-left: 6px;
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

}
</style>