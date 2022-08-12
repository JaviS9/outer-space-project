<template>
<div class="app">
  <main>
    <MyNav :status="status"/>
    <router-view/>
    <div class="push"></div>
  </main>
  <MyFooter :status="status"/>
</div>
</template>

<script>
import MyNav from '@/components/MyNav.vue';
import MyFooter from '@/components/MyFooter.vue';

export default {
  name: "App",
  data() {
    return {
      status: {
        admin: false,
        user: false,
        public: true
      }
    }
  },

  components: {
    MyNav,
    MyFooter
}
}
</script>

<style>

</style>