import { useClockwork } from '../src'

test('jest is set up', () => {
    const { $errors, hasErrors, getFirstError, getErrors } = useClockwork()

    // mock the error bag received from clockwork validation
    $errors.value = [
        {
            key: 'name.required',
            dataKey: 'name',
            message: 'You must enter your name',
        },
        {
            key: 'name.starts_with',
            dataKey: 'name',
            message: 'This field must start with "foo"',
        },
        {
            key: 'email.required',
            dataKey: 'email',
            message: 'This field is required',
        },
        {
            key: 'email.email',
            dataKey: 'email',
            message: 'This field must be a valid email.',
        },
    ]

    expect(hasErrors.value()).toBe(true)
    expect(getErrors.value().length).toBe(4)
    expect(getFirstError()).toBe('You must enter your name')

    expect(hasErrors.value('name')).toBe(true)
    expect(getErrors.value('name').length).toBe(2)
    expect(getFirstError('name')).toBe('You must enter your name')

    expect(hasErrors.value('foo')).toBe(false)
    expect(getErrors.value('foo').length).toBe(0)
    expect(getFirstError('foo')).toBeNull()
})
