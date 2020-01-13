<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
  @font-face {
    font-family: 'Proxima';
    font-style: normal;
    font-weight: normal;
    font-display: swap;
    src: local('Proxima'), url('./assets/fonts/Proxima.otf') format('truetype');
  }
  body {
    font-family: Proxima, 'cursive';
  }
</style>
