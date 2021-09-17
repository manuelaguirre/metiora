<template>
  <ul>
    <li v-for="action in actions" :key="action">
      <span>{{ action.url }}</span
      ><span> {{ action.method }}</span>
    </li>
  </ul>
</template>

<script>
import { getActions } from "../../services/storage/storage";

export default {
  data() {
    return {
      actions: getActions()
    };
  }
};
</script>

<style>
</style>