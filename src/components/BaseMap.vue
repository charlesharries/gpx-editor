<template>
  <div class="Map">
    <mgl-map
      :access-token="accessToken"
      :map-style="mapStyle"
      ref="mapbox"
      @load="fitBounds"
    >
      <mgl-marker
        v-for="(point, index) in points"
        :key="`point-${index}`"
        :coordinates="[point.lng, point.lat]"
      >
        <div class="Marker" slot="marker"></div>
      </mgl-marker>
    </mgl-map>
  </div>
</template>

<script>
import Mapbox from 'mapbox-gl';
import { MglMap, MglMarker } from 'vue-mapbox';

export default {
  name: 'BaseMap',

  components: {
    MglMap,
    MglMarker,
  },

  props: {
    points: {
      type: Array,
      default: () => [],
    },
  },

  data: () => ({
    accessToken:
      'pk.eyJ1IjoiY2hhcmxlc2hhcnJpZXMiLCJhIjoiY2tjamF6Z3N0MWhnZjJ4cGY1MzA2bDRlbyJ9.OE5UiaVBx2xJQ_1JyAmvIg',
    mapStyle: 'mapbox://styles/mapbox/outdoors-v11',
  }),

  created() {
    this.mapbox = Mapbox;
  },

  methods: {
    fitBounds() {
      this.$refs.mapbox.map.fitBounds(this.bounds);
    },
  },

  computed: {
    bounds() {
      const b = this.points.reduce(
        (b, pt) => {
          if (pt.lat > b.top) b.top = pt.lat;
          if (pt.lat < b.bottom) b.bottom = pt.lat;
          if (pt.lng < b.left) b.left = pt.lng;
          if (pt.lng > b.right) b.right = pt.lng;

          return b;
        },
        {
          top: this.points[0].lat,
          right: this.points[0].lng,
          bottom: this.points[0].lat,
          left: this.points[0].lng,
        }
      );

      console.log({ b });

      return [b.left, b.bottom, b.right, b.top];
    },
  },
};
</script>

<style lang="postcss">
.Map {
  height: 100%;
  width: 100%;
}

.Marker {
  height: 5px;
  width: 5px;
  display: block;
  background-color: blue;
  border-radius: 100px;
}
</style>
