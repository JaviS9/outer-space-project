<template>
    <!-- Añadira la clase open cuando este abierto -> showForm = true -->
    <div class="update-form" :class="{ open: showForm }">
        <form @submit.prevent="sendUpdate">
            <!-- Con v-model podemos acceder al value del formulario -->
            <textarea class="form-control mb-3" rows="3" placeholder="Escribe tu actualización" v-model="update"></textarea>
            <button type="submit" class="btn btn-outline-success">
                <i class="fa-solid fa-paper-plane"></i> Enviar
            </button>
        </form>
    </div>
</template>

<script>
import { ref } from "vue";
import { saveUpdateApi } from "../api/update";

export default {
    props: {
        showForm: Boolean,
        reloadUpdates: Function,
        openCloseForm: Function,
    },
    // Hay que recuperar los props en setup aparte de
    // recuperarlos en props
    setup (props) {
        let update = ref("");

        const sendUpdate = () => {
            if(!update.value) return;

            saveUpdateApi(update.value);
            update.value = "";
            props.reloadUpdates();
            props.openCloseForm();
        };

        return {
            sendUpdate,
            update,
        };
    },
};
</script>

<style lang="scss" scoped>
.update-form {
    margin-top: 20px;
    height: 0;
    overflow: hidden;

    // Es equivalente a poner update-form.open -> continua con la clase
    // padre
    &.open {
        height: auto;
    }
}
</style>