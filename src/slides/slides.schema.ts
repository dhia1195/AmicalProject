/* eslint-disable prettier/prettier */
import {  Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SlidesDocument = Slides & Document;



@Schema()
export class Slides{
  

  @Prop({ required: true})
  titre: string;

  @Prop({ required: true})
  description: string;

  @Prop({ required: true})
  image: string;







  
}



export const SlidesSchema = SchemaFactory.createForClass(Slides);