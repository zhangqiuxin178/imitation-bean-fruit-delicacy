<template>
    <div class="mother-box">
        <div class="mother-list" v-for="(m,i) in mother" :key="i" @click="getMotherList, (motherId = m.id)">
            <div class="mother-img">
                <img :src="m.image">
            </div>
            <div class="mother-name">{{ m.name }}</div>
            <p class="mother-title">{{ m.description }}</p>
        </div>
        
    </div>
</template>


<script>
import { debounce } from "lodash-es";

export default {
    data() {
        return {
            mother: [],
            motherId: null,
            motherArr: []
        }
    },
    computed: {
        getMotherId() {
            return `https://apis.netstart.cn/douguo/note/topicdetail/${this.motherId}/0/20`
        }
    },
    watch: {
        getMotherId(newVal) {
            this.getMotherList(newVal);
        },
    },
    created() {
        this.getMother = debounce(this.getMother)
    },
    mounted() {
        this.getMother()
    },
    methods: {
        getMother() {
            this.$axios
                .get("https://apis.netstart.cn/douguo/note/topiclist/0/20")
                .then(({ data }) => {
                    this.mother = data.result.list
                    // console.log(data);
                })
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
    }
}
</script>

<style lang="scss" scoped>
.mother-list {
    padding-bottom: 60px;

    .mother-img {
        width: 100vw;

        img {
            width: 100%;
        }
    }

    .mother-name {
        font-weight: 700;
        margin-top: 15px;
        margin-left: 8px;
    }

    .mother-title {
        margin-top: 5px;
        margin-left: 8px;
        color: #68a4ac;
    }
}
</style>