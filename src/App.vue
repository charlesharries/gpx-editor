<template>
  <div id="app" class="App">
    <div class="App__header">
      <base-header />
    </div>

    <div class="App__clear">
      <button @click="gpx = null">Clear</button>
    </div>

    <div class="App__map">
      <base-map v-if="hasGPX" :points="mapPoints" />
      <base-dropzone v-else @loaded="handleLoad" />
    </div>

    <main class="App__toolbox" v-if="hasGPX">
      <base-toolbox :points="points" @toolbox:update="handleUpdate" />
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
    points: [],
  }),

  computed: {
    hasGPX() {
      return this.points && this.points.length;
    },

    mapPoints() {
      return this.points.filter((pt, i) => i % 10 === 0);
    },
  },

  methods: {
    handleLoad(file) {
      const xml = convert.xml2js(file, { compact: true });

      this.points = xml.gpx.trk.trkseg.trkpt.map(pt => ({
        time: pt.time,
        lat: pt._attributes.lat,
        lng: pt._attributes.lon,
      }));
    },

    handleUpdate(ptsCount) {
      this.points = this.points.slice(ptsCount[0], ptsCount[1]);
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
