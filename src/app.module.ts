import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EventsModule } from './events/events.module';
import { SlidesModule } from './slides/slides.module';
import { ReservationsModule } from './reservations/reservations.module';
import { ConventionModule } from './convention/conventions.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/amical'),
    EventsModule,
    SlidesModule,
    ReservationsModule,
    ConventionModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
