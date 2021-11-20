import { Brand } from './brand';
import { ResponseModel } from './responsemodel';
export interface BrandRespondModel extends ResponseModel{
    data:Brand[]
}