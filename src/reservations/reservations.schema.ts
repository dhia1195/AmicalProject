/* eslint-disable prettier/prettier */
import {  Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ReservationsDocument = Reservations & Document;



@Schema()
export class Reservations{
  

  @Prop({ required: true})
  matricule: string;

  

  @Prop({ required: true})
  date: Date;

  @Prop({ required: true})
  nom: string;
  @Prop({ required: true})
  prenom: string;
  @Prop({ required: true})
  post: string;
  @Prop({ required: true})
  numtel: number;
 




  
}



export const ReservationsSchema = SchemaFactory.createForClass(Reservations);//taati l acces ll les class lokhrin