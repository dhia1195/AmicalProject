import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Reservations, ReservationsDocument } from './reservations.schema';
import { Events, EventsDocument } from 'src/events/events.schema';

@Injectable()
export class ReservationsService {constructor(@InjectModel(Reservations.name) private ReservationsModel: Model<ReservationsDocument>,
  @InjectModel(Events.name) private eventsModel: Model<EventsDocument>,
){}


async ajouterReservation(matricule: string, dateD: Date,dateF: Date,nom:string,prenom:string,post:string,numtel:number,email:string): Promise<Reservations> {
        const createdReservations = new this.ReservationsModel({
            matricule,
            dateD,
            dateF,
            nom,
            prenom,
            post,
            numtel,
            email,
        });
    
        return createdReservations.save();
    }
    async getAllReservations(): Promise<Reservations[]> {
      // Populate the event field with event details
      return this.ReservationsModel.find().populate('event').exec();
    }
async updateReservation(id: string, updateData: Partial<Reservations>): Promise<Reservations> {
        const updatedReservation = await this.ReservationsModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
        if (!updatedReservation) {
          // Handle the case where the sprint with the given ID was not found
          throw new Error('Reservation not found');
        }
        return updatedReservation;
      }

async deleteReservation(id: string): Promise<void> {
        await this.ReservationsModel.findByIdAndDelete(id).exec();
      }

async getReservationById(id: string): Promise<Reservations> {
        return this.ReservationsModel.findById(id).exec();
      }
      async reserveEvent(reservationData: Partial<Reservations>): Promise<Reservations> {
        const event = await this.eventsModel.findById(reservationData.event);
        if (!event) {
          throw new NotFoundException('Event not found');
        }
      
        const reservation = new this.ReservationsModel({
          ...reservationData,
          event: event._id,
        });
        return reservation.save();
      }
      
      async countReservationsForEvent(eventId: string): Promise<number> {
        const eventObjectId = new Types.ObjectId(eventId); // Ensure it's an ObjectId
        return this.ReservationsModel.countDocuments({ event: eventObjectId }).exec();
}
async getReservationsByEventId(eventId: string): Promise<Reservations[]> {
  const objectId = new Types.ObjectId(eventId);
  console.log('Converted ObjectId:', objectId);
  const reservations = await this.ReservationsModel.find({ event: objectId }).exec();
  console.log('Reservations found:', reservations);
  if (!reservations || reservations.length === 0) {
    throw new NotFoundException('No reservations found for this event');
  }
  return reservations;
}



}