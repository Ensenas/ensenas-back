# Postman collection

- Example queries

### Auth endpoint

1. **/auth/sign-up**

```bash
curl --location 'localhost:3000/auth/sign-up' \
--header 'Content-Type: application/json' \
--data-raw '{
    "mail": "example@test.com",
    "password": "123",
    "name": "Example",
    "surname": "Example",
    "country": "Argentina",
    "birthDate": "1998-01-01"
}'
```

2. \*\*auth/
