import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Sildes } from './slides.schema';
import { SlidesService } from './slides.service';

@Controller('slides')
export class SlidesController {constructor(private readonly sildesService: SlidesService) {}

@Post('ajouter')
async ajouterSprint(
    @Body('titre') titre: string,
    @Body('description') description: string,
    @Body('image') image: string,
   
) {
    const nouveauSilde = await this.sildesService.ajouterSilde(titre, description,image);
    return { slider: nouveauSilde };}

@Get('getall')
async getAllFounisserus(){
    const allSildes = await this.sildesService.getAllSildes();
    return {sildes : allSildes};
}    
@Patch('update/:id')
async updateSilde(@Param('id') id:string, @Body() updateData: Partial<Sildes>){

    const updatedSilde = await this.sildesService.updateSilde(id,updateData);
    return{Sildes : updatedSilde};
}

@Delete(':id')
  async deleteSilde(@Param('id') id: string) {
    await this.sildesService.deleteSilde(id);
    return { message: 'slider deleted successfully' };
  }

@Get('getbyid/:id')
  async getSildeById(@Param('id') id: string) {
    return this.sildesService.getSildeById(id);
  }

}
