const { Module } = require('@nestjs/common');
const { ConfigModule } = require('@nestjs/config');
const { ScheduleModule } = require('@nestjs/schedule');
const { UsersModule } = require('./users/users.module');
const { MessagesModule } = require('./messages/messages.module');
const { SupabaseModule } = require('./supabase/supabase.module');
const { HealthModule } = require('./health/health.module');

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

