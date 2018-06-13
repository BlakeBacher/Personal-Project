insert into users
(auth_id, username, full_name, profile_picture) 
values 
($1, $2, $3, $4)
returning *;