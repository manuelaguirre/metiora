<template>
  <div v-if="loaded">
    <table>
      <thead>
        <td v-for="key in columns" :key="key">
          {{ key }}
        </td>
      </thead>
      <tbody>
        <tr v-for="entry in entries" :key="entry._id">
          <td v-for="key in columns" :key="key">
            {{ entry.attributes[key] }}
          </td>
          <td class="actions">
            <button @click="openEntryEditModal">Edit</button>
            <button @click="duplicateEntry">Duplicate</button>
            <button @click="deleteEntry">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <button @click="pageDown" :disabled="page === 0">Back</button>
    <span>Page {{ page + 1 }} of {{ Math.trunc(totalEntries / 20) + 1 }} </span>
    <button @click="pageUp" :disabled="page === Math.trunc(totalEntries / 20)">
      Forward
    </button>
    <multi-selection-filter
      @updateFilter="updateFilter"
      category="movie"
      :options="movies"
    />
  </div>
</template>

<script>
import { getQuotes, getTotalEntries } from "../services/requests/instance";
import { getColumns } from "../services/table/columns";
import MultiSelectionFilter from "./MultiSelectionFilter.vue";
import { movies, moviesIds } from "../services/models/movies";

export default {
  components: {
    MultiSelectionFilter
  },
  props: {
    selected: String
  },
  data() {
    return {
      entries: null,
      totalEntries: 0,
      columns: null,
      loaded: false,
      movies,
      page: 0
    };
  },
  methods: {
    async updateFilter(update) {
      if (update.movie) {
        update.movie = update.movie.map(movie => moviesIds[movie]);
      }
      this.filters = { ...this.filters, ...update };
      this.entries = await getQuotes(this.selected, 0, this.filters);
      this.totalEntries = await getTotalEntries("quote", this.filters);
    },

    deleteEntry() {},
    duplicateEntry() {},
    openEntryEditModal() {}
  },
  watch: {
    async selected(characterId) {
      this.entries = await getQuotes(characterId, 0);
      this.columns = getColumns(this.entries);
      this.loaded = true;
    }
  }
};
</script>

<style>
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