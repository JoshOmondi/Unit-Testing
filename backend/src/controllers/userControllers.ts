import { Request, Response } from "express";
import mssql, { pool } from "mssql";
import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

import { sqlConfig } from "../config/sqlConfig";
import {
  userRegisterValidationSchema,
} from "../validators/userValidators";
import { ExtendedUser } from "../middlewares/verifyToken";
import { v4 } from "uuid";
import { log } from "console";
import { execute, query } from "../services/dbhelper";
import { hashPass } from "../services/hashPassword";

//register user
export const registerUser = async (req: Request, res: Response) => {
  try {
    let { userName, email, password, cohortnumber } = req.body;

    let { error } = userRegisterValidationSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    let userID = v4();
    const hashedPwd = await hashPass(password)

    const pool = await mssql.connect(sqlConfig);

    const result = await execute("getSingleUser", {email});

    const emailCheckResult =
      result.recordset && result.recordset.length > 0
        ? result.recordset[0]
        : undefined;

    if (emailCheckResult) {
      return res
        .status(400)
        .json({ error: "Email already exists. User not registered." });
    }


    
     await execute("registerUsers", {
      userID,
      userName,
      email,
      cohortnumber,
      password: hashedPwd,
    });

    return res.status(200).json({
      message: "User registered successfully",
    });
  } catch (error) {
    console.log(error);
    
    return res.json({
      error: error,
    });
  }
};
//delete user
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userID } = req.body;

    if (!userID) {
      return res.status(400).json({ error: "userID is required." });
    }

    const pool = await mssql.connect(sqlConfig);

    const request = pool.request();

    request.input("userID", mssql.VarChar(1000), userID);

    const result = await request.execute("deleteUser");

    const deletionResult = result.recordset[0].DeletionResult;

    if (deletionResult === 1) {
      return res
        .status(200)
        .json({ success: true, message: "User deleted successfully." });
    } else if (deletionResult === -2) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    } else {
      return res
        .status(500)
        .json({ success: false, message: "Failed to delete user." });
    }
  } catch (error) {
    return res.json({
      error: error,
    });
  }
};

// Update user status
export const updateUserStatus = async (req: Request, res: Response) => {
  try {
    const { assignedUserEmail, newStatus } = req.body;

    if (!assignedUserEmail || !newStatus) {
      return res
        .status(400)
        .json({ error: "assignedUserEmail and newStatus are required." });
    }
    const pool = await mssql.connect(sqlConfig);

    const request = pool.request();

    request.input("AssignedUserEmail", mssql.NVarChar(255), assignedUserEmail);
    request.input("NewStatus", mssql.NVarChar(255), newStatus);
    await request.execute("UpdateUser");

    return res.status(200).json({
      success: true,
      message: "User status updated successfully",
    });
  } catch (error) {
    return res.json({
      error: error,
    });
  }
};
// Get single user by email
export const getSingleUser = async (req: Request, res: Response) => {
  try {
    const { email } = req.params;

    if (!email) {
      return res.status(400).json({ error: "Email parameter is required." });
    }

    const pool = await mssql.connect(sqlConfig);

    const request = pool.request();

    request.input("email", mssql.VarChar(250), email);

    const result = await request.query("EXEC getSingleUser @email");

    if (result.recordset.length > 0) {
      return res.status(200).json({
        success: true,
        user: result.recordset[0],
      });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }
  } catch (error) {
    return res.json({
      error: error,
    });
  }
};
