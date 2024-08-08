import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { Conventions, TypeC } from './conventions.schema';
import { ConventionsService } from './conventions.service';

@Controller('conventions')
export class ConventionsController {constructor(private readonly conventionsService: ConventionsService) {}

@Post('ajouter')
async ajouterSprint(
    @Body('titre') titre: string,
    @Body('status') status: string,
    @Body('date') date: Date,
    @Body('pdf') pdf: string,
    @Body('type') type: TypeC,

   
) {
    const nouveauConvention = await this.conventionsService.ajouterConvention(titre, status,date,pdf,type);
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
    return { message: 'convention deleted successfully' };
  }

@Get('getbyid/:id')
  async getConventionById(@Param('id') id: string) {
    return this.conventionsService.getConventionById(id);
  }
  @Get('getdeleted')
  async getDeletedConventions(): Promise<Conventions[]> {
    return this.conventionsService.getDeletedConventions();
  }
  @Put('restore/:id')
  async restoreConvention(@Param('id') id: string): Promise<Conventions> {
    return this.conventionsService.restoreConvention(id);
  }
}
