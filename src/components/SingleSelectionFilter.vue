<template>
  <select :name="this.category" :id="this.category" v-model="selectedOption">
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