<template>
  <div v-if="loaded">
    <div v-for="key in columns" :key="key" class="visible-fields-checkbox">
      <input
        type="checkbox"
        :id="key"
        :value="key"
        v-model="selectedAttributes"
      />
      <label :for="key">{{ key }}</label>
    </div>
    <table>
      <thead>
        <td v-for="key in visibleAttributes" :key="key">
          {{ key }}
        </td>
      </thead>
      <tbody>
        <tr v-for="entry in entries" :key="entry._id">
          <td v-for="key in visibleAttributes" :key="key">
            {{ entry.attributes[key] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { getCharacters } from "../services/requests/instance.js";
import { getColumns } from "../services/table/columns.js";

export default {
  name: "CharactersTable",
  data() {
    return {
      entries: null,
      columns: null,
      loaded: false,
      errored: false,

      fields: [],
      selectedAttributes: [],

      page: 0
    };
  },

  computed: {
    visibleAttributes() {
      return this.columns.filter(attribute =>
        this.selectedAttributes.includes(attribute)
      );
    }
  },
  async mounted() {
    try {
      this.entries = await getCharacters(this.page);
      this.columns = getColumns(this.entries);
      this.selectedAttributes = this.columns;

      this.loaded = true;
    } catch (error) {
      this.errored = true;
    }
  }
};
</script>

<style scoped>
table,
th,
td {
  border: 1px solid black;
  overflow: hidden;
}

table {
  width: 100%;
}
</style>