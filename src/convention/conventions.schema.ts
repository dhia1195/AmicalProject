/* eslint-disable prettier/prettier */
import {  Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ConventionsDocument = Conventions & Document;

export enum TypeC {
  partenaires  = 'partenaires',
  interieur  = 'interieur',
  charte = 'charte' ,
}

@Schema()
export class Conventions{
  

  @Prop({ required: true})
  titre: string;

  @Prop({ type: String, enum: ['active', 'inactive'], default: 'active' })
  status: 'active' | 'inactive';

  @Prop({ required: true})
  date: Date;

  @Prop({ required: true})
  pdf: string;

  @Prop({ type: String, enum: Object.values(TypeC) })
  type: TypeC;

  @Prop({ default: Date.now })
  created: Date;

  @Prop({ default: null })
  updated: Date;

  @Prop({ default: null })
  deleted: Date;


  
}



export const ConventionsSchema = SchemaFactory.createForClass(Conventions);
ConventionsSchema.virtual('statusConvention').get(function (this: ConventionsDocument) {
  return this.status === 'active' ? 'Active' : 'Inactive';
});

// Ensure virtual fields are included when converting to JSON
ConventionsSchema.set('toJSON', { virtuals: true });
ConventionsSchema.set('toObject', { virtuals: true });