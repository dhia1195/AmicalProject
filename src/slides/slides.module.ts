import { Module } from '@nestjs/common';
import { SlidesController } from './slides.controller';
import { SlidesService } from './slides.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Slides, SlidesSchema } from './slides.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Slides.name, schema: SlidesSchema}])
  ],
  controllers: [SlidesController],
  providers: [SlidesService]
})
export class SlidesModule {}
