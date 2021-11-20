import { Car } from './car';
import { ResponseModel } from "./responsemodel";
export interface CarResponseModel extends ResponseModel{
    data:Car[];
}