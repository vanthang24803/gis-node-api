import prisma from "../lib/prisma.js";
import { CategoryService } from "./category.service.js";


const categoryService = new CategoryService();
export class LocationService {
  createLocationAsync = (data) => {
    const newLocation = prisma.location.create({
      data: {
        name: data.name,
        administrativeAddress: data.administrativeAddress,
        longitude: data.longitude,
        latitude: data.latitude,
        x: data.x,
        y: data.y,
        detail: data.detail,
        rating: data.rating,
        categoryId: data.categoryId,
      },
    });

    return newLocation;
  };

  getAllLocationAsync = async (query) => {
    let category;

    if (query.category) {
      category = await categoryService.findCategoryByName(query.category);
    }

    const whereClause = {
      name: query.name ? { contains: query.name } : undefined,
      categoryId: category ? category.id : undefined,
    };

    const listLocations = await prisma.location.findMany({
      where: whereClause,
      include: {
        images: true,
      },
    });

    const totalLocation = await prisma.location.count({
      where: whereClause,
    });

    const response = {
      status: listLocations.length ? true : false,
      total: totalLocation,
      data: listLocations,
    };

    return response;
  };

  getDetailLocationAsync = (id) => {
    return prisma.location.findFirst({
      where: {
        id,
      },
    });
  };

  updateLocationAsync = async (id, data) => {
    const updateLocation = await prisma.location.update({
      where: { id },
      data: {
        name: data.name,
        administrativeAddress: data.administrativeAddress,
        longitude: data.longitude,
        latitude: data.latitude,
        x: data.x,
        y: data.y,
        detail: data.detail,
        rating: data.rating,
      },
    });

    return updateLocation;
  };

  deleteLocationAsync = async (id) => {
    await prisma.location.delete({
      where: {
        id,
      },
    });
  };

  isExistLocationById = async (id) => {
    const location = await prisma.location.findUnique({
      where: {
        id: id,
      },
    });
    return Boolean(location);
  };

  isExistLocationByName = async (name) => {
    const location = await prisma.location.findFirst({
      where: {
        name,
      },
    });

    return Boolean(location);
  };
}
