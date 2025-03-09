const { Controller, Get, Post, Body, Query, Param, Headers, UnauthorizedException } = require('@nestjs/common');
const { MessagesService } = require('./messages.service');
const { SupabaseService } = require('../supabase/supabase.service');
const { CreateMessageDto, PaginationDto } = require('./dto/message.dto');

@Controller('messages')
export class MessagesController {
  constructor(
    private messagesService,
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

  @Get(':contactId')
  async findByContact(
    @Param('contactId') contactId,
    @Query() paginationDto,
    @Headers('authorization') authHeader,
  ) {
    const user = await this.validateToken(authHeader);
    return this.messagesService.findByContact(
      user.id,
      contactId,
      paginationDto.page,
      paginationDto.limit,
    );
  }

  @Post()
  async create(
    @Body() createMessageDto,
    @Headers('authorization') authHeader,
  ) {
    const user = await this.validateToken(authHeader);
    return this.messagesService.create(user.id, createMessageDto);
  }
}

module.exports = { MessagesController };