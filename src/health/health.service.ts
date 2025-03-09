import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class HealthService {
  private readonly logger = new Logger(HealthService.name);

  @Cron('*/5 * * * *') // Cada 5 minutos
  handleCron() {
    this.logger.debug('Health check running every 5 minutes');
  }

  getStatus() {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
    };
  }
}