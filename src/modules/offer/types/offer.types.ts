import { IResponseData } from 'src/commons/types/request.types';
import { Offer1Entity } from '../entities/offer1.entity';
import { Offer2Entity } from '../entities/offer2.entity';

export interface IOffer {
  id: number;
  name: string;
  slug: string;
  description: string;
  requirements: string;
  thumbnail: string;
  isDesktop: number;
  isAndroid: number;
  isIos: number;
  offerUrlTemplate: string;
  providerName: string;
  externalOfferId: string;
}

export enum OfferDevice {
  Desktop = 'desktop',
  Mobile = 'mobile',
}

export enum Providers {
  Offer1 = 'offer1',
  Offer2 = 'offer2',
}

export type AllOfferEntities = Offer1Entity[] | Offer2Entity[];
export type AllOfferEntity = Offer1Entity | Offer2Entity;

export interface IOffersResponse extends IResponseData<AllOfferEntity> {}
