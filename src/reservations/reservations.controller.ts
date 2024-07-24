import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Reservations } from './reservations.schema';
import { ReservationsService } from './reservations.service';

@Controller('reservations')
export class ReservationsController {constructor(private readonly reservationsService: ReservationsService) {}

@Post('ajouter')
async ajouterSprint(
    @Body('matricule') matricule: string,
    @Body('date') date: Date,
    @Body('nom') nom: string,
    @Body('prenom') prenom: string,
    @Body('post') post: string,
    @Body('numtel') numtel: number,



   
) {
    const nouveauReservation = await this.reservationsService.ajouterReservation(matricule,date,nom,prenom,post,numtel);
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

}
