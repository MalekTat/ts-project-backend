
import { Request } from "express";


export interface WeatherData {
    temperature: string;
    description: string;
    icon: string;
  }
  
export interface EncyclopediaPlant {
    name: string;
    description: string;
    sunlight: string;
    imageUrl: string;
}



export interface RequestPlant extends Request {
  body: {
    name: string;              // Plant name
    waterFrequency: string;    // Watering frequency (in days)
    notes?: string;            // Optional notes about the plant
  };
}

export interface RequestWateringLog extends Request {
  body: {
    plantId: string;  // Receive the plantId as a string from the client
    date: string;     // Receive date as an ISO string
    notes?: string;   // Optional notes
  };
}


export interface RequestGrowthLog extends Request {
  body: {
    plantId: string;  // Receive the plantId as a string from the client
    date: string;     // Receive date as an ISO string
    height?: string;
    notes?: string;   // Optional notes
    imageUrl?: string; // Optional image upload (Cloudinary)
  };
}

  