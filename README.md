![GitHub Workflow Status](https://img.shields.io/github/workflow/status/elieandraos/clockwork-vue/CI)
[![Coverage Status](https://coveralls.io/repos/github/elieandraos/clockwork-vue/badge.svg?branch=main)](https://coveralls.io/github/elieandraos/clockwork-vue?branch=main)
[![CodeFactor](https://www.codefactor.io/repository/github/elieandraos/clockwork-vue/badge)](https://www.codefactor.io/repository/github/elieandraos/clockwork-vue)
![npms.io (quality)](https://img.shields.io/npms-io/quality-score/@elieandraos/clockwork-vue)
![downloads](https://img.shields.io/npm/dt/@elieandraos/clockwork-vue)
![NPM](https://img.shields.io/npm/l/@elieandraos/clockwork-vue)

This package is a Vue 3 adapter for the [clockwork validation library](https://github.com/elieandraos/clockwork)
It ships 2 objects: 
- `Clockwork`: the native library that handles all the validation flow
- `useClockwork()`: a Vue composable that exposes the validation errors to the component template.

# Installation
```shell
npm install @elieandraos/clockwork-vue --save
```

# Usage
```vue
<script setup>
import { Clockwork, useClockwork } from '@elieandraos/clockwork-vue'

const validator = new Clockwork() // library
const { $errors, hasErrors, getFirstError, getErrors } = useClockwork() // vue composable
</script>
```

### Library
For more details about the library usage (built-in rules, custom rules, custom error messages etc...) 
[see the full documentation here](https://github.com/elieandraos/clockwork#readme). 

### Vue composable
The composable adds a reactive data property `$errors` to the component state. 
**It should be filled with the clockwork error bag when the validation fails**.

It also exposes 3 methods to the component template
- `getErrors(key=null)` _return all the error messages or all the error messages of `key` if specified_
- `getFirstError(key=null)` _return the first error message found or the first error message of `key` if specified_
- `hasErrors(key=null)` _checks if there is any validation error or any validation error for the `key` if specified_

```vue
<script setup>
    import { Clockwork, useClockwork } from '@elieandraos/clockwork-vue'
    
    const validator = new Clockwork()
    const { $errors, hasErrors, getFirstError, getErrors } = useClockwork()

    //...
    
    if( validator.fails())
        $errors.value = validator.getErrorBag()
    
    // ...
    
    return {
       getErrors,
       getFirstError,
       hasErrors
    }
</script>
```

# Full example with the clockwork library
```vue
<script setup>
import { reactive, toRaw, toRefs } from 'vue'
import { Clockwork, useClockwork } from '@elieandraos/clockwork-vue'

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

return {
    ...toRefs(state),
    hasErrors,
    getFirstError,
    validate
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
