const { Module, Global } = require('@nestjs/common');
const { SupabaseService } = require('./supabase.service');

@Global()
@Module({
  providers: [SupabaseService],
  exports: [SupabaseService],
})
export class SupabaseModule {}