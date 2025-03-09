import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { UsersModule } from './users/users.module';
import { MessagesModule } from './messages/messages.module';
import { SupabaseModule } from './supabase/supabase.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    SupabaseModule,
    UsersModule,
    MessagesModule,
    HealthModule,
  ],
})
export class AppModule {}