const { Module } = require('@nestjs/common');
const { HealthService } = require('./health.service');
const { HealthController } = require('./health.controller');

@Module({
  controllers: [HealthController],
  providers: [HealthService],
})
class HealthModule {}

module.exports = { HealthModule };