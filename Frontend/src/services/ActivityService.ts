import axiosInstance from '../utils/axiosInstance';
import axios from 'axios';

class ActivityService{
 public static getAllActivities=async () => {
    try{
      const response=await axiosInstance.get("/activity/getAllActivities");
      return response.data;
    }
    catch(error){
     throw error;
    }
      
 };
  public static getActivityById=async (id:string) => {
      try{
        const response=await axiosInstance.get(`/activity/getActivityByID/${id}`);
        return response.data;
      }
      catch(error){
      throw error;
      }
        
  };
}
export{ActivityService};
