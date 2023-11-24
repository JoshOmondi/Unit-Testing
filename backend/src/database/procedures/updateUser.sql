-- use TESTING
-- select * from Users
CREATE PROCEDURE UpdateUser
   @AssignedUserEmail NVARCHAR(255),
   @NewStatus NVARCHAR(255)
AS
BEGIN
    
    UPDATE Users
SET UserStatus = @NewStatus,
    isCompleted = CASE WHEN @NewStatus = 'completed' THEN 1 ELSE 0 END
WHERE AssignedUserEmail = @AssignedUserEmail;

END;
DROP PROCEDURE  UpdateUser
-- UPDATE User
    -- SET UsertStatus = @NewStatus
    -- WHERE AssignedUserEmail = @AssignedUserEmail;

