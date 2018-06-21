INSERT into blogposts
(title, post)
VALUES
($1, $2);
select * from blogposts
order by id desc;