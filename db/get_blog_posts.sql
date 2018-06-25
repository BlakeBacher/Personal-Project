select blogposts.id, blogposts.title, blogposts.post, blogposts.date, users.displayname
from blogposts
join users on users.id = blogposts.posted_by_user

order by blogposts.id desc;