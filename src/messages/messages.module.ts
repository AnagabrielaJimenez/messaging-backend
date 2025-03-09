const { Module } = require('@nestjs/common');
const { MessagesService } = require('./messages.service');
const { MessagesController } = require('./messages.controller');

@Module({
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule {}

module.exports = { MessagesModule };