import {
  createImageAsync,
  deleteImageAsync,
} from "../services/image.service.js";
import { isExistLocationById } from "../services/location.service.js";
import { responseMessage } from "../utils/message.js";

export const uploadImage = async (req, res) => {
  const files = req.files;

  const { id } = req.params;

  if (!files || files.length === 0) {
    return res.status(400).json({ message: "Please upload a file" });
  }

  try {
    const exitingLocation = await isExistLocationById(id);

    if (!exitingLocation) {
      return res.status(404).json(responseMessage(false, "Location not found"));
    }

    const result = await createImageAsync(id, files);

    res.status(200).json(responseMessage(true, result));
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error!" });
  }
};

export const deleteImage = async (req, res) => {
  const { locationId, id } = req.params;

  try {
    const exitingLocation = await isExistLocationById(locationId);

    if (!exitingLocation) {
      return res.status(404).json(responseMessage(false, "Location not found"));
    }

    await deleteImageAsync(id);

    res.status(200).json(responseMessage(true, "Image deleted successfully!"));
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error!" });
  }
};
