import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EventsDocument = Events & Document;

export enum TypeF {
  hotel = 'hotel',
  croisiere = 'croisiere',
}

@Schema()
export class Events {
  @Prop({ required: true })
  titre: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  dateD: Date;

  @Prop({ required: true })
  dateF: Date;

  @Prop({ type: String, enum: ['active', 'inactive'], default: 'active' })
  status: 'active' | 'inactive';

  @Prop({ required: true })
  btn_href: string;

  @Prop({ required: true })
  btn_name: string;

  @Prop({ required: true })
  image: string;

  @Prop({ default: Date.now })
  created: Date;

  @Prop({ default: null })
  updated: Date;

  @Prop({ default: null })
  deleted: Date;

  @Prop({ type: String, enum: Object.values(TypeF) })
  type: TypeF;
}

export const EventsSchema = SchemaFactory.createForClass(Events);

// Adding the virtual field
EventsSchema.virtual('statusEvent').get(function (this: EventsDocument) {
  return this.status === 'active' ? 'Active' : 'Inactive';
});

// Ensure virtual fields are included when converting to JSON
EventsSchema.set('toJSON', { virtuals: true });
EventsSchema.set('toObject', { virtuals: true });
