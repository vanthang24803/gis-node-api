import prisma from "../lib/prisma.js";

export class CategoryService {
  async createCategoryAsync(body) {
    const newCategory = await prisma.category.create({
      data: {
        name: body.name,
      },
    });
    return newCategory;
  }

  async getAllCategoryAsync() {
    return await prisma.category.findMany();
  }

  async updateCategoryAsync(id, body) {
    const updateCategory = await prisma.category.update({
      where: { id },
      data: {
        name: body.name,
      },
    });
    return updateCategory;
  }

  async deleteCategoryAsync(id) {
    await prisma.category.delete({
      where: {
        id,
      },
    });
  }

  async isExistCategory(id) {
    const category = await prisma.category.findUnique({
      where: {
        id: id,
      },
    });
    return Boolean(category);
  }

  async findCategoryByName(name) {
    return await prisma.category.findFirst({
      where: {
        name,
      },
    });
  }
}