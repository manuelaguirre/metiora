<template>
  <div v-if="loaded">
    <table>
      <thead>
        <td v-for="key in columns" :key="key">
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
          <td v-for="key in columns" :key="key">
            {{ entry.attributes[key] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { getQuotes } from "../services/requests/instance";
import { getColumns } from "../services/table/columns";

export default {
  props: {
    selected: String
  },
  data() {
    return {
      entries: null,
      columns: null,
      loaded: false
    };
  },
  watch: {
    async selected(value) {
      this.entries = await getQuotes(value, 0);
      this.columns = getColumns(this.entries);
      this.loaded = true;
    }
  }
};
</script>

<style>
</style>