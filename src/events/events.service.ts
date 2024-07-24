import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Events, EventsDocument } from './events.schema';

@Injectable()
export class EventsService {
    constructor(@InjectModel(Events.name) private EventsModel: Model<EventsDocument>){}


async ajouterEvent(titre: string, description: string, date: Date,type:string): Promise<Events> {
        const createdEvents = new this.EventsModel({
            titre,
            description,
            date,
            type,
        });
    
        return createdEvents.save();
    }
async getAllEvents(): Promise<Events[]> {
        const allEvents = await this.EventsModel.find().exec();
        return allEvents;
      }

async updateEvent(id: string, updateData: Partial<Events>): Promise<Events> {
        const updatedEvent = await this.EventsModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
        if (!updatedEvent) {
          // Handle the case where the sprint with the given ID was not found
          throw new Error('Event not found');
        }
        return updatedEvent;
      }

async deleteEvent(id: string): Promise<void> {
        await this.EventsModel.findByIdAndDelete(id).exec();
      }

async getEventById(id: string): Promise<Events> {
        return this.EventsModel.findById(id).exec();
      }
}


