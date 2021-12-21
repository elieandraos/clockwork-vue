import { computed, ref } from 'vue'

const useClockwork = () => {
    const $errors = ref([])

    const getErrors = computed(() => (key) => {
        return $errors.value
            .filter(({ dataKey }) => dataKey === key)
            .map(({ message }) => message)
    })

    const hasErrors = computed(() => (key) => {
        return !!getErrors.value(key).length
    })

    const getFirstError = (dataKey) => {
        return hasErrors.value(dataKey) ? getErrors.value(dataKey)[0] : null
    }

    return {
        $errors,
        hasErrors,
        getFirstError,
    }
}

export default {
    useClockwork,
}
