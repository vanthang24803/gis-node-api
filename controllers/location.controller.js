import { isExistCategory } from "../services/category.service.js";
import { responseMessage } from "../utils/message.js";
import {
  createLocationAsync,
  getAllLocationAsync,
} from "../services/location.service.js";

export const createLocation = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: "Request body is missing" });
  }

  try {
    const body = req.body;
    const exitCategory = await isExistCategory(body.categoryId);

    if (!exitCategory) {
      return res
        .status(404)
        .json(responseMessage(false, "Category not found!"));
    }

    const result = await createLocationAsync(body);

    res.status(201).json(responseMessage(true, result));
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error!" });
  }
};

export const getAllLocation = async (req, res) => {
  try {
    const result = await getAllLocationAsync();

    if (result.length == 0) {
      return res.status(404).json(responseMessage(false, "Location not found"));
    }

    res.status(200).json(responseMessage(true, result));
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error!" });
  }
};
