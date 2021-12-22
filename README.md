This package ships a Vue composable that offers handy methods to access the
[clockwork](https://github.com/elieandraos/clockwork-vue/) error bag inside the component template.

```vue
<script setup>
    import Clockwork from '@elieandraos/clockwork'
    import { useClockwork } from '@elieandraos/clockwork-vue'
    
    const validator = new Clockwork()
    const { $errors, hasErrors, getFirstError } = useClockwork()
        
    const validate = () => {
        validator
            .setData({
                name: '',
                email: ''
            })
            .setRules({
                name: 'required',
                email: 'required'
            })
    
        if ( validator.passes() ) {
            // ...
        }
        else {
            // fill the $errors provided by the composable in order to access it in the template
            $errors.value = getError
        }
    }
    
    return { validate, hasErrors, getFirstError }
</script>
```

```html
<input type="text" v-model="name" />
<div v-if="hasErrors('name')">
    {{ getFirstError('name') }}
</div>
```

