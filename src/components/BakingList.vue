<template>
    <div class="box">
        <div class="baking-box" v-for="(b,i) in baking" :key="i">
            <div class="user">
                <div class="user-one">
                    <div class="user-img">
                        <img :src="b.r.a.p" />
                    </div>
                    <div class="user-name">{{ b.r.a.n }}</div>
                    <div class="user-lv">LV.{{ b.r.a.lvl }}</div>
                </div>
                <div class="user-ellipsis"></div>
            </div>

            <div class="cuisine-img" @click="getRecipeDetails, (recipeId = b.r.id)"><img :src="b.r.p" /></div>

            <div class="collection">
                <div class="collection-one">
                    <div class="collection-item">{{ b.r.n }}</div>
                </div>

                <div class="collection-num">
                    <i></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { debounce } from "lodash-es";
export default {
    data() {
        return {
            baking: [],
            recipeId: null,
            recipe: {}
        }
    },
    computed: {
        getRecipeId() {
            return `https://apis.netstart.cn/douguo/recipe/detail/${this.recipeId}`;
        },
    },
    created() {
        this.getBaking = debounce(this.getBaking)
    },
    watch: {
        getRecipeId(newVal) {
            this.getRecipeDetails(newVal);
        },
    },
    mounted() {
        this.getBaking()
    },
    methods: {
        getBaking() {
            this.$axios
                .get('https://apis.netstart.cn/douguo/recipe/search?keyword=%E8%9B%8B%E7%B3%95&order=0&type=0&offset=0&limit=20')
                .then(({ data }) => {
                    this.baking = data.result.list
                    // console.log(data.result.list);
                })
        },
        async getRecipeDetails() {
            let c = this.getRecipeId;
            let data = await this.$axios.get(c);

            this.recipe = data.data.result.recipe;
            this.recipe = JSON.stringify(this.recipe)
            sessionStorage.setItem("recipe", this.recipe);
            // console.log(data.data);

            this.$router.push({
                path: "/menu",
            });
        },
    }
}
</script>

<style lang="scss" scoped>
.baking-box {
    // padding-bottom: 50px;

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
                font-size: 15px;
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
}
</style>