import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Conventions } from './conventions.schema';
import { ConventionsService } from './conventions.service';

@Controller('conventions')
export class ConventionsController {constructor(private readonly conventionsService: ConventionsService) {}

@Post('ajouter')
async ajouterSprint(
    @Body('titre') titre: string,
    @Body('status') status: string,
    @Body('date') date: Date,
    @Body('pdf') pdf: string,
   
) {
    const nouveauConvention = await this.conventionsService.ajouterConvention(titre, status,date,pdf);
    return { slider: nouveauConvention };}

@Get('getall')
async getAllConventions(){
    const allConventions = await this.conventionsService.getAllConventions();
    return {conventions : allConventions};
}    
@Patch('update/:id')
async updateConvention(@Param('id') id:string, @Body() updateData: Partial<Conventions>){

    const updatedConvention = await this.conventionsService.updateConvention(id,updateData);
    return{Conventions : updatedConvention};
}

@Delete(':id')
  async deleteConvention(@Param('id') id: string) {
    await this.conventionsService.deleteConvention(id);
    return { message: 'slider deleted successfully' };
  }

@Get('getbyid/:id')
  async getConventionById(@Param('id') id: string) {
    return this.conventionsService.getConventionById(id);
  }

}
