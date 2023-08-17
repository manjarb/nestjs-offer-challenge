import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { OfferService } from '../../services/offer/offer.service';
import { IOffersResponse } from '../../types/offer.types';

@Controller('v1/offer')
export class OfferController {
  constructor(private offerService: OfferService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':provider')
  getOfferByProvider(@Param('provider') provider: string): IOffersResponse {
    return {
      data: this.offerService.getOfferByProviderName(provider),
    };
  }

  @Post('all')
  fetchAllProviders() {
    return this.offerService.fetchAllProviders();
  }
}
