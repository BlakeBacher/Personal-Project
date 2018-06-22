update appointments
set firstname = $2, lastname = $3, phonenumber = $4, service = $5, date = $6, time = $7, notes = $8
where id = $1;

select * from appointments
order by id desc;



