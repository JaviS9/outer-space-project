<template>
    <div class="row">
        <div class="col-md-11 d-flex flex-column">
            <div class="card bg-black border-light align-self-center">
                <div class="card-body bg-black">
                    <p class="fw-bold" v-if="updates.length === 0">Aún no hay ninguna actualización</p>
                    <div v-for="update in updates" :key="update.id">
                        <span class="fw-bold mb-2">{{ formatDate(update.createdAt) }}</span>
                        <p class="mb-2">{{ update.update }}</p>
                        <button class="btn btn-outline-danger" @click="deleteUpdate(update.id)">
                            <i class="fa-solid fa-circle-xmark"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import moment from "moment";
import "moment/locale/es";
import { deleteUpdateApi } from "../api/update"

export default {
    props: {
        updates: Array,
        reloadUpdates: Function,
    },
    setup(props) {
        const formatDate = (date) => {
            return moment(date).fromNow();
        };
        const deleteUpdate = (idUpdate) => {
            deleteUpdateApi(idUpdate);
            props.reloadUpdates();
        };

        return {
            formatDate,
            deleteUpdate,
        }
    }
}
</script>

<style lang="scss">

</style>