import { Controller, Get, Post, Body, Query, Param, Headers, UnauthorizedException } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { SupabaseService } from '../supabase/supabase.service';
import { CreateMessageDto, PaginationDto } from './dto/message.dto';

@Controller('messages')
export class MessagesController {
  constructor(
    private messagesService: MessagesService,
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

  @Get(':contactId')
  async findByContact(
    @Param('contactId') contactId: string,
    @Query() paginationDto: PaginationDto,
    @Headers('authorization') authHeader: string,
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
    @Body() createMessageDto: CreateMessageDto,
    @Headers('authorization') authHeader: string,
  ) {
    const user = await this.validateToken(authHeader);
    return this.messagesService.create(user.id, createMessageDto);
  }
}