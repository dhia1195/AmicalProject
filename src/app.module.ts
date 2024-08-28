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
    MongooseModule.forRoot('mongodb+srv://meddhiadinboudali:35g6Ujan3v9gmKH8@cluster0.koajc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),
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

//MongooseModule.forRoot('mongodb+srv://jojo22042000:AYtW8PsbxZJfJpxH@cluster0.y4ssp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'),
