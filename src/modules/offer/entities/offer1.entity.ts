import { Exclude, Expose } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';
import { OfferDevice } from '../types/offer.types';

const iosDeviceKey = 'iphone_ipad';

export class Offer1Entity {
  @Exclude()
  device: string;

  @Exclude()
  disclaimer: string;

  @Exclude()
  offer_url_easy: string;

  @Exclude()
  payout: number;

  @Exclude()
  payout_type: string;

  @Exclude()
  amount: number;

  @Exclude()
  countries: string[];

  @Exclude()
  image_url_220x124: string;

  @Exclude()
  platform: string;

  @Exclude()
  category: Record<string, string>;

  @Exclude()
  last_modified: number;

  @Exclude()
  preview_url: string;

  @Exclude()
  package_id: string;

  @Exclude()
  verticals: { vertical_id: string; vertical_name: string }[];

  constructor(partial: Partial<Offer1Entity>) {
    Object.assign(this, partial);
  }

  @Expose()
  providerName: string;

  @Expose({ name: 'name' })
  offer_name: string;

  @Expose({ name: 'externalOfferId' })
  offer_id: string;

  @Expose({ name: 'description' })
  offer_desc: string;

  @Expose({ name: 'requirements' })
  call_to_action: string;

  @Expose({ name: 'offerUrlTemplate' })
  offer_url: string;

  @Expose({ name: 'thumbnail' })
  image_url: string;

  @Expose()
  get isIos(): number {
    return this.device === iosDeviceKey ? 1 : 0;
  }

  @Expose()
  get isAndroid(): number {
    return this.device !== iosDeviceKey && this.platform !== OfferDevice.Desktop
      ? 1
      : 0;
  }

  @Expose()
  get isDesktop(): number {
    return this.platform === OfferDevice.Desktop ? 1 : 0;
  }

  @Expose()
  get slug(): string {
    return uuidv4();
  }
}
