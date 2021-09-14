<template>
  <main-view></main-view>
</template>

<script>
import MainView from "./components/views/MainView.vue";

export default {
  name: "App",
  components: { MainView },
  mounted() {}
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
