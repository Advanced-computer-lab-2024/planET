import axiosInstance from "../utils/axiosInstance";
import showToast from "../../src/utils/showToast";

class TouristService {
  public static getTouristByemail = async (email: string) => {
    try {
      const response = await axiosInstance.get(`/tourist/getTourist/${email}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  public static updateTourist = async (
    email: string,
    advertiserData: object
  ) => {
    try {
      const response = await axiosInstance.put(
        `/tourist/updateTourist/${email}`,
        advertiserData
      );
      if (response.status === 200) {
        showToast(response.data);
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  public static rateAndCommentActivity = async (id: string, data: any) => {
    try {
      const response = await axiosInstance.post(
        `/tourist/rateAndCommentActivity/${id}`,
        data
      );
      if (response.status === 201) {
        showToast(response.data);
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  public static rateAndCommentItinerary = async (id: string, data: any) => {
    try {
      const response = await axiosInstance.post(
        `/tourist/rateAndCommentItinerary/${id}`,
        data
      );
      if (response.status === 201) {
        showToast(response.data);
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  public static rateAndCommentTourGuide = async (id: string, data: any) => {
    try {
      const response = await axiosInstance.post(
        `/tourist/rateAndCommentTourGuide/${id}`,
        data
      );
      if (response.status === 201) {
        showToast(response.data);
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  public static redeemPoints = async (email: string, points: number) => {
    try {
      const response = await axiosInstance.put(`/tourist/redeemPoints/`, {
        email,
        points,
      });
      if (response.status === 200) {
        showToast(response.data);
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  public static fileComplaint = async (id: string, data: any) => {
    try {
      const response = await axiosInstance.post(
        `/tourist/fileComplaint/${id}`,
        data
      );
      if (response.status === 201) {
        showToast(response.data);
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  public static checkActivity = async (id: string, activity_id: string) => {
    try {
      const response = await axiosInstance.get(`/tourist/checkActivity/${id}`, {
        params: { activity_id },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  public static checkItinerary = async (id: string, itinerary_id: string) => {
    try {
      const response = await axiosInstance.get(
        `/tourist/checkItinerary/${id}`,
        { params: { itinerary_id } }
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  };
  public static checkTourGuide = async (
    id: string,
    tour_guide_email: string
  ) => {
    try {
      const response = await axiosInstance.get(
        `/tourist/checkTourGuide/${id}`,
        { params: { tour_guide_email } }
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  public static viewMyComplaints = async (id: string) => {
    try {
      const response = await axiosInstance.get(`/tourist/viewComplaints/${id}`);

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  public static bookActivity = async (
    email: string,
    activity_id: string,
    payment_type: string
  ) => {
    try {
      const response = await axiosInstance.post(`/tourist/bookActivity`, {
        email,
        activity_id,
        payment_type,
      });
      if (response.status === 201) {
        showToast(response.data);
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  };
  public static bookItinerary = async (
    email: string,
    itinerary_id: string,
    time_to_attend: string,
    payment_type: string
  ) => {
    try {
      const response = await axiosInstance.post(`/tourist/bookItinerary`, {
        email,
        itinerary_id,
        time_to_attend,
        payment_type,
      });
      if (response.status === 201) {
        showToast(response.data);
      }
      showToast(response.data);

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  public static deleteTourist = async (email: string) => {
    try {
      const response = await axiosInstance.delete(
        `/tourist/deleteTouristAccountRequest/${email}`
      );
      if (response.status === 200) {
        showToast(response.data);
      }

      return response.data;
    } catch (error) {
      // Rethrow the error to let the calling code handle it with the toast
      throw error;
    }
  };
  public static getUpcomingActivityBookings = async (email: string) => {
    try {
      const response = await axiosInstance.get(
        `/tourist/getUpcomingActivityBookings/${email}`
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  };
  public static getPastActivityBookings = async (email: string) => {
    try {
      const response = await axiosInstance.get(
        `/tourist/getPastActivityBookings/${email}`
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  };
  public static getUpcomingItineraryBookings = async (email: string) => {
    try {
      const response = await axiosInstance.get(
        `/tourist/getUpcomingItineraryBookings/${email}`
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  };
  public static getPastItineraryBookings = async (email: string) => {
    try {
      const response = await axiosInstance.get(
        `/tourist/getPastItineraryBookings/${email}`
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  public static cancelTicket = async (
    tourist_id: string,
    ticket_id: string
  ) => {
    try {
      const response = await axiosInstance.put(
        `/tourist/cancelTicket/${tourist_id}?ticket_id=${ticket_id}`
      );
      if (response.status === 200) {
        showToast(response.data);
      }
      showToast(response.data);

      return response.data;
    } catch (error) {
      throw error;
    }
  };
  public static getMyTourGuides = async (tourist_id: string) => {
    try {
      const response = await axiosInstance.get(
        `/tourist/getMyTourGuides/${tourist_id}`
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  public static createOrder = async (orderData: any) => {
    try {
      const response = await axiosInstance.post(
        `/tourist/createOrder/`,
        orderData
      );
      if (response.status === 201) {
        showToast(response.data);
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  };
  public static getPastOrders = async (email: string) => {
    try {
      const response = await axiosInstance.get(
        `/tourist/getPastOrders/${email}`
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  public static getActiveOrders = async (email: string) => {
    try {
      const response = await axiosInstance.get(
        `/tourist/getCurrentOrders/${email}`
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  public static cancelOrder = async (order_id: string) => {
    try {
      const response = await axiosInstance.put(
        `/tourist/cancelOrder/${order_id}`
      );
      if (response.status === 200) {
        showToast(response.data);
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  };
  public static rateAndCommentProduct = async (
    tourist_id: string,
    product_id: string,
    comment: string,
    rating: number
  ) => {
    try {
      const response = await axiosInstance.post(
        `/tourist/rateAndCommentProduct/${tourist_id}`,
        { product_id, comment, rating }
      );
      if (response.status === 201) {
        showToast(response.data);
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  public static bookmarkActivity = async (
    email: string,
    activity_id: string
  ) => {
    try {
      const response = await axiosInstance.post("/tourist/bookmarkActivity/", {
        email,
        activity_id,
      });
      return response.data;
    } catch (error) {
      console.error("Error bookmarking activity:", error);
      throw error;
    }
  };

  public static unbookmarkActivity = async (
    email: string,
    activity_id: string
  ) => {
    try {
      const response = await axiosInstance.delete(
        "/tourist/unbookmarkActivity/",
        {
          data: { email, activity_id }, // Use data to include the request body
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error unbookmarking activity:", error);
      throw error;
    }
  };

  public static getBookmarkedActivities = async (email: string) => {
    try {
      const response = await axiosInstance.get(
        `/tourist/getBookmarkedActivities/${email}`
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  public static addAddress = async (email: string, data: any) => {
    try {
      const response = await axiosInstance.put(
        `/tourist/addAddress/${email}`,
        data
      );
      if (response.status === 200) {
        showToast(response.data);
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  public static removeAddress = async (email: string) => {
    try {
      const response = await axiosInstance.delete(
        `/tourist/removeAddress/${email}`
      );
      if (response.status === 200) {
        showToast(response.data);
      }

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  public static getAddresses = async (email: string) => {
    try {
      const response = await axiosInstance.get(
        `/tourist/getAddresses/${email}`
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  };

  public static isValidPromoCode = async (promoCode: string) => {
    try {
      const response = await axiosInstance.get(
        `/tourist/isValidPromo/${promoCode}`
      );
      if (response.status === 200) {
        showToast(response.data);
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  };

  public static addProductToWishlist = async (email: string, data: any) => {
    try {
      const response = await axiosInstance.put(
        `/tourist/addProductToWishlist/${email}`,
        data
      );
      return response.data; // Return only the product id in object format
    } catch (error) {
      throw error;
    }
  };

  public static removeProductFromWishlist = async (email: string, data: any) => {
    try {
      const response = await axiosInstance.delete(
        `/tourist/removeProductFromWishlist/${email}`,
        { data: { product_id: data.product_id } }
      );
      return response; // Return only the product id in object format
    } catch (error) {
      throw error;
    }
  };

  public static viewWishlist = async (email: string) => {
    try {
      const response = await axiosInstance.get(
        `/tourist/viewWishlist/${email}`
      );
      return response.data; // interface of IProduct
    } catch (error) {
      throw error;
    }
  };

  public static addPreferences = async (email: string, preference_id: string) => {
    try {
      const response = await axiosInstance.post(
        `/tourist/addPreference/${email}?preference_id=${preference_id}`
      );
      return response.data; // interface of IProduct
    } catch (error) {
      throw error
    }
  };

  public static removePreferences = async (email: string, preference_id: string) => {
    try {
      const response = await axiosInstance.delete(
        `/tourist/removePreference/${email}?preference_id=${preference_id}`
      );
      return response.data; // interface of IProduct
    } catch (error) {
      throw error
    }
  };

  public static createPaymentIntent = async (currency: string, amount: number) => {
    try {
      const response = await axiosInstance.post("/tourist/createPaymentIntent", {
        currency,
        amount,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }


}
export { TouristService };
