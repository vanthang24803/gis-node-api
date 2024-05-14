import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import prisma from "../lib/prisma.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export class PhotoService {
  createImageAsync = async (id, files) => {
    const images = await Promise.all(
      files.map((file) => {
        return prisma.image.create({
          data: {
            locationId: id,
            url: file.path,
          },
        });
      })
    );

    return images;
  };

  deleteImageAsync = async (id) => {
    const image = await prisma.image.findUnique({
      where: { id },
    });

    if (image) {
      const filePath = join(__dirname, "..", image.url);

      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Error deleting file:", err);
        }
      });

      await prisma.image.delete({
        where: { id },
      });
    } else {
      console.error("Image not found in the database");
    }
  };
}
