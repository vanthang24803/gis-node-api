import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";
import { UserResponse } from "../schemas/auth.schema.js";

export const registerAsync = async (request) => {
  const newUser = await prisma.user.create({
    data: {
      email: request.email,
      firstName: request.firstName,
      lastName: request.lastName,
      password: bcrypt.hashSync(request.password, bcrypt.genSaltSync(10)),
    },
  });

  const response = UserResponse.parse(newUser);

  return response;
};

export const loginAsync = async (request) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email: request.email,
    },
  });

  const isSuccess = bcrypt.compareSync(request.password, existingUser.password);

  const user = {
    id: existingUser.id,
    email: existingUser.email,
    name: `${existingUser.firstName} ${existingUser.lastName}`,
    avatar: existingUser.avatar,
    role: existingUser.role,
  };

  const response = await new Promise((resolve, reject) => {
    jwt.sign(user, process.env.SECRET, { expiresIn: "1d" }, (err, token) => {
      if (err) {
        reject(err);
      }

      resolve({
        status: isSuccess,
        token: token,
      });
    });
  });

  return response;
};

export const findUserByToken = async (token) => {
  let decodedUser;

  jwt.verify(token, process.env.SECRET, (err, user) => {
    if (err) {
      throw new Error("Invalid token");
    }
    decodedUser = user;
  });

  const existingUser = await prisma.user.findUnique({
    where: {
      id: decodedUser.id,
    },
  });

  if (!existingUser) {
    throw new Error("User not found");
  }

  const user = UserResponse.parse(existingUser);

  return {
    status: true,
    user: user,
  };
};

export const upgradeToAdmin = async (request) => {
  const existingUser = await prisma.user.update({
    where: {
      email: request.email,
    },
    data: {
      role: "ADMIN",
    },
  });

  return {
    status: true,
    message: `${existingUser.firstName} ${existingUser.lastName} is admin!`,
  };
};

export const isExitUserByEmail = async (email) => {
  const exitingUser = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  return Boolean(exitingUser);
};
