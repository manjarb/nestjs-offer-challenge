import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Offer } from '../../entities/offer.entity';
import { offer1Payload } from '../../payloads/offer1.payload';
import { offer2Payload } from '../../payloads/offer2.payload';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Offer1Entity } from '../../entities/offer1.entity';
import {
  AllOfferEntities,
  IOffersResponse,
  Providers,
} from '../../types/offer.types';
import { Offer2Entity } from '../../entities/offer2.entity';

@Injectable()
export class OfferService {
  readonly allProvidersList = [Providers.Offer1, Providers.Offer2];
  readonly baseUrl = process.env.BASE_URL;

  constructor(
    @InjectRepository(Offer) private offerRepository: Repository<Offer>, // TODO: Enable this once we want to connect to actual db
    private readonly httpService: HttpService,
  ) {}

  getOffersByKey(name: string): AllOfferEntities {
    switch (name) {
      case Providers.Offer1:
        return offer1Payload.response.offers.map(
          (o) => new Offer1Entity({ ...o, providerName: name }),
        );
      case Providers.Offer2:
        const newData = Object.keys(offer2Payload.data).map((key) => {
          const temp = offer2Payload.data[key];
          return new Offer2Entity({
            ...temp.Offer,
            OS: temp.OS,
            providerName: name,
          });
        });

        return newData;
      default:
        return;
    }
  }

  getOfferByProviderName(name: string) {
    return this.getOffersByKey(name);
  }

  async fetchAllProviders() {
    for (const provider of this.allProvidersList) {
      const { data } = await firstValueFrom(
        this.httpService.get<IOffersResponse>(
          `${this.baseUrl}/v1/offer/${provider}`,
        ),
      );

      for (const offer of data.data) {
        try {
          const newOffer = this.offerRepository.create(offer);
          await this.offerRepository.save(newOffer);
        } catch (error) {
          console.error('Error: ', error, ' , offer: ', offer);
        }
      }
    }

    return { success: true };
  }
}
