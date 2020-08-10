<template>
  <div class="Map" ref="map"></div>
</template>

<script>
import Mapbox from 'mapbox-gl';

export default {
  name: 'BaseMap',

  props: {
    points: {
      type: Array,
      default: () => [],
    },
  },

  data: () => ({
    map: null,
    accessToken:
      'pk.eyJ1IjoiY2hhcmxlc2hhcnJpZXMiLCJhIjoiY2tjamF6Z3N0MWhnZjJ4cGY1MzA2bDRlbyJ9.OE5UiaVBx2xJQ_1JyAmvIg',
    mapStyle: 'mapbox://styles/mapbox/outdoors-v11',
  }),

  mounted() {
    setTimeout(() => {
      this.initMap();
    }, 0);
  },

  watch: {
    points(newPoints) {
      if (!this.map) return;

      this.$nextTick(() => {
        this.map.getSource('track').setData({
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              geometry: {
                type: 'LineString',
                coordinates: this.getCoordinates(newPoints),
              },
            },
          ],
        });
      });
    },
  },

  methods: {
    getCoordinates(points) {
      return points.map(p => [p.lng, p.lat]);
    },

    initMap() {
      Mapbox.accessToken = this.accessToken;
      this.map = new Mapbox.Map({
        container: this.$refs.map,
        style: this.mapStyle,
        bounds: this.bounds,
        fitBoundsOptions: {
          padding: {
            top: 50,
            left: 50,
            right: 50,
            bottom: 200,
          },
        },
      });

      this.map.on('load', this.loadSource);
    },

    loadSource() {
      this.map.addSource('track', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Feature',
              geometry: {
                type: 'LineString',
                coordinates: this.getCoordinates(this.points),
              },
            },
          ],
        },
      });

      this.map.addLayer({
        id: 'trackline',
        type: 'line',
        source: 'track',
        layout: {
          'line-cap': 'round',
          'line-join': 'round',
        },
        paint: {
          'line-color': '#ed6498',
          'line-width': 5,
          'line-opacity': 0.8,
        },
      });
    },
  },

  computed: {
    bounds() {
      if (!this.points?.length) return [];
      let west = parseFloat(this.points[0].lng);
      let south = parseFloat(this.points[0].lat);
      let east = parseFloat(this.points[0].lng);
      let north = parseFloat(this.points[0].lat);
      this.points.forEach(pt => {
        if (parseFloat(pt.lng) < west) west = parseFloat(pt.lng);
        if (parseFloat(pt.lng) > east) east = parseFloat(pt.lng);
        if (parseFloat(pt.lat) > north) north = parseFloat(pt.lat);
        if (parseFloat(pt.lat) < south) south = parseFloat(pt.lat);
      });
      return [west, south, east, north];
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
