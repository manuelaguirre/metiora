<template>
  <div>
    <textarea
      name="edit-dialog"
      id="edit-dialog"
      cols="30"
      rows="10"
      v-model="edit"
    ></textarea>
    <button>Edit</button><button @click="closeModal">Cancel</button>
  </div>
</template>

<script>
export default {
  props: {
    dialog: String
  },
  emits: ["close", "edit"],
  data() {
    return {
      edit: this.dialog
    };
  },
  methods: {
    closeModal() {
      this.$emit("close");
    },
    submit() {
      this.$emit("submit", this.edit);
    }
  }
};
</script>

<style>
</style>