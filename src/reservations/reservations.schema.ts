/* eslint-disable prettier/prettier */
import {  Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Events } from 'src/events/events.schema';
import { User } from 'src/user/entities/user.entity';

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
 
  @Prop({ type: Types.ObjectId, ref: 'Events' })
  event: Events;

  @Prop({ type: Types.ObjectId, ref: 'User' })
  user: User;



  
}



export const ReservationsSchema = SchemaFactory.createForClass(Reservations);