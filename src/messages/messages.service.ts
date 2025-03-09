import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { Message } from '../types/supabase';
import { CreateMessageDto } from './dto/message.dto';

@Injectable()
export class MessagesService {
  constructor(private supabaseService: SupabaseService) {}

  async findByContact(userId: string, contactId: string, page = 1, limit = 20): Promise<{
    data: Message[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      pages: number;
    };
  }> {
    const supabase = this.supabaseService.getClient();
    
    // Calcular el offset para la paginación
    const from = (page - 1) * limit;
    const to = from + limit - 1;
    
    const { data, error, count } = await supabase
      .from('messages')
      .select('*', { count: 'exact' })
      .or(`and(sender_id.eq.${userId},receiver_id.eq.${contactId}),and(sender_id.eq.${contactId},receiver_id.eq.${userId})`)
      .order('created_at', { ascending: false })
      .range(from, to);
    
    if (error) {
      throw new Error(`Error fetching messages: ${error.message}`);
    }
    
    // Marcar mensajes como leídos
    await this.markAsRead(userId, contactId);
    
    return {
      data: data.reverse(),
      pagination: {
        total: count,
        page,
        limit,
        pages: Math.ceil(count / limit),
      },
    };
  }

  async create(senderId: string, message: CreateMessageDto): Promise<Message> {
    const supabase = this.supabaseService.getClient();
    
    const { data, error } = await supabase
      .from('messages')
      .insert({
        content: message.content,
        sender_id: senderId,
        receiver_id: message.receiver_id,
        image_url: message.image_url || null,
        read: false,
      })
      .select();
    
    if (error) {
      throw new Error(`Error creating message: ${error.message}`);
    }
    
    return data[0];
  }

  async markAsRead(userId: string, contactId: string): Promise<{ success: boolean }> {
    const supabase = this.supabaseService.getClient();
    
    const { error } = await supabase
      .from('messages')
      .update({ read: true })
      .eq('receiver_id', userId)
      .eq('sender_id', contactId)
      .eq('read', false);
    
    if (error) {
      throw new Error(`Error marking messages as read: ${error.message}`);
    }
    
    return { success: true };
  }
}