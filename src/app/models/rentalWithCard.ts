import {CardToPay} from "./cardToPay";
import {RentalToAdd} from "./rentalToAdd";

export interface RentalWithCard{
  rental: RentalToAdd;
  card: CardToPay;
}
