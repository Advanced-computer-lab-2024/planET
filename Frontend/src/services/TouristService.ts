import axiosInstance from '../utils/axiosInstance';
import axios from 'axios';

class TouristService {

  

  
  public static getTouristByemail = async (email: string) => {
    try {
      const response = await axiosInstance.get(`/tourist/getTourist/${email}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  public static updateTourist = async (email: string, touristData: object) => {
    try {
      const response = await axiosInstance.put(`/tourist/updateTourist/${email}`, touristData);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  
}

export { TouristService };