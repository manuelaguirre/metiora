<template>
  <div v-if="entries">
    <h3>Visible Fields</h3>
    <div id="visible-fields-cont">
      <div v-for="key in columns" :key="key" class="visible-fields">
        <input
          type="checkbox"
          :id="key"
          :value="key"
          v-model="selectedAttributes"
        />
        <label :for="key">{{ key }}</label>
      </div>
    </div>
    <h3>Race Filters</h3>
    <div class="filters">
      <multi-selection-filter
        category="race"
        :options="race"
        @updateFilter="updateFilters"
      />
    </div>
    <h3>Gender Filter</h3>
    <div id="gender-cont">
      <single-selection-filter
        category="gender"
        :options="genders"
        @updateFilter="updateFilters"
      />
    </div>
    <table>
      <caption>
        Characters
      </caption>
      <thead>
        <th v-for="key in visibleAttributes" :key="key" :value="key">
          {{ key }}
        </th>
      </thead>
      <tbody>
        <tr
          @click="selectRow(entry)"
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
import MultiSelectionFilter from "./MultiSelectionFilter.vue";
import SingleSelectionFilter from "./SingleSelectionFilter.vue";
import {
  getCharacters,
  getTotalEntries
} from "../services/requests/instance.js";
import { getColumns } from "../services/table/columns.js";
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
    selectRow(entry) {
      this.selectedRow = entry._id;
      this.$emit("update:modelValue", {
        _id: entry._id,
        name: entry.attributes.name
      });
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
      this.totalEntries = await getTotalEntries("character", this.filters);
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
      this.totalEntries = await getTotalEntries("character");
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
  overflow: auto;
  resize: horizontal;
}

table {
  width: 100%;
}

tr.selected {
  background-color: bisque;
}

#visible-fields-cont {
  display: grid;
  grid-template-columns: 1fr 1fr;
  background-color: white;
  width: 50vw;
  text-align: left;
}

#visible-fields-cont h3 {
  grid-row: 1 / 1;
}

h3 {
  text-align: left;
  margin: 1rem;
}

.filters {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  width: 50vw;
  text-align: left;
  background-color: white;
}

#gender-cont {
  width: 50%;
  text-align: left;
  margin: 1rem;
}

td {
  cursor: pointer;
}
</style>