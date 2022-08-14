<template>
<div class="app">
  <main>
    <MyNav />
    <router-view/>
    <div class="push"></div>
  </main>
  <MyFooter />
</div>
</template>

<script>
import MyNav from '@/components/MyNav.vue';
import MyFooter from '@/components/MyFooter.vue';

export default {
  name: "App",

  components: {
    MyNav,
    MyFooter
}
}
</script>

<style>

</style>