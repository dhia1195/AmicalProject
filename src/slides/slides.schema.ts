import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SlidesDocument = Slides & Document;

@Schema()
export class Slides {
  @Prop({ required: true })
  titre: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  status: boolean;

  @Prop({ required: true })
  btn_href: string;

  @Prop({ required: true })
  btn_name: string;

  @Prop({ default: Date.now })
  created: Date;

  @Prop({ default: null })
  updated: Date;

  @Prop({ default: null })
  deleted: Date;
}

export const SlidesSchema = SchemaFactory.createForClass(Slides);
SlidesSchema.virtual('statusDisplay').get(function(this: SlidesDocument) {
  return this.status ? 'active' : 'inactive';
});