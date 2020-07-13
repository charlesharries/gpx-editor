<template>
  <div class="Toolbox">
    <p>{{ points.length }} points</p>

    <vue-range-slider
      ref="slider"
      v-model="range"
      :min="0"
      :max="max"
      :tooltip="false"
    />
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

<style lang="postcss">
.Toolbox > * + * {
  margin-top: 10px;
}
</style>
