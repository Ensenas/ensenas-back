# To create user password run in a terminal
````
npx ts-node src/scripts/hashPassword -p <password>
```

INSERT INTO public.users(
	mail, name, surname, password, birth_date, active, role, country)
	VALUES ('admin@admin.com', 'admin', 'admin', 'admin', '1998-01-01 00:00:00', true, 'ADMIN', 'b83ca496-f470-4563-93e9-9abf27963b8f');

INSERT INTO public.users(
	mail, name, surname, password, birth_date, active, role, country)
	VALUES ('example@gmail.com', 'example', 'example', 'example', '1998-01-01 00:00:00', true, 'USER', 'b83ca496-f470-4563-93e9-9abf27963b8f');