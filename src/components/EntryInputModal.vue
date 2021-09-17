<template>
  <div class="overlay" @click.prevent="closeModal">
    <div class="edit-dialog" @click.stop.prevent>
      <h5>Edit Quote</h5>
      <div class="text-container">
        <textarea
          name="edit-dialog"
          cols="30"
          rows="10"
          v-model="edit"
        ></textarea>
      </div>
      <div class="button-container">
        <button @click="submit">Edit</button>
        <button @click="closeModal">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dialog: String
  },
  emits: ["close", "submit"],
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
.overlay {
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
}

h5 {
  text-align: left;
  margin: 1rem;
}

.edit-dialog {
  width: 40%;
  height: 25%;
  background: white;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  margin: auto;
  font-size: 1.5em;
  text-align: center;
  padding: 1rem;
  border: solid black 1px;
  border-radius: 5px;
  z-index: 10;
}

.text-container {
  height: 50%;
  width: 80%;
  margin: 1rem;
}

.text-container textarea {
  position: relative;
  width: 100%;
  height: 100%;
  resize: none;
  margin: auto;
}

.button-container {
  display: block;
  height: 20%;
  float: right;
  margin: 1rem;
}
.button-container > button {
  margin: 0 1em;
  font-size: 1rem;
  padding: 8px;
}
</style>