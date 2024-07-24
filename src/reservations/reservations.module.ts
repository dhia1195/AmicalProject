import { Module } from '@nestjs/common';
import { ReservationsController } from './reservations.controller';
import { ReservationsService } from './reservations.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Reservations, ReservationsSchema } from './reservations.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Reservations.name, schema: ReservationsSchema}])
  ],
  controllers: [ReservationsController],
  providers: [ReservationsService]
})
export class ReservationsModule {}
