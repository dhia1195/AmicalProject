import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Conventions, ConventionsDocument, TypeC } from './conventions.schema';

@Injectable()
export class ConventionsService {constructor(@InjectModel(Conventions.name) private ConventionsModel: Model<ConventionsDocument>){}


async ajouterConvention(
  titre: string,
  status: boolean,
  date: Date,
  type: TypeC,
  image: string // Make pdf optional
): Promise<Conventions> {
  const createdConventions = new this.ConventionsModel({
    titre,
    status,
    date,
    image, // pdf is optional here
    type,
  });

  return createdConventions.save();
}

    async getAllConventions(): Promise<Conventions[]> {
      const allConventions = await this.ConventionsModel.find({ deleted: { $eq: null } }).exec();
      return allConventions;
    }

 async updateConvention(id: string, updateData: Partial<Conventions>): Promise<Conventions> {
        updateData.updated = new Date();
        const updateConvention = await this.ConventionsModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
        if (!updateConvention) {
          throw new Error('Convention not found');
        }
        return updateConvention;
      }


      async deleteConvention(id: string): Promise<void> {
        await this.ConventionsModel.findByIdAndUpdate(id, { deleted: new Date() }).exec();
      }
async getConventionById(id: string): Promise<Conventions> {
        return this.ConventionsModel.findById(id).exec();
      }
      async getDeletedConventions(): Promise<Conventions[]> {
        return this.ConventionsModel.find({ deleted: { $ne: null } }).exec();
      }
      async restoreConvention(id: string): Promise<Conventions> {
        const restoredConvention = await this.ConventionsModel.findByIdAndUpdate(id, { deleted: null }, { new: true }).exec();
        if (!restoredConvention) {
          throw new Error('Convention not found');
        }
        return restoredConvention;
      }
      async deleteConventionPermanently(id: string): Promise<void> {
        const result = await this.ConventionsModel.findByIdAndDelete(id).exec();
        if (!result) {
          throw new Error('Convention not found or already deleted permanently');
        }
      }
}


