<template>
  <div class="router-view">
    <div class="container mt-3">
        <div class="row">
            <div class="col">
                <p class="h3 fw-bold">Novedades</p>
                <p>Conoce las últimas actualizaciones de tus proyectos favoritos</p>
                <SearchBox :table="'Update'" @search="searchUpdate" />
            </div>
        </div>
    </div>
    <div class="container mt-3">
      <div class="row d-flex justify-content-center align-items-center p-0 mb-3">
      <p class="fw-bold text-center text-danger" v-if="updates.length === 0">Aún no hay ninguna actualización</p>
      <div v-else v-for="update in updates" :key="update.id"
        class="card rounded-pill bg-black border border-3 news mb-5 p-0"
      >
        <div class="card-body transparent px-3 py-0">
          <div class=" transparent p-0 m-0">
            <div class="transparent text-white p-0 m-0">
              <div class="row-flex d-flex align-items-center justify-content-start p-0 m-0">
                <router-link :to="{ name: 'ProjectPage', params: {title: update.title}}"
                  type="button" class="d-flex justify-content-center align-items-center"
                  style="text-decoration: none; color: inherit;"
                >
                  <div 
                    class="imagePreview__mini-image m-0 p-0 rounded-circle button-image-mini"
                    :style="{ 'background-image': `url(${update.photo})` }">
                  </div>
                  <p class="fw-bold m-0 py-0 ps-2 orange">{{ update.title }}</p>
                </router-link>
              </div>
            </div>
            <div class="transparent text-white px-0 pt-2 pb-4 mb-3">
              <div class="card bg-black border border-2 rounded-pill p-3 m-0">
                <p class="m-0">{{ update.description }}</p>
              </div>
            </div>
            <span class="fw-bold bg-black border border-3 rounded-pill text-warning p-2">
              {{ formatDate(update.update_date) }}
            </span>
          </div>
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
import SearchBox from "@/components/SearchBox.vue";

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

  components: { SearchBox },

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

    searchUpdate(search) {
      if(search != -1) { this.updates = search }
      else { this.getUpdates() }            
    },
  }

}
</script>

<style>

</style>