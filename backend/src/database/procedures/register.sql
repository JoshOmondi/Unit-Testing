-- USE TESTING
CREATE OR ALTER PROCEDURE 
registerUsers(
    @userID VARCHAR(100),
    @userName VARCHAR(200),
    @email VARCHAR(300),
    @cohortnumber VARCHAR(100),
    @password VARCHAR(200)
)
AS
BEGIN
    IF NOT EXISTS (SELECT 1 FROM Users WHERE email = @email)
    BEGIN
        -- DECLARE @userID UNIQUEIDENTIFIER = NEWID();
        
        INSERT INTO Users (userID, userName,  email, cohortnumber, password)
        VALUES (@userID, @userName, @email,cohortnumber, @password);
    END
    ELSE
    BEGIN
        PRINT 'Email already exists. User not registered.'
    END
END;
