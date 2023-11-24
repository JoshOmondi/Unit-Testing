create or Alter procedure getSingleUser
@email VARCHAR(250)
AS
BEGIN
    select * from Users
where email = @email
END