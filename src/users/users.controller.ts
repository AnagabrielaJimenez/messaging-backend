const { Controller, Get, Post, Body, Query, Headers, UnauthorizedException } = require('@nestjs/common');
const { UsersService } = require('./users.service');
const { SupabaseService } = require('../supabase/supabase.service');
const { SearchUserDto } = require('./dto/user.dto');

@Controller('users')
export class UsersController {
  constructor(
    private usersService,
    private supabaseService,
  ) {}

  // Middleware para verificar el token JWT
  async validateToken(authHeader) {
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
  async findAll(@Headers('authorization') authHeader) {
    const user = await this.validateToken(authHeader);
    await this.usersService.updateLastSeen(user.id);
    return this.usersService.findAll(user.id);
  }

  @Get('search')
  async search(
    @Query() searchUserDto,
    @Headers('authorization') authHeader,
  ) {
    const user = await this.validateToken(authHeader);
    return this.usersService.search(searchUserDto.query, user.id);
  }
}

module.exports = { UsersController };