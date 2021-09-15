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
        <tr
          @click="selectRow(entry._id)"
          v-for="entry in entries"
          :key="entry._id"
          :class="{ selected: this.selectedRow === entry._id }"
        >
          <td v-for="key in visibleAttributes" :key="key">
            {{ entry.attributes[key] }}
          </td>
        </tr>
      </tbody>
    </table>
    <button @click="pageDown" :disabled="page === 0">Back</button>
    <span>Page {{ page }} of {{ Math.trunc(totalEntries / 20) }} </span>
    <button @click="pageUp" :disabled="page === Math.trunc(totalEntries / 20)">
      Forward
    </button>
  </div>
</template>

<script>
import {
  getCharacters,
  getTotalCharacters
} from "../services/requests/instance.js";
import { getColumns } from "../services/table/columns.js";

export default {
  name: "CharactersTable",
  data() {
    return {
      entries: null,
      totalEntries: 0,
      columns: null,
      loaded: false,
      errored: false,

      fields: [],
      selectedAttributes: [],

      page: 0,
      selectedRow: null
    };
  },
  methods: {
    selectRow(rowId) {
      this.selectedRow = rowId;
      this.$emit("update:modelValue", rowId);
    },
    async pageDown() {
      this.entries = await getCharacters(--this.page);
    },
    async pageUp() {
      this.entries = await getCharacters(++this.page);
    }
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
      this.totalEntries = await getTotalCharacters();
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
  resize: horizontal;
}

tr.selected {
  background-color: bisque;
}
</style>