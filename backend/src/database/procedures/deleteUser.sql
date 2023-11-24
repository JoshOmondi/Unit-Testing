-- use TESTING
-- drop procedure deleteUser
-- select * from Users
CREATE OR ALTER PROCEDURE deleteUser
    @userID VARCHAR(1000)  
AS
BEGIN
       
        IF EXISTS (
            SELECT 1
            FROM Projects
            WHERE UserID = @ID
        )
        BEGIN
            
            DELETE FROM Projects
            WHERE UserID = @UserID;

            SELECT 1 AS DeletionResult; 
        END
        ELSE
        BEGIN
            SELECT -2 AS DeletionResult; 
        END
END

DROP PROCEDURE deleteUser
