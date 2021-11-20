import { Customer } from './customer';
import { ResponseModel } from "./responsemodel";
export interface CustomerResponseModel extends ResponseModel{
    data:Customer[];
}