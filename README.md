This package ships a Vue composable that offers handy methods to access the
[clockwork](https://github.com/elieandraos/clockwork-vue/) error bag inside the component template.

```vue
import Clockwork from '@elieandraos/clockwork'
import Clockwork from '@elieandraos/clockwork'

const { $errors, hasErrors, getFirstError, getErrors } = useClockwork()

// ...

if(validator.fails())
    $errors.value = validator.getErrorBag()

// ...

// expose to component template
return { hasErrors, getFirstError, getErrors }
```

> Below is a full working example:

```vue
// Vue component
<script setup>
import Clockwork from '@elieandraos/clockwork'
import { useClockwork } from '@elieandraos/clockwork-vue'

const validator = new Clockwork()
const { $errors, hasErrors, getFirstError, getErrors } = useClockwork()

const validate = () => {
    validator
        .setData({
            name: '',
            email: '',
        })
        .setRules({
            name: 'required',
            email: 'required',
        })

    if (validator.passes()) {
        // ...
    } else {
        // fill the $errors provided by the composable in order to access it in the template
        $errors.value = getError
    }
}
</script>

<template>
    <input type="text" v-model="name" />
    <div v-if="hasErrors('name')">{{ getFirstError('name') }}</div>
</template>
```
