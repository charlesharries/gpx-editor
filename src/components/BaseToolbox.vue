<template>
  <div class="Toolbox">
    <p>{{ points.length }} points</p>

    <p>{{ range }}</p>

    <vue-range-slider ref="slider" v-model="range" :min="0" :max="max" />
  </div>
</template>

<script>
import VueRangeSlider from 'vue-range-component';

export default {
  name: 'Toolbox',

  components: {
    VueRangeSlider,
  },

  data: ({ points }) => ({
    range: [],
    max: points.length,
  }),

  props: {
    points: {
      type: Array,
      default: () => [],
    },
  },

  watch: {
    range(newRange) {
      this.$emit('toolbox:update', newRange);
    },
  },

  mounted() {
    this.range = [0, this.points.length];
  },
};
</script>

<style>
.Toolbox {
  background: white;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  width: 800px;
}
</style>
