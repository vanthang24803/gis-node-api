import {
  findUserByToken,
  isExitUserByEmail,
  loginAsync,
  registerAsync,
  upgradeToAdmin,
} from "../services/auth.service.js";

export const register = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: "Request body is missing" });
  }

  try {
    const body = req.body;

    if (!body.email || !body.password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const exitingUser = await isExitUserByEmail(body.email);

    if (exitingUser) {
      return res.status(400).json({ message: "The Email was registered" });
    }

    const result = await registerAsync(body);

    res.status(201).json({
      status: true,
      user: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server is error!" });
  }
};


export const login = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: "Request body is missing" });
  }

  try {
    const body = req.body;

    if (!body.email || !body.password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const exitingUser = await isExitUserByEmail(body.email);

    if (!exitingUser) {
      return res
        .status(400)
        .json({ message: "Check your email and password again!" });
    }

    const result = await loginAsync(body);

    if (!result.status) {
      return res.status(400).json({ error: "Email and password are required" });
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

export const profile = async (req, res) => {
  try {
    const token = req.cookies.token;

    const result = await findUserByToken(token);

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server is error!" });
  }
};

export const upgradeRoleAdmin = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: "Request body is missing" });
  }

  try {
    const body = req.body;

    const exitingUser = await isExitUserByEmail(body.email);

    if (!exitingUser) {
      return res.status(400).json({ message: "User not found!" });
    }

    const result = await upgradeToAdmin(body);

    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server is error!" });
  }
};
