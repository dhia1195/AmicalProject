/* eslint-disable prettier/prettier */
import {  Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SildesDocument = Sildes & Document;



@Schema()
export class Sildes{
  

  @Prop({ required: true})
  titre: string;

  @Prop({ required: true})
  description: string;

  @Prop({ required: true})
  image: string;







  
}



export const SildesSchema = SchemaFactory.createForClass(Sildes);