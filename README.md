[![Coverage Status](https://coveralls.io/repos/github/elieandraos/clockwork-vue/badge.svg?branch=main)](https://coveralls.io/github/elieandraos/clockwork-vue?branch=main)
[![CodeFactor](https://www.codefactor.io/repository/github/elieandraos/clockwork-vue/badge)](https://www.codefactor.io/repository/github/elieandraos/clockwork-vue)
![npms.io (quality)](https://img.shields.io/npms-io/quality-score/@elieandraos/clockwork-vue)
![downloads](https://img.shields.io/npm/dt/@elieandraos/clockwork-vue)
![NPM](https://img.shields.io/npm/l/@elieandraos/clockwork-vue)

This package ships a Vue 3 composable that exposes the clockwork error bag to the component template.
All the validation is still handled by the clockwork library, so make sure to check
[the full documentation](https://github.com/elieandraos/clockwork) to benefit from all its
features (built-in rules, custom rules, etc...)

# Installation
```shell
npm install @elieandraos/clockwork @elieandraos/clockwork-vue --save
```

# Usage
The composable adds a reactive variable `$errors` to the component state.
**It should be filled with the clockwork error bag when the validation fails**.

It also exposes 3 methods to the component template
- `getErrors(key=null)` _return all the error messages or all the error messages of `key` if specified_
- `getFirstError(key=null)` _return the first error message found or the first error message of `key` if specified_
- `hasErrors(key=null)` _checks if there is any validation error or any validation error for the `key` if specified_

```vue
<script setup>
    import Clockwork from '@elieandraos/clockwork'
    import { useClockwork } from '@elieandraos/clockwork-vue'
    
    const validator = new Clockwork()
    const { $errors, hasErrors, getFirstError, getErrors } = useClockwork()
    
    // ...
    
    if( validator.fails())
        $errors.value = validator.getErrorBag()

</script>
```

# Full example with the clockwork library
```vue
<script setup>
import { reactive, toRaw, toRefs } from 'vue'
import Clockwork from '@elieandraos/clockwork'
import { useClockwork } from '@elieandraos/clockwork-vue'

const validator = new Clockwork()
const { $errors, hasErrors, getFirstError, getErrors } = useClockwork()

const state = reactive({
    name: null,
    email: null,
})

const validate = () => {
    validator
        .setData( toRaw(state) )
        .setRules({
            name: 'required',
            email: 'required | email',
        })

    if (validator.passes()) {
        // ...
    } else {
        // fill the $errors with the error bag
        $errors.value = validator.getErrorBag()
    }
}
</script>

<template>
    <input type="text" v-model="name" />
    <div v-if="hasErrors('name')">{{ getFirstError('name') }}</div>

    <input type="text" v-model="email" />
    <div v-if="hasErrors('email')">{{ getFirstError('email') }}</div>
    
    <button @click="validate">submit</button>
    
</template>
```
