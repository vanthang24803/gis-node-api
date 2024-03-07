import prisma from "../lib/prisma.js";

export const createCategoryAsync = async (body) => {
  const newCategory = await prisma.category.create({
    data: {
      name: body.name,
    },
  });
  return newCategory;
};

export const getAllCategoryAsync = async () => {
  return await prisma.category.findMany();
};

export const updateCategoryAsync = async (id, body) => {
  const updateCategory = await prisma.category.update({
    where: { id },
    data: {
      name: body.name,
    },
  });
  return updateCategory;
};

export const deleteCategoryAsync = async (id) => {
  return await prisma.category.delete({
    where: {
      id,
    },
  });
};

export const isExistCategory = async (id) => {
  const category = await prisma.category.findUnique({
    where: {
      id: id,
    },
  });
  return Boolean(category);
};

export const findCategoryByName = async (name) => {
  return await prisma.category.findFirst({
    where: {
      name,
    },
  });
};
