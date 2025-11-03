import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

export interface InstagramMedia {
  id: string;
  caption?: string;
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM';
  media_url: string;
  permalink: string;
  thumbnail_url?: string;
  timestamp: string;
}

@Injectable()
export class InstagramService {
  private readonly accessToken: string;
  private readonly userId: string;
  private readonly baseUrl = 'https://graph.instagram.com';

  constructor() {
    this.accessToken = process.env.INSTAGRAM_ACCESS_TOKEN || '';
    this.userId = process.env.INSTAGRAM_USER_ID || '';
  }

  async getRecentPosts(limit: number = 6): Promise<InstagramMedia[]> {
    try {
      if (!this.accessToken) {
        console.warn('Instagram Access Token não configurado');
        return this.getMockPosts(limit);
      }

      const response = await axios.get(
        `${this.baseUrl}/${this.userId}/media`,
        {
          params: {
            fields: 'id,caption,media_type,media_url,permalink,thumbnail_url,timestamp',
            access_token: this.accessToken,
            limit,
          },
        }
      );

      return response.data.data;
    } catch (error) {
      console.error('Erro ao buscar posts do Instagram:', error.response?.data || error.message);
      
      // Retornar posts mockados em caso de erro
      return this.getMockPosts(limit);
    }
  }

  async refreshAccessToken(longLivedToken: string): Promise<any> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/refresh_access_token`,
        {
          params: {
            grant_type: 'ig_refresh_token',
            access_token: longLivedToken,
          },
        }
      );

      return response.data;
    } catch (error) {
      throw new HttpException(
        'Erro ao renovar token do Instagram',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private getMockPosts(limit: number): InstagramMedia[] {
    const mockPosts: InstagramMedia[] = [
      {
        id: '1',
        caption: 'Novo projeto incrível finalizado! 🚀 #webdev #logicphire',
        media_type: 'IMAGE',
        media_url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=800&fit=crop',
        permalink: 'https://instagram.com/logicphire',
        timestamp: new Date().toISOString(),
      },
      {
        id: '2',
        caption: 'Design moderno e funcional 💻 #design #tech',
        media_type: 'IMAGE',
        media_url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=800&fit=crop',
        permalink: 'https://instagram.com/logicphire',
        timestamp: new Date().toISOString(),
      },
      {
        id: '3',
        caption: 'Trabalhando em algo especial... 👀 #developer #coding',
        media_type: 'IMAGE',
        media_url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=800&fit=crop',
        permalink: 'https://instagram.com/logicphire',
        timestamp: new Date().toISOString(),
      },
      {
        id: '4',
        caption: 'Team work makes the dream work! 🎯 #teamwork',
        media_type: 'IMAGE',
        media_url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=800&fit=crop',
        permalink: 'https://instagram.com/logicphire',
        timestamp: new Date().toISOString(),
      },
      {
        id: '5',
        caption: 'Café e código ☕️💻 #coffee #programming',
        media_type: 'IMAGE',
        media_url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=800&fit=crop',
        permalink: 'https://instagram.com/logicphire',
        timestamp: new Date().toISOString(),
      },
      {
        id: '6',
        caption: 'Inovação é nosso DNA 🧬 #innovation #tech',
        media_type: 'IMAGE',
        media_url: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=800&fit=crop',
        permalink: 'https://instagram.com/logicphire',
        timestamp: new Date().toISOString(),
      },
    ];

    return mockPosts.slice(0, limit);
  }
}
