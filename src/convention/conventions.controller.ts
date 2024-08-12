import {Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { Conventions, TypeC } from './conventions.schema';
import { ConventionsService } from './conventions.service';


@Controller('conventions')
export class ConventionsController {
  constructor(private readonly conventionsService: ConventionsService) {}

  @Post('ajouter')
  async ajouterConvention(
    @Body('titre') titre: string,
    @Body('status') status: boolean,
    @Body('image') image: string,
    @Body('date') date: Date, // Accept date as a Date type
    @Body('type') type: TypeC
  ) {
    // No need to convert date, as it's expected to be a Date object already
    const newConvention = await this.conventionsService.ajouterConvention(titre, status, date, type, image);
    return { conventions: newConvention };
  }


@Get('getall')
async getAllConventions(){
    const allConventions = await this.conventionsService.getAllConventions();
    return {conventions : allConventions};
}    
@Patch('update/:id')
async updateConvention(@Param('id') id:string, @Body() updateData: Partial<Conventions>){

    const updatedConvention = await this.conventionsService.updateConvention(id,updateData);
    return{conventions : updatedConvention};
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
  @Delete(':id/permanent')
  async deleteConventionPermanently(@Param('id') id: string): Promise<void> {
    return this.conventionsService.deleteConventionPermanently(id);
  }
}