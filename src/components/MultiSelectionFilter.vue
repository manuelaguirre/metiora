<template>
  <div v-for="key in options" :key="key" class="visible-fields-checkbox">
    <input type="checkbox" :id="key" :value="key" v-model="selectedOptions" />
    <label :for="key">{{ key }}</label>
  </div>
  <button @click="selectAll">Select All</button>
</template>

<script>
export default {
  name: "MultiSelectionFilter",
  props: {
    category: String,
    options: Array
  },
  emits: ["updateFilter"],
  data() {
    return {
      selectedOptions: this.options
    };
  },
  methods: {
    selectAll() {
      this.selectedOptions = this.options;
    }
  },
  watch: {
    selectedOptions(update) {
      this.$emit("updateFilter", {
        [this.category]: update
      });
    }
  }
};
</script>

<style>
</style>