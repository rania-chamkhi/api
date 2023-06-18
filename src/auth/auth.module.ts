import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { RefreshTokenStrategy } from './dto/Strategy/RefreshToken.strategy';
import { AccessTokenStrategy } from './dto/Strategy/AccessToken.strategy';
import { AdminModule } from 'src/admin/admin.module';

@Module({
  imports:[UserModule,AdminModule,JwtModule.register({}),
    
  ],
  controllers: [AuthController],
  providers: [AuthService,RefreshTokenStrategy,AccessTokenStrategy]
})
export class AuthModule {}
