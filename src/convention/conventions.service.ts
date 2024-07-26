import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Conventions, ConventionsDocument } from './conventions.schema';

@Injectable()
export class ConventionsService {constructor(@InjectModel(Conventions.name) private ConventionsModel: Model<ConventionsDocument>){}


async ajouterConvention(titre: string, status: string,date:Date, pdf:string): Promise<Conventions> {
        const createdConventions = new this.ConventionsModel({
            titre,
            status,
            date,
            pdf,
        });
    
        return createdConventions.save();
    }
async getAllConventions(): Promise<Conventions[]> {
        const allConventions = await this.ConventionsModel.find().exec();
        return allConventions;
      }

async updateConvention(id: string, updateData: Partial<Conventions>): Promise<Conventions> {
        const updatedConvention = await this.ConventionsModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
        if (!updatedConvention) {
          throw new Error('Convention not found');
        }
        return updatedConvention;
      }

async deleteConvention(id: string): Promise<void> {
        await this.ConventionsModel.findByIdAndDelete(id).exec();
      }

async getConventionById(id: string): Promise<Conventions> {
        return this.ConventionsModel.findById(id).exec();
      }
}



