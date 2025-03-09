import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../supabase/supabase.service';
import { Profile } from '../types/supabase';

@Injectable()
export class UsersService {
  constructor(private supabaseService: SupabaseService) {}

  async findAll(userId: string): Promise<Profile[]> {
    const supabase = this.supabaseService.getClient();
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .neq('id', userId);
    
    if (error) {
      throw new Error(`Error fetching users: ${error.message}`);
    }
    
    return data;
  }

  async findById(id: string): Promise<Profile> {
    const supabase = this.supabaseService.getClient();
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      throw new Error(`Error fetching user: ${error.message}`);
    }
    
    return data;
  }

  async search(query: string, userId: string): Promise<Profile[]> {
    const supabase = this.supabaseService.getClient();
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .neq('id', userId)
      .ilike('username', `%${query}%`);
    
    if (error) {
      throw new Error(`Error searching users: ${error.message}`);
    }
    
    return data;
  }

  async updateLastSeen(userId: string): Promise<{ success: boolean }> {
    const supabase = this.supabaseService.getClient();
    
    const { error } = await supabase
      .from('profiles')
      .update({ last_seen: new Date().toISOString() })
      .eq('id', userId);
    
    if (error) {
      throw new Error(`Error updating last seen: ${error.message}`);
    }
    
    return { success: true };
  }
}