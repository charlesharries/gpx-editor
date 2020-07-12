<template>
  <div class="Toolbox">
    <p>{{ points.length }} points</p>
  </div>
</template>

<script>
export default {
  name: 'Toolbox',

  props: {
    points: {
      type: Array,
      default: () => [],
    },
  },
};
</script>

<style>
.Toolbox {
  background: white;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
</style>
