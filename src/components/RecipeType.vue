<template>
  <div class="type">
    <div class="category-list" v-for="(r, i) in recipeSelectionArr" :key="i">
      <div
        class="category-item"
        @click="getId(r.id, i)"
        :class="{ active: index == i }"
      >
        {{ r.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recipeSelectionArr: Array,
    id: String,
  },
  data() {
    return {
      index: 0,
    };
  },
  methods: {
    getId(id, i) {
      this.$emit("setId", id);
      this.index = i;
    },
  },
};
</script>

<style lang="scss" scoped>
.type {
  width: 100px;

  .category-list {
    width: 100vw;
    margin-top: 10px;

    .category-item {
      flex: 0 0 100px;
      width: 100px;
      height: 40px;
      line-height: 40px;
      text-align: center;
    }

    .active {
      border:  1px solid #fc0;
      color: #fc0;
    }
  }
}
</style>