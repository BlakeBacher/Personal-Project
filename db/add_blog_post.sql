INSERT into blogposts
(title, post, posted_by_user, date)
VALUES
($1, $2, $3, now());
select * from blogposts
order by id desc;