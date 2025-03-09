import { Controller, Get, Query, Headers, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users.service';
import { SupabaseService } from '../supabase/supabase.service';
import { SearchUserDto } from './dto/user.dto';
import { Profile } from '../types/supabase';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private supabaseService: SupabaseService,
  ) {}

  // Middleware para verificar el token JWT
  async validateToken(authHeader: string): Promise<any> {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Invalid token');
    }

    const token = authHeader.split(' ')[1];
    const supabase = this.supabaseService.getClient();
    
    const { data, error } = await supabase.auth.getUser(token);
    
    if (error || !data.user) {
      throw new UnauthorizedException('Invalid token');
    }
    
    return data.user;
  }

  @Get()
  async findAll(@Headers('authorization') authHeader: string): Promise<Profile[]> {
    const user = await this.validateToken(authHeader);
    await this.usersService.updateLastSeen(user.id);
    return this.usersService.findAll(user.id);
  }

  @Get('search')
  async search(
    @Query() searchUserDto: SearchUserDto,
    @Headers('authorization') authHeader: string,
  ): Promise<Profile[]> {
    const user = await this.validateToken(authHeader);
    return this.usersService.search(searchUserDto.query || '', user.id);
  }
}