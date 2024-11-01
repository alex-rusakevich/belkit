belkit.by — Белорусско-китайский словарь
===

Перед запуском версии для разработки необходимо создать тестовую БД и пользователя:

```SQL
CREATE USER 'belkit_user'@'localhost';
CREATE DATABASE belkit_db;
ALTER DATABASE belkit_db CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;
alter user 'belkit_user'@'localhost' identified by 'belkit_password';
GRANT ALL PRIVILEGES ON belkit_db.* To 'belkit_user'@'localhost';
flush privileges;
```
