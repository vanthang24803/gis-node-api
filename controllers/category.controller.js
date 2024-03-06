import {
  createAsync,
  deleteAsync,
  getAllAsync,
  isExist,
  updateAsync,
} from "../services/category.service.js";
import { responseMenage } from "../utils/respone.js";

export const createCategory = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ error: "Request body is missing" });
  }

  try {
    const body = req.body;

    const newCategory = await createAsync(body);

    const message = responseMenage(true, newCategory);

    res.status(201).json(message);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error!" });
  }
};

export const getAllCategory = async (req, res) => {
  try {
    const result = await getAllAsync();

    if (result.length == 0) {
      return res.status(404).json(responseMenage(false, "Category not found!"));
    }

    res.status(200).json(responseMenage(true, result));
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error!" });
  }
};

export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  if (!req.body) {
    return res.status(400).json({ error: "Request body is missing" });
  }
  try {
    const exitCategory = await isExist(id);

    if (!exitCategory) {
      return res.status(404).json(responseMenage(false, "Category not found!"));
    }

    const result = await updateAsync(id, body);

    res.status(200).json(responseMenage(true, result));
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error!" });
  }
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const exitCategory = await isExist(id);

    if (!exitCategory) {
      return res.status(404).json(responseMenage(false, "Category not found!"));
    }

    await deleteAsync(id);

    res
      .status(200)
      .json(responseMenage(true, "Category deleted successfully!"));
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error!" });
  }
};
