/* eslint-disable prettier/prettier */
import {  Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Events } from 'src/events/events.schema';
import { User } from 'src/user/user.schema';

export type ReservationsDocument = Reservations & Document;



@Schema()
export class Reservations{
  

  @Prop({ required: true})
  matricule: string;
  @Prop({ required: true})
  dateD: Date;
  @Prop({ required: true})
  dateF: Date;
  @Prop({ required: true})
  nom: string;
  @Prop({ required: true})
  prenom: string;
  @Prop({ required: true})
  post: string;
  @Prop({ required: true})
  numtel: number;
  @Prop({ required: true})
  email: string;
  @Prop({ type: Types.ObjectId, ref: 'Events' })
  event: Events;

  @Prop({ default: false })
  verified: boolean;

  @Prop({ enum: ['pending', 'confirmed'], default: 'pending' })
  status: string;

  @Prop()
  verificationToken: string;

  
}



export const ReservationsSchema = SchemaFactory.createForClass(Reservations);