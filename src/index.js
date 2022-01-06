import { computed, ref } from 'vue'
import { default as library } from "@elieandraos/clockwork"

export const Clockwork = library

export const useClockwork = () => {
    const $errors = ref([])

    const getErrors = computed(() => (key = null) => {
        return key
            ? $errors.value
                  .filter(({ dataKey }) => dataKey === key)
                  .map(({ message }) => message)
            : $errors.value.map(({ message }) => message)
    })

    const hasErrors = computed(() => (key = null) => {
        return !!getErrors.value(key).length
    })

    const getFirstError = (key = null) => {
        return hasErrors.value(key) ? getErrors.value(key)[0] : null
    }

    return {
        $errors,
        hasErrors,
        getErrors,
        getFirstError,
    }
}
