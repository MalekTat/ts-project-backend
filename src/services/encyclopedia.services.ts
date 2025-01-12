import axios from "axios";
import { EncyclopediaPlant } from "../types";


// Helper function to fetch plant data from the OpenFarm API
async function fetchPlantDetails(plantName: string): Promise<EncyclopediaPlant | null> {
    const API_URL = `https://openfarm.cc/api/v1/crops/?filter=${encodeURIComponent(plantName)}`;
    
    try {
      const response = await axios.get(API_URL);
      const plantData = response.data;
  
      // Assuming the API returns a `data` array and you take the first result
      if (plantData && plantData.data && plantData.data.length > 0) {
        const plantInfo = plantData.data[0].attributes;
        return {
          name: plantInfo.name,
          description: plantInfo.description,
          sunlight: plantInfo.sun_requirements || "Unknown",
          imageUrl: plantInfo.main_image_path || "",
        };
      }
    } catch (error) {
      console.error("Failed to fetch plant details from OpenFarm API", error);
    }
  
    return null;
  }


/*
// Helper function to fetch plant data from the OpenFarm API
async function fetchPlantDetails(plantName: string): Promise<EncyclopediaPlant | null> {
    const API_URL = `https://openfarm.cc/api/v1/crops/${encodeURIComponent(plantName)}`;
    
    try {
      const response = await axios.get(API_URL);
      const plantData = response.data;
  
      // Assuming the API returns a `data` array and you take the first result
      //if (plantData && plantData.data && plantData.data.length > 0) {
        const plantInfo = plantData.data.attributes;
        return {
          name: plantInfo.name,
          description: plantInfo.description,
          sunlight: plantInfo.sun_requirements || "Unknown",
          imageUrl: plantInfo.main_image_path || "",
        };
      //}
    } catch (error) {
      console.error("Failed to fetch plant details from OpenFarm API", error);
    }
  
    return null;
  }

*/

export { fetchPlantDetails };
