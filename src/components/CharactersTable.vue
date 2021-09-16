<template>
  <div v-if="entries">
    <div v-for="key in columns" :key="key" class="visible-fields-checkbox">
      <input
        type="checkbox"
        :id="key"
        :value="key"
        v-model="selectedAttributes"
      />
      <label :for="key">{{ key }}</label>
    </div>
    <multi-selection-filter
      category="race"
      :options="race"
      @updateFilter="updateFilters"
    />
    <single-selection-filter
      category="gender"
      :options="genders"
      @updateFilter="updateFilters"
    />
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
    <span>Page {{ page + 1 }} of {{ Math.trunc(totalEntries / 20) + 1 }} </span>
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
import MultiSelectionFilter from "./MultiSelectionFilter.vue";
import SingleSelectionFilter from "./SingleSelectionFilter.vue";
import { race, genders } from "../services/models/character";

export default {
  name: "CharactersTable",
  components: {
    MultiSelectionFilter,
    SingleSelectionFilter
  },
  data() {
    return {
      entries: null,
      totalEntries: 0,
      columns: null,
      loaded: false,
      errored: false,

      fields: [],
      selectedAttributes: [],

      filters: {},
      race,
      genders,

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
      this.entries = await getCharacters(--this.page, this.filters);
    },
    async pageUp() {
      this.entries = await getCharacters(++this.page, this.filters);
    },

    async updateFilters(update) {
      this.filters = { ...this.filters, ...update };
      this.entries = await getCharacters(this.page, this.filters);
      this.totalEntries = await getTotalCharacters(this.filters);
    }
  },
  computed: {
    visibleAttributes() {
      if (this.columns) {
        return this.columns.filter(attribute =>
          this.selectedAttributes.includes(attribute)
        );
      }
      return null;
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