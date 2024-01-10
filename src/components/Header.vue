<template>
  <nav class="navbar bg-light navbar-light">
    <a class="navbar-brand navbar-text" href="#">
      <img src="../assets/logo.svg" width="24" alt="logo">
      {{ title }}
    </a>
  </nav>
</template>

<script>
export default {
  props: {
    title: String
  }
};
</script>