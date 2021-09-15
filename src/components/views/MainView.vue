<template>
  <characters-table v-model="selectedCharacter"></characters-table>
  <quotes-table :selected="selectedCharacter"></quotes-table>
</template>

<script>
import CharactersTable from "../CharactersTable.vue";
import QuotesTable from "../QuotesTable.vue";
export default {
  data() {
    return {
      selectedCharacter: null
    };
  },
  components: { CharactersTable, QuotesTable }
};
</script>

<style>
</style>