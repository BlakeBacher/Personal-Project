create table users(
    ID serial PRIMARY KEY,
    auth_id text,
    username VARCHAR(40),
    full_name VARCHAR(40),
    profile_picture text
)