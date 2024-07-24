import { Module } from '@nestjs/common';
import { SlidesController } from './slides.controller';
import { SlidesService } from './slides.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Sildes, SildesSchema } from './slides.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Sildes.name, schema: SildesSchema}])
  ],
  controllers: [SlidesController],
  providers: [SlidesService]
})
export class SlidesModule {}
