import { execute } from "../services/dbhelper";
import { hashPass } from "../services/hashPassword";
import { registerUser } from "./userControllers";

jest.mock("../services/dbhelper.ts", () => ({
  execute: jest.fn()
}));
jest.mock("../services/hashPassword.ts", () => ({
  hashPass: jest.fn()
}));

describe("userController test", () => {
  test("should register a user", async() => {
    //arrange
    const req: any = {
      body: {
        userName: "joshua ochieng",
        email: "joshua.ochieng@thejitu.com",
        password: "@Qwerty123",
        cohortnumber: "24",
      },
    } as any;

    const res: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any;

    //moch password harsher
    (hashPass as jest.Mock).mockResolvedValue("hashed password");

    //mock db helper
    (execute as jest.Mock).mockResolvedValue({});

    //act
    await registerUser(req,res)

    //assert

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({message:"User registered successfully"});
  });
});
