<template>
  <select :name="category" :id="category" v-model="selectedOption">
    <option selected disabled>Gender</option>
    <option v-for="option in options" :key="option">{{ option }}</option>
  </select>
</template>

<script>
export default {
  props: {
    category: String,
    options: Array
  },
  emits: ["updateFilter"],
  data() {
    return {
      selectedOption: null
    };
  },
  watch: {
    selectedOption(update) {
      this.$emit("updateFilter", {
        [this.category]: [update]
      });
    }
  }
};
</script>

<style>
select {
  height: 1.5rem;
}
</style>