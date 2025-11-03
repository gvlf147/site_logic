import { Controller, Get, Query } from '@nestjs/common';
import { InstagramService, InstagramMedia } from './instagram.service';

@Controller('instagram')
export class InstagramController {
  constructor(private readonly instagramService: InstagramService) {}

  @Get('posts')
  async getPosts(@Query('limit') limit?: string): Promise<InstagramMedia[]> {
    const limitNumber = limit ? parseInt(limit, 10) : 6;
    return this.instagramService.getRecentPosts(limitNumber);
  }
}
