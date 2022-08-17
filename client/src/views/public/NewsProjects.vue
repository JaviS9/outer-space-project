<template>
  <div class="router-view">
    <div class="container mt-3">
        <div class="row">
            <div class="col">
                <p class="h3 fw-bold">Novedades</p>
                <p>Conoces las últimas actualizaciones de tus proyectos favoritos
                </p>
            </div>
        </div>
    </div>
    <div class="container mt-3">
      <div class="row d-flex justify-content-center align-items-center p-0 mb-3">
      <p class="fw-bold text-center text-danger" v-if="updates.length === 0">Aún no hay ninguna actualización</p>
      <div v-else v-for="update in updates" :key="update.id"
        class="card bg-black border border-2 update mb-3 p-0"
      >
        <div class="card-body bg-black px-3 py-2">
          <li class="list-group p-0 m-0">
            <ul class="list-group-item bg-black text-white p-0 m-0">
              <div class="row-flex d-flex align-items-center justify-content-start px-0 py-1 m-0">
                  <div class="imagePreview__mini-image m-0" :style="{ 'background-image': `url(${update.photo})` }"></div>
                  <p class="fw-bold m-0 py-0 ps-2">{{ update.title }}</p>
              </div>
            </ul>
            <ul class="list-group-item bg-black text-white px-0 pt-2 pb-4 m-0">
              <div class="card bg-black border border-2 p-3 m-0">
                <p class="m-0">{{ update.description }}</p>
              </div>
            </ul>
            <span class="fw-bold bg-black">{{ formatDate(update.update_date) }}</span>
          </li>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import moment from "moment";
import "moment/locale/es";
import projectApi from '@/services/projectApi'

export default {
  name: 'NewsProjects',
  data() {
    return {
      updates: [],      
    }
  },

  created() {
    this.getUpdates()
  },

  methods: {
    async getUpdates() {
      try{
          const updates = await projectApi.listAllUpdates()
          this.updates = updates.data.reverse()
          console.log(this.updates)
      } catch (err) {
          console.log(err);
      }
    },

    getColor() {
      const color = this.colors[Math.floor(Math.random() * 5)]
      console.log(color)
      return color
    },

    formatDate(date) {
      return moment(date).fromNow();
    },
  }

}
</script>

<style>

</style>