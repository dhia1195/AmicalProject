import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Events, EventsDocument, TypeF } from './events.schema';

@Injectable()
export class EventsService {
    constructor(@InjectModel(Events.name) private EventsModel: Model<EventsDocument>){}


    async ajouterEvent(
      titre: string,
      description: string,
      dateD: Date,
      dateF: Date,
      type: TypeF,  // Ensure this matches the TypeF enum
      status: boolean,
      btn_href: string,
      btn_name: string,
      image?: string,  // Optional field
    ): Promise<Events> {
      const createdEvent = new this.EventsModel({
        titre,
        description,
        dateD,
        dateF,
        type,
        status,
        btn_href,
        btn_name,
        image,
      });
      return createdEvent.save();
    }
    
    async getAllEvents(): Promise<Events[]> {
      const allEvents = await this.EventsModel.find({ deleted: { $eq: null } }).exec();
      return allEvents;
    }
    


      async updateEvent(id: string, updateData: Partial<Events>): Promise<Events> {
        updateData.updated = new Date();
        const updateEvent = await this.EventsModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
        if (!updateEvent) {
          throw new Error('Event not found');
        }
        return updateEvent;
      }


      async deleteEvent(id: string): Promise<void> {
        await this.EventsModel.findByIdAndUpdate(id, { deleted: new Date() }).exec();
      }
async getEventById(id: string): Promise<Events> {
        return this.EventsModel.findById(id).exec();
      }
      async getDeletedEvents(): Promise<Events[]> {
        return this.EventsModel.find({ deleted: { $ne: null } }).exec();
      }
    
      // Nouvelle méthode pour restaurer un événement supprimé
      async restoreEvent(id: string): Promise<Events> {
        const restoredEvent = await this.EventsModel.findByIdAndUpdate(id, { deleted: null }, { new: true }).exec();
        if (!restoredEvent) {
          throw new Error('Event not found');
        }
        return restoredEvent;
      }
}


