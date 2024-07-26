/* eslint-disable prettier/prettier */
import {  Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ConventionsDocument = Conventions & Document;



@Schema()
export class Conventions{
  

  @Prop({ required: true})
  titre: string;

  @Prop({ required: true})
  status: string;
  @Prop({ required: true})
  date: Date;

  @Prop({ required: true})
  pdf: string;







  
}



export const ConventionsSchema = SchemaFactory.createForClass(Conventions);