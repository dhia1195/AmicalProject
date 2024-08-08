import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Slides, SlidesDocument } from './slides.schema';

@Injectable()
export class SlidesService {
  constructor(@InjectModel(Slides.name) private SlidesModel: Model<SlidesDocument>) {}

  async ajouterSlide(titre: string, description: string, image: string, status: boolean, btn_href: string, btn_name: string): Promise<Slides> {
    const createdSlides = new this.SlidesModel({
      titre,
      description,
      image,
      status,
      btn_href,
      btn_name,
    });
    return createdSlides.save();
  }

  
  async getAllSlides(): Promise<Slides[]> {
    return this.SlidesModel.find({ deleted: { $eq: null } }).exec();
  }

  async updateSlide(id: string, updateData: Partial<Slides>): Promise<Slides> {
    updateData.updated = new Date();
    const updatedSlide = await this.SlidesModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
    if (!updatedSlide) {
      throw new Error('Slide not found');
    }
    return updatedSlide;
  }

  async deleteSlide(id: string): Promise<void> {
    await this.SlidesModel.findByIdAndUpdate(id, { deleted: new Date() }).exec();
  }

  async getSlideById(id: string): Promise<Slides> {
    return this.SlidesModel.findById(id).exec();
  }
  async getDeletedSlides(): Promise<Slides[]> {
    return this.SlidesModel.find({ deleted: { $ne: null } }).exec();
  }

  async restoreSlide(id: string): Promise<Slides> {
    const restoredSlide = await this.SlidesModel.findByIdAndUpdate(id, { deleted: null }, { new: true }).exec();
    if (!restoredSlide) {
      throw new Error('Slide not found');
    }
    return restoredSlide;
  }
}
