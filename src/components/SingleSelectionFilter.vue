<template>
  <select :name="category" :id="category" v-model="selectedOption">
    <option value="" disabled selected hidden>pipingo</option>
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
</style>