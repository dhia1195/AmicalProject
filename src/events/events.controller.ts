import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Events, TypeF } from './events.schema';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {constructor(private readonly eventsService: EventsService) {}

@Post('ajouter')
async ajouterEvent(
  @Body('titre') titre: string,
  @Body('description') description: string,
  @Body('dateD') dateD: Date,
  @Body('dateF') dateF: Date,
  @Body('type') type: TypeF,  // Ensure this matches the TypeF enum
  @Body('status') status: boolean,
  @Body('btn_href') btn_href: string,
  @Body('btn_name') btn_name: string,
  @Body('image') image?: string,  // Optional field
) {
  const nouveauEvent = await this.eventsService.ajouterEvent(
    titre,
    description,
    dateD,
    dateF,
    type,
    status,
    btn_href,
    btn_name,
    image
  );
  return { event: nouveauEvent };
}


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
