import { Exclude, Expose, Type } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';

export class Offer2Entity {
  @Exclude()
  OS: Record<string, boolean | null>;

  @Exclude()
  store_id: string | null;

  @Exclude()
  tracking_type: string;

  @Exclude()
  campaign_vertical: string;

  @Exclude()
  currency_name_singular: string;

  @Exclude()
  currency_name_plural: string;

  @Exclude()
  network_epc: string;

  @Exclude()
  disclaimer: string | null;

  @Exclude()
  short_description: string;

  @Exclude()
  offer_sticker_text_1: string | null;

  @Exclude()
  offer_sticker_text_2?: string | null;

  @Exclude()
  offer_sticker_text_3?: string | null;

  @Exclude()
  offer_sticker_color_1: string;

  @Exclude()
  offer_sticker_color_2: string;

  @Exclude()
  offer_sticker_color_3: string;

  @Exclude()
  sort_order_setting?: any | null;

  @Exclude()
  category_1: string;

  @Exclude()
  category_2?: string | null;

  @Exclude()
  amount: number;

  @Exclude()
  payout_usd: number;

  @Exclude()
  start_datetime: string;

  @Exclude()
  end_datetime: string;

  @Exclude()
  is_multi_reward: boolean;

  constructor(partial: Partial<Offer2Entity>) {
    Object.assign(this, partial);
  }

  @Expose()
  providerName: string;

  @Expose({ name: 'name' })
  name: string;

  @Type(() => String)
  @Expose({ name: 'externalOfferId' })
  campaign_id: string;

  @Expose({ name: 'thumbnail' })
  icon: string;

  @Expose({ name: 'offerUrlTemplate' })
  tracking_url: string;

  @Expose({ name: 'requirements' })
  instructions: string;

  @Expose()
  description: string;

  @Expose()
  get isDesktop(): number {
    return this.OS.web ? 1 : 0;
  }

  @Expose()
  get isIos(): number {
    return this.OS.ios ? 1 : 0;
  }

  @Expose()
  get isAndroid(): number {
    return this.OS.android ? 1 : 0;
  }

  @Expose()
  get slug(): string {
    return uuidv4();
  }
}
