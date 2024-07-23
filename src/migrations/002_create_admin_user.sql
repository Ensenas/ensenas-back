# To create user password run in a terminal
````
npx ts-node src/scripts/hashPassword -p <password>
```


INSERT INTO public.users(
	mail, name, surname, password, birth_date, active, roles, country)
	VALUES ('admin@admin.com', 'admin', 'admin', 'admin', '1998-01-01 00:00:00', true, 'ADMIN', '472ab272-3963-439a-8881-ac869e6b8a72');