import AmadeusService from '@/services/amadeusService';
import { Service, Container } from 'typedi';

@Service()
export default class AmadeusController{
    
    public async getAirportsBykeyword(req: any, res: any){
        const { keyword } = req.query;
        const amadeusService: AmadeusService = Container.get(AmadeusService);
        const airports = await amadeusService.getAirportsBykeywordService(keyword);
        res.status(airports.status).json(airports);
    }

    public async getFlightOffers(req: any, res: any){
        const amadeusService: AmadeusService = Container.get(AmadeusService);
        const flightOffers = await amadeusService.getFlightOffersService(req.query);
        res.status(flightOffers.status).json(flightOffers);
    }

    public async getHotelOffers(req: any, res: any){
        const amadeusService: AmadeusService = Container.get(AmadeusService);
        const hotelOffers = await amadeusService.getHotelOffersService(req.query);
        res.status(hotelOffers.status).json(hotelOffers);
    }


}