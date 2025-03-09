class CreateMessageDto {
    content;
    receiver_id;
    image_url;
  }
  
class PaginationDto {
   page = 1;
   limit = 20;
 }
  
module.exports = { CreateMessageDto, PaginationDto };