A Vue composable that offers methods to access the clockwork validation error bag in the template

```javascript
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
            // ... do something when input data are valid
        }
            else {
            // fill the $errors provided by the composable in order to access it in the template
            $errors.value = getError
        }
    }
    
    return {
        validate
    }
</script>
```