<template>
  <div id="app" class="App">
    <div class="App__header">
      <base-header />
    </div>

    <div class="App__clear">
      <button
        class="button"
        type="reset"
        @click="
          xml = null;
          points = [];
        "
      >
        Clear
      </button>
    </div>

    <div class="App__map">
      <base-map v-if="hasGPX" :points="mapPoints" />
      <base-dropzone v-else @loaded="handleLoad" :key="reset" />
    </div>

    <main class="App__toolbox stack" v-if="hasGPX">
      <base-toolbox :points="points" @toolbox:update="handleUpdate" />

      <div>
        <button type="button" class="button" @click="handleDownload">
          Download
        </button>
      </div>
    </main>
  </div>
</template>

<script>
import convert from 'xml-js';
import download from 'downloadjs';
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
    xml: null,
    start: 0,
    end: 0,
    reset: 0,
    coefficient: 30,
  }),

  computed: {
    hasGPX() {
      return this.points && this.points.length;
    },

    mapPoints() {
      return this.points
        .map(pt => ({
          time: pt.time,
          lat: pt._attributes.lat,
          lng: pt._attributes.lon,
        }))
        .slice(this.start, this.end)
        .filter((pt, i) => i % this.coefficient === 0);
    },
  },

  methods: {
    handleLoad(file) {
      try {
        this.xml = convert.xml2js(file, { compact: true });

        this.points = this.xml.gpx.trk.trkseg.trkpt;
      } catch (err) {
        this.xml = null;
        this.points = [];
        this.reset = this.reset + 1;
        alert('not a valid gpx file there bud');
      }
    },

    handleUpdate(ptsCount) {
      this.start = ptsCount[0];
      this.end = ptsCount[1];
    },

    handleDownload() {
      const xml = { ...this.xml };
      xml.gpx.trk.trkseg.trkpt = xml.gpx.trk.trkseg.trkpt.slice(
        this.start,
        this.end
      );

      download(
        convert.js2xml(xml, { compact: true }),
        'edited.gpx',
        'application/gpx+xml'
      );
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
  --gap: 10px;
}

.App__map {
  height: 100vh;
  width: 100%;
}

.App__header {
  position: absolute;
  top: var(--gap);
  left: var(--gap);
  z-index: 1;
}

.App__clear {
  position: absolute;
  top: var(--gap);
  right: var(--gap);
  z-index: 1;
}

.App__toolbox {
  position: absolute;
  bottom: 40px;
  left: var(--gap);
  background: #333;
  color: white;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  width: calc(100% - 2 * var(--gap));
  box-sizing: border-box;
}
</style>
