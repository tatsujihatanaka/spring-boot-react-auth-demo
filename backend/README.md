
### 1. 前提条件

-   Java 17 以上
-   MySQL 8.0 以上

### 2. データベース設定

1.  MySQLサーバーを起動します。
2.  MySQLにログインし、新しいデータベースとユーザーを作成します。

    ```sql
    CREATE DATABASE user_auth_db;

    -- パスワードは、ご自身で決めたものに置き換えてください。
    CREATE USER 'admin'@'localhost' IDENTIFIED BY 'YOUR_DB_PASSWORD_HERE';
    GRANT ALL PRIVILEGES ON user_auth_db.* TO 'admin'@'localhost';
    FLUSH PRIVILEGES;
    ```
    - **`'YOUR_DB_PASSWORD_HERE'`** の部分は、ご自身で決めた強力なパスワードに置き換えてください。

3.  application.properties の作成
-   /backend/src/main/resources/application.properties を作製して下さい。

    ```
    # Server Configuration
server.port=8080

# Database Connection
spring.datasource.url=jdbc:mysql://localhost:3306/auth?allowPublicKeyRetrieval=true&useSSL=false
spring.datasource.username=admin
spring.datasource.password=YOUR_DB_PASSWORD_HERE
spring.jpa.hibernate.ddl-auto=update
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver

# JPA/Hibernate Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect

# Application Name
spring.application.name=user-auth-api
    ```
    - **`'YOUR_DB_PASSWORD_HERE'`** の部分は、ご自身で決めた強力なパスワードに置き換えてください。

### 3. バックエンドの起動

```bash
mvn spring-boot:run
    ```
