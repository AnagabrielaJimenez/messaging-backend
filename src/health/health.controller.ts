const { Controller, Get } = require('@nestjs/common');
const { HealthService } = require('./health.service');

@Controller('health')
export class HealthController {
  constructor(private healthService) {}

  @Get()
  getStatus() {
    return this.healthService.getStatus();
  }
}

module.exports = { HealthController };