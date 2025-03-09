import { IsString, IsOptional } from 'class-validator';

export class UserDto {
  id: string;
  username: string;
  avatar_url?: string;
  status?: string;
  last_seen?: string;
}

export class SearchUserDto {
  @IsString()
  @IsOptional()
  query?: string;
}