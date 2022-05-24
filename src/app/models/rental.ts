export interface Rental {
  id: number;
  brandName: string;
  colourName: string;
  carOwner: string;
  customerName: string;
  fuelType: string;
  engineType: string;
  doorNumber: number;
  fuelConsumption: number;
  modelYear: number;
  dailyPrice: number;
  description: string;
  images: string[];
  rentDate: string;
  returnDate: string;
}
