import { Module } from '@nestjs/common';
import { ConventionsController } from './conventions.controller';
import { ConventionsService } from './conventions.service';
import { Conventions, ConventionsSchema } from './conventions.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Conventions.name, schema: ConventionsSchema}])
  ],
  controllers: [ConventionsController],
  providers: [ConventionsService]
})
export class ConventionModule {}
