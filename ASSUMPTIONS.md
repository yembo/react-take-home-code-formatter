### General

- No recursive string literals e.g.

```
`a string literal with a ${string literal that has another `${string} ${literal} ${i${n${s${i${d${e}}}}}}`}`
```

- A variable does not have to have been initialized in the context of the 'unformatted code' e.g. `error` in `catch(error)`
- Spacing does not need to be fixed e.g.

```
  <!-- Invalid -->
  for(let i=1;i<>10;i++){console.log('hello world')}
```

- User is not expected to supply bad code according to ES6 standards e.g. `const const a = 5`

- Ignore all array/object type variables (e.g. `i.login()`) that call functions so as to avoid mixing them up with typical webapi variables e.g. console, navigator, window etc

### Styling

- All numbers red,
- All vars blue and bold
- All reserved keywords bold
- All string literals green
