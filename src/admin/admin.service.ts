import { Injectable ,NotFoundException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ires } from 'src/reservation/dto/interfaces/reservation.interface';
import { Iuser } from 'src/user/entities/interfaces/user.interface';
import { Iveh } from 'src/vehicule/dto/interfaces/vehicule.interface';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Iadmin } from './entities/interfaces/admin.interface';

@Injectable()
export class AdminService {
  constructor(@InjectModel('admin') private AdminModel: Model<Iadmin> ,
  @InjectModel('vehicule') private VehModel: Model<Iveh>, @InjectModel('user') private UserModel: Model<Iuser>, @InjectModel('reservation') private ResModel: Model<Ires>) { }
  async createAdmin(createAdminDto: CreateAdminDto): Promise<Iadmin> {
    const newAdmin = await new this.AdminModel(createAdminDto);
    return newAdmin.save();
  }
  async findById(id: string): Promise<Iadmin>{
    return this.AdminModel.findById(id);
  }
 
  async updateAdmin(AdminId: string, updateAdminDto: UpdateAdminDto): Promise<Iadmin> {
    const existingadmin = await this.AdminModel.findByIdAndUpdate(AdminId, updateAdminDto, { new: true });
    if (!existingadmin) {
      throw new NotFoundException(`Admin #${AdminId} not found`);
    }
    return existingadmin;
  }
  async getAllAdmins(): Promise<Iadmin[]> {
    const AdminData = await this.AdminModel.find().select("-__v");
    if (!AdminData || AdminData.length == 0) {
      throw new NotFoundException('Admin data not found!');
    }
    return AdminData;
  }
  async getAdmin(AdminId: string): Promise<Iadmin> {
    const existingAdmin = await this.AdminModel.findById(AdminId).exec();
    if (!existingAdmin) {
      throw new NotFoundException(`Admin #${AdminId} not found`);
    }
    return existingAdmin;
  }


  async getAdminByEmail(email: string): Promise<Iadmin[]> {
    const existingAdminByEmail = await this.AdminModel.find({email:email}).exec();
    if (!existingAdminByEmail) {
      throw new NotFoundException(`Admin #${email} not found`);
    }
    return existingAdminByEmail;
  }

  async findByUsernameAdmin(username: string): Promise<Iadmin>{
    return this.AdminModel.findOne({username}).exec();
  }

  async deleteAdmin(AdminId: string): Promise<Iadmin> {
    const deletedAdmin = await this.AdminModel.findByIdAndDelete(AdminId);
    if (!deletedAdmin) {
      throw new NotFoundException(`Admin #${AdminId} not found`);
    }
    return deletedAdmin;
  }

  async getadminReports(): Promise<any> {
    return new Promise(async(resolve, reject) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const response = {
        date: today,
        revenue: 0,
        customers: 0,
        reservations: 0,
        cars: 0,
        clients_per_month: {},
        reservations_per_month: {}
      };
  
      try {
        const result = await this.ResModel.aggregate([
          {
            $match: {
              createdAt: { $gte: today }
            }
          },
          {
            $group: {
              _id: null,
              totalPrice: { $sum: "$prixTotal" },
              totalRes: { $sum: 1 }
            }
          }
        ]).exec();
      
        const totalPrice = result[0]?.totalPrice;
        const totalRes = result[0]?.totalRes;
        if (totalPrice) {
          response.revenue = totalPrice;
          response.reservations = totalRes
        }
        const customerCount = await this.UserModel.find({ createdAt: { $gte: today } }).count();
        response.customers = customerCount;

        const dispoCar = await this.VehModel.find({ disponible : true}).count()
        response.cars = dispoCar;


        const userResult = await this.UserModel.aggregate([
          {
            $group: {
              _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
              count: { $sum: 1 }
            }
          }
        ]).exec();
        response.clients_per_month = userResult;

        const resResult = await this.ResModel.aggregate([
          {
            $group: {
              _id: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
              count: { $sum: 1 }
            }
          }
        ]).exec();
        response.reservations_per_month = resResult;

        resolve(response);
      } catch (err) {
        reject(new NotFoundException(`Reports: ${err}`));
      }
    });
  }
  
}
