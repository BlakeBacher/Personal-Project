update blogposts
set title = $2, post = $3
where id = $1;

select * from blogposts
order by id desc;
