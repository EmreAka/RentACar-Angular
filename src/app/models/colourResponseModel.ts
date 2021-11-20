import { Colour } from './colour';
import { ResponseModel } from "./responsemodel";
export interface ColourResponseModel extends ResponseModel{
    data:Colour[];
}