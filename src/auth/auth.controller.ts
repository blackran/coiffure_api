import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ProfessionalRegisterDto } from './dto/professionalRegister.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtGuard } from './guards/jwt.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor (private authService: AuthService, private userService: UsersService){}

  @Post('/login')
  @UseGuards(LocalAuthGuard)
  login(@Request() req, @Body() LoginDto: LoginDto) {
    return this.authService.login(req.user);
  }

  @Post('/register')
  async register(@Body() registerDto: RegisterDto) {
    let user = await this.authService.register(registerDto);
    delete(user.password);
    let tooken = await this.authService.login(user);
    let response = {...user, ...tooken}
    return response;
  }

  /**
   * Create an user with an entity for professional use
   * @param registerDto ProfessionalRegisterDto
   * @returns HttpResponse
   */
  @Post('/register/professional')
  async professionalRegister(@Body() registerDto: ProfessionalRegisterDto) {
    let user = await this.authService.professionalRegister(registerDto);
    delete(user.password);
    let tooken = await this.authService.login(user);
    let response = {...user, ...tooken}
    return user;
  }

  @ApiBearerAuth()
  @Get('/user')
  @UseGuards(JwtGuard)
  async user(@Request() req) {
    let user = await this.userService.findOne(req.user.id);
    delete(user.password);
    return user;
  }
}
