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

Expected response:

```json
{
  "id": "2622f736-db79-406e-be70-a33c84f7a0c2",
  "mail": "example2@test.com",
  "name": "Example",
  "surname": "Example2",
  "country": "argentina"
}
```

2. **/auth/login**

```bash
curl --location 'localhost:3000/auth/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "mail": "example@test.com",
    "password": "123"
}'
```

Expected response: This will return a jwt token with user information.

```json
   "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYWlsIjoiZXhhbXBsZUB0ZXN0LmNvbSIsInJvbGUiOm51bGwsImlhdCI6MTcyMDM3MDcyOCwiZXhwIjoxNzIwMzc0MzI4fQ.VOcjCSJZneFtJFYc_nPY_FGKNlEuuop84dWBop2F0tU"
```

3. **/auth/profile**

```bash
curl --location 'localhost:3000/auth/profile' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYWlsIjoiZXhhbXBsZUB0ZXN0LmNvbSIsIm5hbWUiOiJFeGFtcGxlIiwic3VybmFtZSI6IkV4YW1wbGUiLCJyb2xlIjoiVVNFUiIsImlhdCI6MTcyMDM3MTUyMSwiZXhwIjoxNzIwMzc1MTIxfQ.ml8OF21NfuN_vOHTdAp5v9ZRQFR9HbU45vDIh_bDeuM'
```

Expected response:

```json
{
  "mail": "example@test.com",
  "username": "Example Example",
  "roles": "USER"
}
```

### Users endpoint

1. **/users**: Get all users available

ADMIN ENDPOINT

```bash

```

Expected response:

```json

```

### Countries endpoint
