import { AuthService } from "../services/auth.service.js";

const service = new AuthService();

export class AuthController {
  register = async (req, res) => {
    if (!req.body) {
      return res.status(400).json({ error: "Request body is missing" });
    }

    try {
      const body = req.body;

      if (!body.email || !body.password) {
        return res
          .status(400)
          .json({ error: "Email and password are required" });
      }

      const exitingUser = await service.isExitUserByEmail(body.email);

      if (exitingUser) {
        return res.status(400).json({ message: "The Email was registered" });
      }

      const result = await service.register(body);

      res.status(201).json({
        status: true,
        user: result,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server is error!" });
    }
  };

  login = async (req, res) => {
    if (!req.body) {
      return res.status(400).json({ error: "Request body is missing" });
    }

    try {
      const body = req.body;

      if (!body.email || !body.password) {
        return res
          .status(400)
          .json({ error: "Email and password are required" });
      }

      const exitingUser = await service.isExitUserByEmail(body.email);

      if (!exitingUser) {
        return res
          .status(400)
          .json({ message: "Check your email and password again!" });
      }

      const result = await service.login(body);

      if (!result.status) {
        return res
          .status(400)
          .json({ error: "Email and password are required" });
      }

      res
        .status(200)
        .cookie("token", result.token, { maxAge: 24 * 60 * 60 * 1000 })
        .json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server is error!" });
    }
  };

  profile = async (req, res) => {
    try {
      const token = req.cookies.token;

      const result = await service.findUserByToken(token);

      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server is error!" });
    }
  };

  upgradeRoleAdmin = async (req, res) => {
    if (!req.body) {
      return res.status(400).json({ error: "Request body is missing" });
    }

    try {
      const body = req.body;

      const exitingUser = await service.isExitUserByEmail(body.email);

      if (!exitingUser) {
        return res.status(400).json({ message: "User not found!" });
      }

      const result = await service.upgradeToAdmin(body);

      return res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server is error!" });
    }
  };
}
