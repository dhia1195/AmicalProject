import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Reservations } from './reservations.schema';
import { ReservationsService } from './reservations.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Events, EventsDocument } from 'src/events/events.schema';

@Controller('reservations')
export class ReservationsController {constructor(private readonly reservationsService: ReservationsService,@InjectModel(Events.name) private eventsModel: Model<EventsDocument>,
) {}

@Post('ajouter')
async ajouterSprint(
    @Body('matricule') matricule: string,
    @Body('date') date: Date,
    @Body('nom') nom: string,
    @Body('prenom') prenom: string,
    @Body('post') post: string,
    @Body('numtel') numtel: number,
    @Body('email') email: string,




   
) {
    const nouveauReservation = await this.reservationsService.ajouterReservation(matricule,date,nom,prenom,post,numtel,email);
    return { reservation: nouveauReservation };}

@Get('getall')
async getAllFounisserus(){
    const allReservations = await this.reservationsService.getAllReservations();
    return {reservations : allReservations};
}    
@Patch('update/:id')
async updateReservation(@Param('id') id:string, @Body() updateData: Partial<Reservations>){

    const updatedReservation = await this.reservationsService.updateReservation(id,updateData);
    return{Reservations : updatedReservation};
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
  console.log('Reservation Data:', reservationData); // Debugging line
  const reservation = await this.reservationsService.reserveEvent(reservationData);
  return { reservation };
}

  @Get('count-reservations/:eventId')
  async countReservationsForEvent(@Param('eventId') eventId: string) {
    const count = await this.reservationsService.countReservationsForEvent(eventId);
    return { count };
  }
}
