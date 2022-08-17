<template>
<div class="router-view">
  <div class="container my-2">
    <div class="row">
      <div class="col">
        <p class="h3 fw-bold">Mi perfil</p>
      </div>
    </div>
  </div>
  <div class="container border-bottom mt-3">
    <!-- USER INFO -->
    <div class="row mb-3 py-3">
      <UserCard :user="profile"/>
    </div>
    <div class="row-flex d-flex align-items-center justify-content-evenly py-2 mb-3">
      
    </div>
  </div>
</div>
</template>

<script>
import UserCard from '@/components/UserCard.vue';

export default {
    name: "MyProfile",
    data() {
        return {
            profile: null
        };
    },
    created() {
        if (this.$store.state.isUserLoggedIn)
            this.profile = this.$store.state.user;
        else if (this.$store.state.isAdminLoggedIn)
            this.profile = this.$store.state.admin;
    },
    components: { UserCard }
}
</script>

<style>

</style>