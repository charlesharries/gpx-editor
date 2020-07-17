<template>
  <header class="Header">
    <h1 class="font-bold">GPX Editor</h1>
    <p>
      by
      <a
        href="https://twitter.com/CharlesHarries"
        target="_blank"
        rel="noopener noreferrer"
        >@charlesharries</a
      >
    </p>
    <p class="text-grey">v0.1.1</p>
  </header>
</template>

<script>
export default {
  name: 'BaseHeader',
};
</script>

<style lang="postcss">
.Header {
  background-color: var(--off-black);
  color: var(--white);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  padding: 10px;
  display: flex;
}

.Header > * + * {
  margin-left: 10px;
}
</style>
