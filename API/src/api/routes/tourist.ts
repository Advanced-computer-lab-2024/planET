import { Router } from "express";
import Container from "typedi";
import { TouristController } from "../controllers/touristController";
import authorize from "../middlewares/authorize";
import UserRoles from "@/types/enums/userRoles";
const route = Router();

export default (app: Router) => {
  const touristController: TouristController = Container.get(TouristController);

  app.use("/tourist", route);
  route.post("/StripeWebhook", touristController.stripeWebhookController);
  route.post("/createPaymentIntent", touristController.createPaymentIntent);
  route.get(
    "/getTourist/:email",
    authorize([UserRoles.Tourist]),
    touristController.getTourist
  );
  route.put(
    "/updateTourist/:searchEmail",
    authorize([UserRoles.Tourist]),
    touristController.updateTourist
  );
  route.get(
    "/getTourist/:email",
    authorize([UserRoles.Tourist]),
    touristController.getTourist
  );
  route.put(
    "/updateTourist/:searchEmail",
    authorize([UserRoles.Tourist]),
    touristController.updateTourist
  );
  route.post("/createTourist", touristController.createTourist);
  route.post(
    "/rateAndCommentTourGuide/:tourist_id",
    authorize([UserRoles.Tourist]),
    touristController.rateAndCommentTour_guide
  );
  route.post(
    "/rateAndCommentItinerary/:tourist_id",
    authorize([UserRoles.Tourist]),
    touristController.rateAndCommentItinerary
  );
  route.post(
    "/rateAndCommentActivity/:tourist_id",
    authorize([UserRoles.Tourist]),
    touristController.rateAndCommentActivity
  );
  route.post(
    "/rateAndCommentTourGuide/:tourist_id",
    authorize([UserRoles.Tourist]),
    touristController.rateAndCommentTour_guide
  );
  route.post(
    "/rateAndCommentItinerary/:tourist_id",
    authorize([UserRoles.Tourist]),
    touristController.rateAndCommentItinerary
  );
  route.post(
    "/rateAndCommentActivity/:tourist_id",
    authorize([UserRoles.Tourist]),
    touristController.rateAndCommentActivity
  );

  route.delete(
    "/deleteTouristAccountRequest/:email",
    touristController.deleteTouristAccountRequest
  );
  route.delete(
    "/deleteTouristAccountRequest/:email",
    touristController.deleteTouristAccountRequest
  );

  route.post("/bookActivity", touristController.bookActivity);

  route.post("/bookItinerary", touristController.bookItinerary);

  route.post(
    "/bookHistoricalLocation",
    touristController.bookHistoricalLocation
  );
  route.post(
    "/bookHistoricalLocation",
    touristController.bookHistoricalLocation
  );

  route.put(
    "/recievePoints",
    authorize([UserRoles.Tourist]),
    touristController.recievePoints
  );
  route.put(
    "/recievePoints",
    authorize([UserRoles.Tourist]),
    touristController.recievePoints
  );

  route.put(
    "/recieveBadge",
    authorize([UserRoles.Tourist]),
    touristController.recieveBadge
  );
  route.put(
    "/recieveBadge",
    authorize([UserRoles.Tourist]),
    touristController.recieveBadge
  );

  route.get(
    "/checkTourGuide/:tourist_id",
    authorize([UserRoles.Tourist]),
    touristController.checkTourGuide
  );
  route.get(
    "/checkItinerary/:tourist_id",
    authorize([UserRoles.Tourist]),
    touristController.checkItinerary
  );
  route.get(
    "/checkActivity/:tourist_id",
    authorize([UserRoles.Tourist]),
    touristController.checkActivity
  );
  route.post(
    "/fileComplaint/:tourist_id",
    authorize([UserRoles.Tourist]),
    touristController.fileComplaint
  );
  route.get(
    "/viewComplaints/:tourist_id",
    authorize([UserRoles.Tourist]),
    touristController.viewComplaints
  );
  route.get(
    "/flagToRateAndCommentProduct/:tourist_id",
    authorize([UserRoles.Tourist]),
    touristController.flagToRateAndCommentProduct
  );
  route.post(
    "/rateAndCommentProduct/:tourist_id",
    authorize([UserRoles.Tourist]),
    touristController.rateAndCommentProduct
  );
  route.put(
    "/cancelTicket/:tourist_id",
    authorize([UserRoles.Tourist]),
    touristController.cancelTicket
  );
  route.get(
    "/checkTourGuide/:tourist_id",
    authorize([UserRoles.Tourist]),
    touristController.checkTourGuide
  );
  route.get(
    "/checkItinerary/:tourist_id",
    authorize([UserRoles.Tourist]),
    touristController.checkItinerary
  );
  route.get(
    "/checkActivity/:tourist_id",
    authorize([UserRoles.Tourist]),
    touristController.checkActivity
  );
  route.post(
    "/fileComplaint/:tourist_id",
    authorize([UserRoles.Tourist]),
    touristController.fileComplaint
  );
  route.get(
    "/viewComplaints/:tourist_id",
    authorize([UserRoles.Tourist]),
    touristController.viewComplaints
  );
  route.get(
    "/flagToRateAndCommentProduct/:tourist_id",
    authorize([UserRoles.Tourist]),
    touristController.flagToRateAndCommentProduct
  );
  route.post(
    "/rateAndCommentProduct/:tourist_id",
    authorize([UserRoles.Tourist]),
    touristController.rateAndCommentProduct
  );
  route.put(
    "/cancelTicket/:tourist_id",
    authorize([UserRoles.Tourist]),
    touristController.cancelTicket
  );
  route.put("/redeemPoints", touristController.redeemPoints);
  ///////////

  route.get(
    "/getPastActivityBookings/:email",
    touristController.getPastActivityBookings
  );
  route.get(
    "/getPastActivityBookings/:email",
    touristController.getPastActivityBookings
  );

  route.get(
    "/getUpcomingActivityBookings/:email",
    touristController.getUpcomingActivityBookings
  );
  route.get(
    "/getUpcomingActivityBookings/:email",
    touristController.getUpcomingActivityBookings
  );

  route.get(
    "/getPastItineraryBookings/:email",
    touristController.getPastItineraryBookings
  );
  route.get(
    "/getPastItineraryBookings/:email",
    touristController.getPastItineraryBookings
  );

  route.get(
    "/getUpcomingItineraryBookings/:email",
    touristController.getUpcomingItineraryBookings
  );
  route.get(
    "/getUpcomingItineraryBookings/:email",
    touristController.getUpcomingItineraryBookings
  );

  route.get(
    "/getPastHistoricalLocationBookings/:email",
    touristController.getPastHistoricalLocationBookings
  );
  route.get(
    "/getPastHistoricalLocationBookings/:email",
    touristController.getPastHistoricalLocationBookings
  );

  route.get(
    "/getUpcomingHistoricalLocationBookings/:email",
    touristController.getUpcomingHistoricalLocationBookings
  );
  route.get(
    "/getMyTourGuides/:tourist_id",
    authorize([UserRoles.Tourist]),
    touristController.showMyTourGuides
  );
  route.get(
    "/getUpcomingHistoricalLocationBookings/:email",
    touristController.getUpcomingHistoricalLocationBookings
  );
  route.get(
    "/getMyTourGuides/:tourist_id",
    authorize([UserRoles.Tourist]),
    touristController.showMyTourGuides
  );

  route.post("/createOrder", touristController.createOrder);
  route.get("/getPastOrders/:email", touristController.getPastOrders);

  route.put(
    "/addProductToWishlist/:email",
    touristController.addProductToWishlist
  );
  route.delete(
    "/removeProductFromWishlist/:email",
    touristController.removeProductFromWishlist
  );
  route.get("/viewWishlist/:email", touristController.viewWishlist);

  route.put("/addAddress/:email", touristController.addAddress);
  route.delete("/removeAddress/:email", touristController.removeAddress);
  route.get("/getAddresses/:email", touristController.getAddresses);

  route.get("/isValidPromo/:code", touristController.isValidCode);

  route.get("/getCurrentOrders/:email", touristController.getCurrentOrders);

  route.post("/bookmarkActivity", touristController.bookmarkActivity);

  route.delete("/unbookmarkActivity", touristController.unbookmarkActivity);

  route.get(
    "/getBookmarkedActivities/:email",
    touristController.getBookmarkedActivities
  );
  route.get(
    "/getOrderDetails/:order_id",
    authorize([UserRoles.Tourist]),
    touristController.getOrderDetails
  );
  route.put(
    "/cancelOrder/:order_id",
    authorize([UserRoles.Tourist]),
    touristController.cancelOrder
  );
  route.post(
    "/addPreference/:email",
    authorize([UserRoles.Tourist]),
    touristController.Addpreference
  );
  route.delete(
    "/removePreference/:email",
    authorize([UserRoles.Tourist]),
    touristController.RemovePreference
  );
};
