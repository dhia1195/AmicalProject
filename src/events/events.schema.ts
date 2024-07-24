/* eslint-disable prettier/prettier */
import {  Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EventsDocument = Events & Document;

export enum TypeF {
    hotel = 'hotel',
    croisiere = 'croisiere',
  }

@Schema()
export class Events{
  

  @Prop({ required: true})
  titre: string;

  @Prop({ required: true})
  description: string;

  @Prop({ required: true})
  date: Date;


 
  @Prop({ type: String, enum: Object.values(TypeF) })
  type: TypeF;




  
}



export const EventsSchema = SchemaFactory.createForClass(Events);//taati l acces ll les class lokhrin