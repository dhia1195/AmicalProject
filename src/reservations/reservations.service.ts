import * as nodemailer from 'nodemailer';
import * as crypto from 'crypto';
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Reservations, ReservationsDocument } from './reservations.schema';
import { Events, EventsDocument } from 'src/events/events.schema';

@Injectable()
export class ReservationsService {
  private transporter: nodemailer.Transporter;

  constructor(
    @InjectModel(Reservations.name) private ReservationsModel: Model<ReservationsDocument>,
    @InjectModel(Events.name) private eventsModel: Model<EventsDocument>,
  ) {
    this.transporter = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: '6428e8d348a2b0',
        pass: '1f0ac2330cab78',
      },
    });
  }

  async reserveEvent(reservationData: Partial<Reservations>): Promise<Reservations> {
    const event = await this.eventsModel.findById(reservationData.event);
    if (!event) {
      throw new NotFoundException('Event not found');
    }
  
    const verificationToken = crypto.randomBytes(20).toString('hex');
  
    const reservation = new this.ReservationsModel({
      ...reservationData,
      event: event._id,
      verificationToken,
      verified: false,
      status: 'pending',
    });
  
    const savedReservation = await reservation.save();
  
    // Use the URL to the image hosted on your server
    const imageUrl = 'http://localhost:3000/public/etap.png';
    const verifyUrl = `http://localhost:3000/reservations/verify/${verificationToken}`;
    const mailOptions = {
      from: 'no-reply@yourapp.com',
      to: reservationData.email,
      subject: 'Please Verify Your Reservation',
      html: `
        <html>
          <body>
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
              <img src="${imageUrl}" alt="Company Logo" style="width: 100%; height: auto; border-bottom: 1px solid #ddd; margin-bottom: 20px;">
              <h2 style="color: #333;">Please Verify Your Reservation</h2>
              <p style="color: #555;">Hello,</p>
              <p style="color: #555;">Thank you for making a reservation with us. To complete the process, please verify your reservation by clicking the button below:</p>
              <a href="${verifyUrl}" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 5px; margin: 20px 0;">Verify Reservation</a>
              <p style="color: #555;">If you did not make this reservation, please ignore this email.</p>
              <p style="color: #555;">Best regards,<br>Your Company Name</p>
            </div>
          </body>
        </html>
      `,
    };
  
    try {
      await this.transporter.sendMail(mailOptions);
    } catch (error) {
      throw new BadRequestException('Error sending verification email');
    }
  
    return savedReservation;
  }
  

  async verifyReservation(token: string): Promise<Reservations> {
    console.log('Verifying token:', token);

    const reservation = await this.ReservationsModel.findOneAndUpdate(
      { verificationToken: token, verified: false },
      { verified: true, verificationToken: null },
      { new: true }
    );

    if (!reservation) {
      console.log('Token not found or already verified');
      throw new NotFoundException('Invalid or expired verification token');
    }

    return reservation;
  }

  async getAllReservations(): Promise<Reservations[]> {
    return this.ReservationsModel.find({ verified: true }).populate('event').exec();
  }
  async getAllNonVerifiedReservations(): Promise<Reservations[]> {
    return this.ReservationsModel.find({ verified: false }).populate('event').exec();
  }
  async updateReservation(id: string, updateData: Partial<Reservations>): Promise<Reservations> {
    const updatedReservation = await this.ReservationsModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
    if (!updatedReservation) {
      throw new NotFoundException('Reservation not found');
    }
    return updatedReservation;
  }

  async deleteReservation(id: string): Promise<void> {
    const result = await this.ReservationsModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException('Reservation not found');
    }
  }

  async getReservationById(id: string): Promise<Reservations> {
    const reservation = await this.ReservationsModel.findById(id).exec();
    if (!reservation) {
      throw new NotFoundException('Reservation not found');
    }
    return reservation;
  }

  async countReservationsForEvent(eventId: string): Promise<number> {
    const eventObjectId = new Types.ObjectId(eventId);
    return this.ReservationsModel.countDocuments({ event: eventObjectId }).exec();
  }

  async getReservationsByEventId(eventId: string): Promise<Reservations[]> {
    const objectId = new Types.ObjectId(eventId);
    const reservations = await this.ReservationsModel.find({ event: objectId }).exec();
    if (!reservations || reservations.length === 0) {
      throw new NotFoundException('No reservations found for this event');
    }
    return reservations;
  }
}
