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
import Authentication from './services/Authentication';

export default {
  name: "App",

  components: {
    MyNav,
    MyFooter
  },

  created() {
    const user = Authentication.getUserLogged()
    if(user) {
      const userParsed =  Authentication.decodeJwt(user)
      if(userParsed.admin) {
        this.$store.dispatch('setAdmin', userParsed.user)
        this.$store.dispatch('setToken', user)
      } else {
        this.$store.dispatch('setUser',  userParsed.user)
        this.$store.dispatch('setToken', user)
      }
    }
  }
}
</script>

<style>

</style>