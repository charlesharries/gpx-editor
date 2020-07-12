<template>
  <div class="Dropzone">
    <dropzone
      ref="dropzone"
      :options="options"
      id="dropzone"
      class="Dropzone__dropzone"
    />
  </div>
</template>

<script>
import Dropzone from 'vue2-dropzone';

export default {
  name: 'BaseDropzone',

  data: () => ({
    options: {
      url: '/',
      maxFiles: 1,
    },
  }),

  mounted() {
    this.$refs.dropzone.dropzone.accept = this.accept;
  },

  components: {
    Dropzone,
  },

  methods: {
    accept(file) {
      const reader = new FileReader();
      reader.addEventListener('loadend', this.handleLoaded);
      reader.readAsText(file);
    },

    handleLoaded(e) {
      this.$emit('loaded', e.target.result);
    },
  },
};
</script>

<style lang="postcss">
.Dropzone {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.Dropzone .Dropzone__dropzone {
  height: 100%;
  width: 100%;
  padding: 0;
  border: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: lightgrey;
}
</style>
