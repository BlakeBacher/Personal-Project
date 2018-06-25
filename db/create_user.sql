insert into users
(auth_id, nickname, displayname, picture) 
values 
($1, $2, $3, $4)
returning *;