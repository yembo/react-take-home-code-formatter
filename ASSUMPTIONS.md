### General

- No recursive string literals e.g.

```
`a string literal with a ${string literal that has another a`${string} ${literal}`}`
```

- A variable is something that has been declared in the context of the 'unformatted code' e.g.
  `a++` where a is valid because of a preceding declaration `var a = 25`
- Spacing does not need to be fixed e.g.

```
  <!-- Invalid -->
  for(let i=1;i<>10;i++){console.log('hello world')}
```

- User is not expected to supply bad code e.g. `const const a = 5`

### Styling

- All numbers red,
- All vars blue and bold
- All reserved keywords bold
- All string literals green
