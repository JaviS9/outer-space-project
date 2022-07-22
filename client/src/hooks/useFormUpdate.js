import { ref } from "vue";

export default function useFormUpdate() {
    const showForm = ref(false);

    // Pone en el valor contrario el valor el cual se encuantra
    // la variable showForm -> Esto es como las señales en Solid JS
    const openCloseForm = () => {
        showForm.value = !showForm.value;
    }

    return {
        showForm,
        openCloseForm,
    }
}