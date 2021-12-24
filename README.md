![GitHub Workflow Status](https://img.shields.io/github/workflow/status/elieandraos/clockwork-vue/CI)
[![Coverage Status](https://coveralls.io/repos/github/elieandraos/clockwork-vue/badge.svg?branch=main)](https://coveralls.io/github/elieandraos/clockwork-vue?branch=main)
[![CodeFactor](https://www.codefactor.io/repository/github/elieandraos/clockwork-vue/badge)](https://www.codefactor.io/repository/github/elieandraos/clockwork-vue)
![npms.io (quality)](https://img.shields.io/npms-io/quality-score/@elieandraos/clockwork-vue)
![downloads](https://img.shields.io/npm/dt/@elieandraos/clockwork-vue)
![NPM](https://img.shields.io/npm/l/@elieandraos/clockwork-vue)


This package ships a Vue composable that offers handy methods to access the
[clockwork](https://github.com/elieandraos/clockwork-vue/) error bag inside the component template.

```vue
<script setup>
import Clockwork from '@elieandraos/clockwork'
import { useClockwork } from '@elieandraos/clockwork-vue'

const { $errors, hasErrors, getFirstError, getErrors } = useClockwork()

// ...

if(validator.fails())
    $errors.value = validator.getErrorBag()

// ...

// expose to component template
return { hasErrors, getFirstError, getErrors }
</script>
```

# Full example:

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
