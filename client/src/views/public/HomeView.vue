<template>
  <div class="router-view">
    <MyCarrousel />
    <div class="container mt-3">
      <div class="row">
        <div class="col">
          <MyServices />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MyCarrousel from '@/components/MyCarrousel.vue';
import MyServices from '@/components/MyServices.vue';

export default {
    name: "HomeView",
    components: { MyCarrousel, MyServices }
}
</script>
