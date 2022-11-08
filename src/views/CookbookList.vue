<template>
    <div class="cook-box">
        <div class="nav-bar">
            <div class="search-bar">
                <div class="search">
                    <p class="return" @click="$router.push({ path: '/search' })"></p>
                    <div class="ipt-box">
                        <span class="search-mirror"><img
                                src="../assets/res/drawable-xxhdpi-v4/icon_menu_search.png" /></span>
                        <input type="search" placeholder="家常菜" @click="$router.push({path:'/search'})" />
                    </div>
                </div>
                <div class="cancel">搜索</div>
            </div>
            <!-- <div class="list-bar">
                <div :class="{ active: index == i }" class="list" v-for="(s, i) in cookbook.secondary_keywords" :key="i"
                    @click="getItem(i)">
                    {{ s }}
                </div>
            </div> -->
        </div>

        <div class="item-bar">
            <div class="list-item" v-for="(l,i) in cookbook.list" :key="i"
                @click="getRecipeDetails, (recipeId = l.r.id)">
                <div class="list-img">
                    <img :src="l.r.p">
                </div>
                <div class="item">
                    <div class="name">{{ l.r.n }}</div>
                    <!-- <div class="score">{{}}</div> -->
                    <div class="detail-box">
                        <div class="detail" v-for="(r,i) in l.r.recipe_list_tags" :key="i">{{ r.text }}</div>
                    </div>
                    <div class="user">
                        <div class="user-img">
                            <img :src="l.r.a.p">
                        </div>
                        <p class="user-name">{{l.r.a.n}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            recipeId: null,
            index: 0,
            recipe: {}
        }
    },
    computed: {
        cookbook() {
            let cookbookList = sessionStorage.getItem("cookbookList");
            let cookbook = JSON.parse(cookbookList);
            return cookbook;
        },
        getRecipeId() {
            return `https://apis.netstart.cn/douguo/recipe/detail/${this.recipeId}`;
        },
    },
    watch: {
        getRecipeId(newVal) {
            this.getRecipeDetails(newVal);
        },
    },
    methods: {
        getItem(i) {
            this.index = i
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
};
</script>

<style lang="scss" scoped>
.nav-bar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 50px;
    background-color: white;


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

    .list-bar {
        display: flex;
        margin-top: 15px;
        width: 100vw;
        overflow-x: auto;

        .list.active {
            background-color: #fc0;
        }

        &::-webkit-scrollbar {
            display: none;
        }

        .list {
            width: 50px;
            height: 25px;
            line-height: 25px;
            margin-top: 15px;
            margin-left: 15px;
            margin-bottom: 15px;
            padding: 0 5px;
            border-radius: 999px;
            text-align: center;
            white-space: nowrap;
            background-color: #e1dfdf;
        }
    }
}

.item-bar {
    padding-top: 50px;



    .list-item {
        display: flex;
        align-items: center;
        margin-left: 15px;
        padding-top: 15px;



        .list-img {
            flex: 0 0 166px;
            width: 166px;
            height: 150px;
            border-radius: 5px;
            overflow: hidden;

            img {
                width: 100%;
                height: 100%;
            }
        }

        .item {
            margin-left: 10px;

            .name {
                font-size: 14px;
            }

            .detail-box {
                display: flex;
                margin: 25px 0;

                .detail {
                    font-size: 12px;
                    color: #777;
                    margin-right: 5px;
                }
            }

            .user {
                display: flex;
                align-items: center;

                .user-img {
                    width: 20px;
                    height: 20px;
                    margin-right: 4px;
                    border-radius: 999px;
                    overflow: hidden;

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