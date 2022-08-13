### .env
* DATABASE_USERNAME=root
* DATABASE_PASSWORD=snmsung1.
* DATABASE_PORT=3306
* DATABASE_DATABASE=post_board

* BCRYPT_SALT=$2b$10$mhBzFw7h3HE1znNEzM.NPu
* JWT_SECRET_KEY=secretKey

## Module - Controller - Entity
* Controller 추가시에 ( ApiTags ) 
* Entity 생성 시에 app.module에서 entities에 Entity 추가
* Entity 작성 시에 id: PrimaryGeneratedColumn(uuid), Column: ApiProperty

## 추가
* 1. category 기능 구현 ( C. R. U. D)
* 2. category 에 Post 컬럼 추가 (Entity, [id, name, author, PostEntity[], create_at])
