import { responseMessage } from "../utils/message.js";
import { PhotoService } from "../services/image.service.js";
import { LocationService } from "../services/location.service.js";

const photoService = new PhotoService();
const locationService = new LocationService();
export class PhotoController {
  uploadImage = async (req, res) => {
    const files = req.files;

    const { id } = req.params;

    if (!files || files.length === 0) {
      return res.status(400).json({ message: "Please upload a file" });
    }

    try {
      const exitingLocation = await locationService.isExistLocationById(id);

      if (!exitingLocation) {
        return res
          .status(404)
          .json(responseMessage(false, "Location not found"));
      }

      const result = await photoService.createImageAsync(id, files);

      res.status(200).json(responseMessage(true, result));
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server Error!" });
    }
  };

  deleteImage = async (req, res) => {
    const { locationId, id } = req.params;

    try {
      const exitingLocation = await locationService.isExistLocationById(locationId);

      if (!exitingLocation) {
        return res
          .status(404)
          .json(responseMessage(false, "Location not found"));
      }

      await photoService.deleteImageAsync(id);

      res
        .status(200)
        .json(responseMessage(true, "Image deleted successfully!"));
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Server Error!" });
    }
  };
}
