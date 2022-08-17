<template>
<div class="router-view">
  <div class="container my-2">
    <div class="row">
      <div class="col">
        <p class="h3 fw-bold">Perfil de administrador</p>
      </div>
    </div>
  </div>
  <div class="container border-bottom mt-3">
    <div class="row">
      <UserCard :user="admin" />
    </div>
    <div class="row mb-3">
      <div class="col">
        <router-link to="/manager/admins" type="button" class="btn btn-outline-light">
          <i class="fa-solid fa-arrow-alt-circle-left"></i>  Atrás
        </router-link>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import adminApi from '@/services/adminApi';
import UserCard from '@/components/UserCard.vue';

export default {
    name: "ViewAdmin",
    data() {
        return {
            admin: null,
        };
    },
    created() {
        this.getProfile();
    },
    methods: {
        //FIND ONE
        async getProfile() {
            try {
                const response = await adminApi.getAdminId(this.$route.params.id);
                this.admin = response.data[0];
            }
            catch (err) {
                console.log(err);
            }
        }
    },
    components: { UserCard }
}
</script>

<style>

</style>