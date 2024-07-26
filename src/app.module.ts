import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';
import { EventsModule } from './events/events.module';
import { SlidesModule } from './slides/slides.module';
import { ReservationsModule } from './reservations/reservations.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { UserModule } from './user/user.module';
import { ConventionModule } from './convention/conventions.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/amical')
    , EventsModule, SlidesModule, ReservationsModule,UserModule,
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'aziz1.jellazi@gmail.com',
          pass: 'rrmg bcvp nfbi xiln',
        },
      },
      defaults: {
        from: '"No Reply" <noreply@example.com>',
      },
    }),
    ConventionModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
