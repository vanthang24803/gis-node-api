import prisma from "../lib/prisma.js";

export const createAsync = async (body) => {
  const newCategory = await prisma.category.create({
    data: {
      name: body.name,
    },
  });
  return newCategory;
};

export const getAllAsync = async () => {
  return await prisma.category.findMany();
};

export const updateAsync = async (id, body) => {
  const updateCategory = await prisma.category.update({
    where: { id },
    data: {
      name: body.name,
    },
  });
  return updateCategory;
};

export const deleteAsync = async (id) => {
  return await prisma.category.delete({
    where: {
      id,
    },
  });
};

export const isExist = async (id) => {
  const category = await prisma.category.findUnique({
    where: {
      id: id,
    },
  });
  return Boolean(category);
};
