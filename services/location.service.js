import prisma from "../lib/prisma.js";

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

export const getAllLocationAsync = () => {
  return prisma.location.findMany();
};
