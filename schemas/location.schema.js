import { z } from "zod";

export const LocationSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1),
  administrativeAddress: z.string().min(1),
  longitude: z.number(),
  latitude: z.number(),
  x: z.number(),
  y: z.number(),
  rating: z.string().nullable().optional(),
  detail: z.string().min(1),
  categoryId: z.string().min(1),
});

export const UpdateLocation = z.object({
  name: z.string().min(1),
  administrativeAddress: z.string().min(1),
  longitude: z.number(),
  latitude: z.number(),
  x: z.number(),
  y: z.number(),
  rating: z.string().nullable().optional(),
  detail: z.string().min(1),
});
