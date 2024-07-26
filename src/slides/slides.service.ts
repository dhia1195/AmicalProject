import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Slides, SlidesDocument } from './slides.schema';

@Injectable()
export class SlidesService {constructor(@InjectModel(Slides.name) private SlidesModel: Model<SlidesDocument>){}


async ajouterSlide(titre: string, description: string, image:string): Promise<Slides> {
        const createdSlides = new this.SlidesModel({
            titre,
            description,
            image,
        });
    
        return createdSlides.save();
    }
async getAllSlides(): Promise<Slides[]> {
        const allSlides = await this.SlidesModel.find().exec();
        return allSlides;
      }

async updateSlide(id: string, updateData: Partial<Slides>): Promise<Slides> {
        const updatedSlide = await this.SlidesModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
        if (!updatedSlide) {
          // Handle the case where the sprint with the given ID was not found
          throw new Error('Slide not found');
        }
        return updatedSlide;
      }

async deleteSlide(id: string): Promise<void> {
        await this.SlidesModel.findByIdAndDelete(id).exec();
      }

async getSlideById(id: string): Promise<Slides> {
        return this.SlidesModel.findById(id).exec();
      }
}



