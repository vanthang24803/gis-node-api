import { CategoryService } from "../services/category.service.js";
import { LocationService } from "../services/location.service.js";
import { responseMessage } from "../utils/message.js";

const locationService = new LocationService();
const categoryService = new CategoryService();

export class LocationController {
  createLocation = async (req, res) => {
    if (!req.body) {
      return res.status(400).json({ error: "Request body is missing" });
    }

    try {
      const body = req.body;
      const exitCategory = await categoryService.isExistCategory(
        body.categoryId
      );
      const exitLocation = await locationService.isExistLocationByName(
        body.name
      );

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

      const result = await locationService.createLocationAsync(body);

      res.status(201).json(responseMessage(true, result));
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server Error!" });
    }
  };
  getAllLocation = async (req, res) => {
    try {
      const query = req.query;
      const result = await locationService.getAllLocationAsync(query);

      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server Error!" });
    }
  };
  getDetailLocation = async (req, res) => {
    try {
      const { id } = req.params;

      const exitingLocation = await locationService.isExistLocationById(id);

      if (!exitingLocation) {
        return res
          .status(404)
          .json(responseMessage(false, "Location not found"));
      }

      const result = await locationService.getDetailLocationAsync(id);

      return res.status(200).json(responseMessage(true, result));
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server Error!" });
    }
  };
  updateLocation = async (req, res) => {
    if (!req.body) {
      return res.status(400).json({ error: "Request body is missing" });
    }

    try {
      const { id } = req.params;
      const body = req.body;

      const exitingLocation = await locationService.isExistLocationById(id);

      if (!exitingLocation) {
        return res
          .status(404)
          .json(responseMessage(false, "Location not found"));
      }

      const result = await locationService.updateLocationAsync(id, body);

      res.status(200).json(responseMessage(true, result));
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server Error!" });
    }
  };
  deleteLocation = async (req, res) => {
    try {
      const { id } = req.params;

      const exitingLocation = await locationService.isExistLocationById(id);

      if (!exitingLocation) {
        return res
          .status(404)
          .json(responseMessage(false, "Location not found"));
      }

      await locationService.deleteLocationAsync(id);

      res
        .status(200)
        .json(responseMessage(true, "Location deleted successfully!"));
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server Error!" });
    }
  };
}
