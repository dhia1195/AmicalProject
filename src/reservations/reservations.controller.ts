import { BadRequestException, Body, Controller, Delete, Get, NotFoundException, Param, Res as ResponseDecorator, Patch, Post } from '@nestjs/common';
import { Reservations } from './reservations.schema';
import { ReservationsService } from './reservations.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Events, EventsDocument } from 'src/events/events.schema';
import { Response } from 'express';

@Controller('reservations')
export class ReservationsController {
  constructor(
    private readonly reservationsService: ReservationsService,
    @InjectModel(Events.name) private eventsModel: Model<EventsDocument>,
  ) {}

  @Get('getall')
  async getAllFounisserus() {
    const allReservations = await this.reservationsService.getAllReservations();
    return { reservations: allReservations };
  }   

  @Get('getnonverified')
  async getNonVerifiedReservations() {
    const nonVerifiedReservations = await this.reservationsService.getAllNonVerifiedReservations();
    return { reservations: nonVerifiedReservations };
  } 

  @Patch('update/:id')
  async updateReservation(@Param('id') id: string, @Body() updateData: Partial<Reservations>) {
    const updatedReservation = await this.reservationsService.updateReservation(id, updateData);
    return { Reservations: updatedReservation };
  }

  @Delete(':id')
  async deleteReservation(@Param('id') id: string) {
    await this.reservationsService.deleteReservation(id);
    return { message: 'reservation deleted successfully' };
  }

  @Get('getbyid/:id')
  async getReservationById(@Param('id') id: string) {
    return this.reservationsService.getReservationById(id);
  }

  @Post('reserve-event')
  async reserveEvent(@Body() reservationData: Partial<Reservations>) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@etap\.com\.tn$/;

    if (reservationData.email && !emailRegex.test(reservationData.email)) {
      throw new BadRequestException('Invalid email format. Only @etap.com.tn addresses are allowed.');
    }

    console.log('Reservation Data:', reservationData);
    const reservation = await this.reservationsService.reserveEvent(reservationData);
    return { reservation };
  }

  @Get('verify/:token')
  async verifyReservation(@Param('token') token: string, @ResponseDecorator() res: Response) {
    try {
      await this.reservationsService.verifyReservation(token);
      res.redirect('http://localhost:4200/front/slidesf?status=verified');
    } catch (error) {
      res.redirect('http://localhost:4200/front/slidesf?status=error');
    }
  }

  @Get('count-reservations/:eventId')
  async countReservationsForEvent(@Param('eventId') eventId: string) {
    const count = await this.reservationsService.countReservationsForEvent(eventId);
    return { count };
  }

  @Get('by-event/:eventId')
  async getReservationsByEventId(@Param('eventId') eventId: string): Promise<Reservations[]> {
    return this.reservationsService.getReservationsByEventId(eventId);
  }
}
