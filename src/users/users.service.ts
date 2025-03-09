const { Injectable } = require('@nestjs/common');
const { SupabaseService } = require('../supabase/supabase.service');

@Injectable()
export class UsersService {
  constructor(private supabaseService) {}

  async findAll(userId) {
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

  async findById(id) {
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

  async search(query, userId) {
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

  async updateLastSeen(userId) {
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

module.exports = { UsersService };