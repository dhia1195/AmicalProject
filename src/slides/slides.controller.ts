import { Body, Controller, Delete, Get, Param, Patch, Post, Put } from '@nestjs/common';
import { Slides } from './slides.schema';
import { SlidesService } from './slides.service';

@Controller('slides')
export class SlidesController {
  constructor(private readonly slidesService: SlidesService) {}

  @Post('ajouter')
  async ajouterSlide(
    @Body('titre') titre: string,
    @Body('description') description: string,
    @Body('image') image: string,
    @Body('status') status: boolean,
    @Body('btn_href') btn_href: string,
    @Body('btn_name') btn_name: string
  ) {
    const nouveauSlide = await this.slidesService.ajouterSlide(titre, description, image, status, btn_href, btn_name);
    return { slider: nouveauSlide };
  }


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
  @Get('getdeleted')
  async getDeletedSlides() {
    const deletedSlides = await this.slidesService.getDeletedSlides();
    return { slides: deletedSlides };
  }

  // Nouvelle route pour restaurer une diapositive supprimée
  @Put('restore/:id')
  async restoreSlide(@Param('id') id: string) {
    const restoredSlide = await this.slidesService.restoreSlide(id);
    return { slide: restoredSlide };
  }
  @Delete(':id/permanent')
  async deleteSlidePermanently(@Param('id') id: string): Promise<void> {
    return this.slidesService.deleteSlidePermanently(id);
  }
}
