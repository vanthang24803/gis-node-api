import prisma from "../lib/prisma.js";
import { findCategoryByName } from "./category.service.js";

export const createLocationAsync = (data) => {
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

export const getAllLocationAsync = async (query) => {
  let category;

  if (query.category) {
    category = await findCategoryByName(query.category);
  }

  const whereClause = {
    name: query.name ? { contains: query.name } : undefined,
    categoryId: category ? category.id : undefined,
  };

  const listLocations = await prisma.location.findMany({
    where: whereClause,
    include: {
      images : true
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

export const getDetailLocationAsync = (id) => {
  return prisma.location.findFirst({
    where: {
      id,
    },
  });
};

export const updateLocationAsync = async (id, data) => {
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

export const deleteLocationAsync = async (id) => {
  await prisma.location.delete({
    where: {
      id,
    },
  });
};

export const isExistLocationById = async (id) => {
  const location = await prisma.location.findUnique({
    where: {
      id: id,
    },
  });
  return Boolean(location);
};

export const isExistLocationByName = async (name) => {
  const location = await prisma.location.findFirst({
    where: {
      name,
    },
  });

  return Boolean(location);
};

