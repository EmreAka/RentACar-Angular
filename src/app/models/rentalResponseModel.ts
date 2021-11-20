import { Rental } from './rental';
import { ResponseModel } from "./responsemodel";
export interface RentalResponseModel extends ResponseModel{
    data:Rental[];
}