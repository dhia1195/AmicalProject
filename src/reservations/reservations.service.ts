import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reservations, ReservationsDocument } from './reservations.schema';

@Injectable()
export class ReservationsService {constructor(@InjectModel(Reservations.name) private ReservationsModel: Model<ReservationsDocument>){}


async ajouterReservation(matricule: string, date: Date,nom:string,prenom:string,post:string,numtel:number): Promise<Reservations> {
        const createdReservations = new this.ReservationsModel({
            matricule,
            date,
            nom,
            prenom,
            post,
            numtel,
        });
    
        return createdReservations.save();
    }
async getAllReservations(): Promise<Reservations[]> {
        const allReservations = await this.ReservationsModel.find().exec();
        return allReservations;
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
}


