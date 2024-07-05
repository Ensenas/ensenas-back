# Development

- [Whimsical link](https://whimsical.com/ensenas-der-5pe2BYstKAMoF56QFBwGpC)

* [Swagger](http://localhost:3000/api)

* [Typeorm](https://typeorm.io/)

### Tables

- [x] User
- [] UserProgress
- [x] Country
- [x] Payment
- [] Lesson

### Migrations

1. Creation:

```bash
npx typeorm migration:create src/migrations/CreateCountries
```

2. Running:

```bash
npx typeorm migration:run
```
