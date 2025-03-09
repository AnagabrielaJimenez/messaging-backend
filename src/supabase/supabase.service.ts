const { Injectable } = require('@nestjs/common');
const { ConfigService } = require('@nestjs/config');
const { createClient } = require('@supabase/supabase-js');

@Injectable()
export class SupabaseService {
  supabase: any;
  constructor(private configService) {
    this.supabase = createClient(
      this.configService.get('SUPABASE_URL'),
      this.configService.get('SUPABASE_SERVICE_ROLE_KEY'),
    );
  }

  getClient() {
    return this.supabase;
  }
}
