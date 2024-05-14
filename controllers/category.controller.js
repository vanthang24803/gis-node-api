import { CategoryService } from "../services/category.service.js";
import { responseMessage } from "../utils/message.js";

const categoryService = new CategoryService();

export class CategoryController {
  createCategory = async (req, res) => {
    if (!req.body) {
      return res.status(400).json({ error: "Request body is missing" });
    }

    try {
      const body = req.body;

      const newCategory = await categoryService.createCategoryAsync(body);

      const message = responseMessage(true, newCategory);

      res.status(201).json(message);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server Error!" });
    }
  };

  getAllCategory = async (req, res) => {
    try {
      const result = await categoryService.getAllCategoryAsync();

      res.status(200).json(responseMessage(true, result));
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server Error!" });
    }
  };

  updateCategory = async (req, res) => {
    const { id } = req.params;
    const body = req.body;

    if (!req.body) {
      return res.status(400).json({ error: "Request body is missing" });
    }
    try {
      const exitCategory = await categoryService.isExistCategory(id);

      if (!exitCategory) {
        return res
          .status(404)
          .json(responseMessage(false, "Category not found!"));
      }

      const result = await categoryService.updateCategoryAsync(id, body);

      res.status(200).json(responseMessage(true, result));
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server Error!" });
    }
  };

  deleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
      const exitCategory = await categoryService.isExistCategory(id);

      if (!exitCategory) {
        return res
          .status(404)
          .json(responseMessage(false, "Category not found!"));
      }

      await categoryService.deleteCategoryAsync(id);

      res
        .status(200)
        .json(responseMessage(true, "Category deleted successfully!"));
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server Error!" });
    }
  };
}
