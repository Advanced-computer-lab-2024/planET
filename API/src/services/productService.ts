import { IProduct } from "@/interfaces/IProduct";
import { InternalServerError } from "@/types/Errors";
import response from "@/types/responses/response";
import { Service, Inject } from "typedi";

@Service()
export class ProductService {
  constructor(
    @Inject("productModel") private productModel: Models.ProductModel
  ) {}

  public async createProductService(product: IProduct) {
    console.log(product);
    const newProduct = new this.productModel(product);
    console.log("newProduct", newProduct);
    const result = await newProduct.save();
    if (result instanceof Error)
      throw new InternalServerError("Internal Server Error");
    return new response(true, result, "Product is created", 201);
  } //Still erbot by user_id still not finished

  public async getFilteredProductsService(filters: {
    price?: {
      min?: number;
      max?: number;
    };
  }) {
    if (!filters) {
      const products = await this.productModel.find();
      return new response(false, products, "No filters provided", 200);
    }

    const matchStage: any = {};

    if (filters.price) {
      if (filters.price.min !== undefined) {
        matchStage.price = { ...matchStage.price, $gte: filters.price.min };
      }
      if (filters.price.max !== undefined) {
        matchStage.price = { ...matchStage.price, $lte: filters.price.max };
      }
    }
    const products = await this.productModel.aggregate([
      //Not nessesary to use aggregate here
      {
        $match: matchStage,
      },
    ]);
    console.log("result", products);
    console.log("match", matchStage);

    if (products instanceof Error)
      throw new InternalServerError("Internal Server Error");
    return new response(true, products, "Filtered products are fetched", 200);
  }
}
