import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Sildes, SildesDocument } from './slides.schema';

@Injectable()
export class SlidesService {constructor(@InjectModel(Sildes.name) private SildesModel: Model<SildesDocument>){}


async ajouterSilde(titre: string, description: string, image:string): Promise<Sildes> {
        const createdSildes = new this.SildesModel({
            titre,
            description,
            image,
        });
    
        return createdSildes.save();
    }
async getAllSildes(): Promise<Sildes[]> {
        const allSildes = await this.SildesModel.find().exec();
        return allSildes;
      }

async updateSilde(id: string, updateData: Partial<Sildes>): Promise<Sildes> {
        const updatedSilde = await this.SildesModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
        if (!updatedSilde) {
          // Handle the case where the sprint with the given ID was not found
          throw new Error('Silde not found');
        }
        return updatedSilde;
      }

async deleteSilde(id: string): Promise<void> {
        await this.SildesModel.findByIdAndDelete(id).exec();
      }

async getSildeById(id: string): Promise<Sildes> {
        return this.SildesModel.findById(id).exec();
      }
}



