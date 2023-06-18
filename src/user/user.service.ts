import { Injectable ,NotFoundException} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Iuser } from './entities/interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(@InjectModel('user') private UserModel: Model<Iuser>) { }
  async createUser(createUserDto: CreateUserDto): Promise<Iuser> {
    const newUser = await new this.UserModel(createUserDto);
    return newUser.save();
  }
  async findById(id: string): Promise<Iuser>{
    return this.UserModel.findById(id);
  }
  async findByUsername(username: string): Promise<Iuser>{
    return this.UserModel.findOne({username}).exec();
  }
  async updateUser(UserId: string, updateUserDto: UpdateUserDto): Promise<Iuser> {
    const existinguser = await this.UserModel.findByIdAndUpdate(UserId, updateUserDto, { new: true });
    if (!existinguser) {
      throw new NotFoundException(`User #${UserId} not found`);
    }
    return existinguser;
  }
  async getAllUsers(): Promise<Iuser[]> {
    const UserData = await this.UserModel.find().select("-__v");
    if (!UserData || UserData.length == 0) {
      throw new NotFoundException('User data not found!');
    }
    return UserData;
  }
  async getUser(UserId: string): Promise<Iuser> {
    const existingUser = await this.UserModel.findById(UserId).exec();
    if (!existingUser) {
      throw new NotFoundException(`User #${UserId} not found`);
    }
    return existingUser;
  }


  async getUserByEmail(email: string): Promise<Iuser[]> {
    const existingUserByEmail = await this.UserModel.find({email:email}).exec();
    if (!existingUserByEmail) {
      throw new NotFoundException(`User #${email} not found`);
    }
    return existingUserByEmail;
  }
  async deleteUser(UserId: string): Promise<Iuser> {
    const deletedUser = await this.UserModel.findByIdAndDelete(UserId);
    if (!deletedUser) {
      throw new NotFoundException(`User #${UserId} not found`);
    }
    return deletedUser;
  }
}
