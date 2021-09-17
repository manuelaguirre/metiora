<template>
  <characters-table v-model="selectedCharacter"></characters-table>
  <quotes-table
    v-if="selectedCharacter"
    :selected="selectedCharacter._id"
    :characterName="selectedCharacter.name"
  ></quotes-table>
</template>

<script>
import CharactersTable from "../CharactersTable.vue";
import QuotesTable from "../QuotesTable.vue";

export default {
  data() {
    return {
      selectedCharacter: {}
    };
  },
  components: { CharactersTable, QuotesTable }
};
</script>

<style>
</style>