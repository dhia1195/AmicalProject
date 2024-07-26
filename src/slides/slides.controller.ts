import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { Slides } from './slides.schema';
import { SlidesService } from './slides.service';

@Controller('slides')
export class SlidesController {constructor(private readonly slidesService: SlidesService) {}

@Post('ajouter')
async ajouterSlide(
    @Body('titre') titre: string,
    @Body('description') description: string,
    @Body('image') image: string,
   
) {
    const nouveauSlide = await this.slidesService.ajouterSlide(titre, description,image);
    return { slider: nouveauSlide };}

@Get('getall')
async getAllSlides(){
    const allSlides = await this.slidesService.getAllSlides();
    return {slides : allSlides};
}    
@Patch('update/:id')
async updateSlide(@Param('id') id:string, @Body() updateData: Partial<Slides>){

    const updatedSlide = await this.slidesService.updateSlide(id,updateData);
    return{Slides : updatedSlide};
}

@Delete(':id')
  async deleteSlide(@Param('id') id: string) {
    await this.slidesService.deleteSlide(id);
    return { message: 'slider deleted successfully' };
  }

@Get('getbyid/:id')
  async getSlideById(@Param('id') id: string) {
    return this.slidesService.getSlideById(id);
  }

}
