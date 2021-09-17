<template>
  <div v-if="loaded">
    <table>
      <caption>
        Quotes by
        <b>
          {{ characterName }}
        </b>
      </caption>
      <thead>
        <th v-for="key in columns" :key="key">
          {{ key }}
        </th>
        <th>Actions</th>
      </thead>
      <tbody>
        <tr v-for="entry in entries" :key="entry._id">
          <td v-for="key in columns" :key="key">
            {{ entry.attributes[key] }}
          </td>
          <td class="actions">
            <button @click="openEntryEditModal(entry)">Edit</button>
            <button @click="duplicateEntry(entry)">Duplicate</button>
            <button @click="deleteEntry(entry)">Delete</button>
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
    <div v-if="showEditModal">
      <entry-input-modal
        :dialog="modalDialog"
        @close="closeEditModal"
        @submit="submitEdit"
      />
    </div>
  </div>
</template>

<script>
import MultiSelectionFilter from "./MultiSelectionFilter.vue";
import EntryInputModal from "./EntryInputModal.vue";
import {
  getQuotes,
  getTotalEntries,
  editQuote,
  duplicateQuote,
  deleteQuote
} from "../services/requests/instance";
import { getColumns } from "../services/table/columns";
import { movies, moviesIds } from "../services/models/movies";

export default {
  components: {
    MultiSelectionFilter,
    EntryInputModal
  },
  props: {
    selected: String,
    characterName: String
  },
  data() {
    return {
      entries: null,
      totalEntries: 0,
      columns: null,
      loaded: false,

      movies,

      page: 0,

      showEditModal: false,
      modalDialog: null,
      editedQuote: null
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

    deleteEntry(entry) {
      console.log(entry._id);
      deleteQuote(entry._id);
    },
    duplicateEntry(entry) {
      duplicateQuote(entry.attributes);
    },
    openEntryEditModal(entry) {
      this.modalDialog = entry.attributes.dialog;
      this.showEditModal = true;
      this.editedQuote = entry._id;
    },
    submitEdit(edit) {
      editQuote(this.editedQuote, edit);
      this.closeEditModal();
    },
    closeEditModal() {
      this.showEditModal = false;
      this.modalDialog = null;
      this.editedQuote = null;
    }
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
</style>