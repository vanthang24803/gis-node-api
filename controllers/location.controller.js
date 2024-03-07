import { isExistCategory } from "../services/category.service.js";
import { responseMessage } from "../utils/message.js";
import {
  createLocationAsync,
  deleteLocationAsync,
  getAllLocationAsync,
  getDetailLocationAsync,
  isExistLocationById,
  isExistLocationByName,
  updateLocationAsync,
} from "../services/location.service.js";

export const createLocation = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: "Request body is missing" });
  }

  try {
    const body = req.body;
    const exitCategory = await isExistCategory(body.categoryId);
    const exitLocation = await isExistLocationByName(body.name);

    if (!exitCategory) {
      return res
        .status(404)
        .json(responseMessage(false, "Category not found!"));
    }

    if (exitLocation) {
      return res
        .status(400)
        .json(responseMessage(false, "Location already exist"));
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
    const query = req.query;
    const result = await getAllLocationAsync(query);

    if (!result.status) {
      return res.status(404).json(responseMessage(false, "Location not found"));
    }

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error!" });
  }
};

export const getDetailLocation = async (req, res) => {
  try {
    const { id } = req.params;

    const exitingLocation = await isExistLocationById(id);

    if (!exitingLocation) {
      return res.status(404).json(responseMessage(false, "Location not found"));
    }

    const result = await getDetailLocationAsync(id);

    return res.status(200).json(responseMessage(true, result));
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error!" });
  }
};

export const updateLocation = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: "Request body is missing" });
  }

  try {
    const { id } = req.params;
    const body = req.body;

    const exitingLocation = await isExistLocationById(id);

    if (!exitingLocation) {
      return res.status(404).json(responseMessage(false, "Location not found"));
    }

    const result = await updateLocationAsync(id, body);

    res.status(200).json(responseMessage(true, result));
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error!" });
  }
};

export const deleteLocation = async (req, res) => {
  try {
    const { id } = req.params;

    const exitingLocation = await isExistLocationById(id);

    if (!exitingLocation) {
      return res.status(404).json(responseMessage(false, "Location not found"));
    }

    await deleteLocationAsync(id);

    res
      .status(200)
      .json(responseMessage(true, "Location deleted successfully!"));
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error!" });
  }
};
