Belkit
===

Беларуска-кітайскі анлайн слоўнік

## Як стварыць пустую БД?

```SQL
CREATE USER 'belkit_db_user'@'localhost';

CREATE DATABASE belkit_db;
ALTER DATABASE belkit_db CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;

alter user 'belkit_db_user'@'localhost' identified by '__belkit';

GRANT ALL PRIVILEGES ON belkit_db.* To 'belkit_db_user'@'localhost';
flush privileges;
```
