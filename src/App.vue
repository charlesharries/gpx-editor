<template>
  <div id="app" class="App">
    <div class="App__header">
      <base-header />
    </div>

    <div class="App__clear">
      <button @click="gpx = null">Clear</button>
    </div>

    <div class="App__map">
      <base-map v-if="hasGPX" :points="points" />
      <base-dropzone v-else @loaded="handleLoad" />
    </div>

    <main class="App__toolbox" v-if="hasGPX">
      <base-toolbox :points="points" />
    </main>
  </div>
</template>

<script>
import convert from 'xml-js';
import BaseMap from './components/BaseMap.vue';
import BaseHeader from './components/BaseHeader.vue';
import BaseDropzone from './components/BaseDropzone.vue';
import BaseToolbox from './components/BaseToolbox.vue';

export default {
  name: 'App',

  components: {
    BaseMap,
    BaseHeader,
    BaseDropzone,
    BaseToolbox,
  },

  data: () => ({
    gpx: null,
  }),

  computed: {
    hasGPX() {
      return this.gpx && this.gpx.length;
    },

    points() {
      const xml = convert.xml2js(this.gpx, { compact: true });

      return xml.gpx.trk.trkseg.trkpt
        .filter((p, i) => i % 7 === 0)
        .map(pt => ({
          time: pt.time,
          lat: pt._attributes.lat,
          lng: pt._attributes.lon,
        }));
    },
  },

  methods: {
    handleLoad(file) {
      console.log({ file });
      this.gpx = file;
    },
  },
};
</script>

<style lang="postcss">
body {
  margin: 0;
}

.App {
  position: relative;
}

.App__map {
  height: 100vh;
  width: 100%;
}

.App__header {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 1;
}

.App__clear {
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 1;
}

.App__toolbox {
  position: absolute;
  bottom: 50px;
  left: 20px;
}
</style>
