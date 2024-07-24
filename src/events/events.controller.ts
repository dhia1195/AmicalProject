import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Events } from './events.schema';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {constructor(private readonly eventsService: EventsService) {}

@Post('ajouter')
async ajouterSprint(
    @Body('titre') titre: string,
    @Body('description') description: string,
    @Body('date') date: Date,
    @Body('type') type: string,
   
) {
    const nouveauEvent = await this.eventsService.ajouterEvent(titre, description,date, type);
    return { event: nouveauEvent };}

@Get('getall')
async getAllFounisserus(){
    const allEvents = await this.eventsService.getAllEvents();
    return {events : allEvents};
}    
@Patch('update/:id')
async updateEvent(@Param('id') id:string, @Body() updateData: Partial<Events>){

    const updatedEvent = await this.eventsService.updateEvent(id,updateData);
    return{Events : updatedEvent};
}

@Delete(':id')
  async deleteEvent(@Param('id') id: string) {
    await this.eventsService.deleteEvent(id);
    return { message: 'event deleted successfully' };
  }

@Get('getbyid/:id')
  async getEventById(@Param('id') id: string) {
    return this.eventsService.getEventById(id);
  }

}
