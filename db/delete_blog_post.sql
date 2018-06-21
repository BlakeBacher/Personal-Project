delete from blogposts
where id = $1;
select * from blogposts
order by id desc;