"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstagramService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = __importDefault(require("axios"));
let InstagramService = class InstagramService {
    accessToken;
    userId;
    baseUrl = 'https://graph.instagram.com';
    constructor() {
        this.accessToken = process.env.INSTAGRAM_ACCESS_TOKEN || '';
        this.userId = process.env.INSTAGRAM_USER_ID || '';
    }
    async getRecentPosts(limit = 6) {
        try {
            if (!this.accessToken) {
                console.warn('Instagram Access Token não configurado');
                return this.getMockPosts(limit);
            }
            const response = await axios_1.default.get(`${this.baseUrl}/${this.userId}/media`, {
                params: {
                    fields: 'id,caption,media_type,media_url,permalink,thumbnail_url,timestamp',
                    access_token: this.accessToken,
                    limit,
                },
            });
            return response.data.data;
        }
        catch (error) {
            console.error('Erro ao buscar posts do Instagram:', error.response?.data || error.message);
            return this.getMockPosts(limit);
        }
    }
    async refreshAccessToken(longLivedToken) {
        try {
            const response = await axios_1.default.get(`${this.baseUrl}/refresh_access_token`, {
                params: {
                    grant_type: 'ig_refresh_token',
                    access_token: longLivedToken,
                },
            });
            return response.data;
        }
        catch (error) {
            throw new common_1.HttpException('Erro ao renovar token do Instagram', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    getMockPosts(limit) {
        const mockPosts = [
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
};
exports.InstagramService = InstagramService;
exports.InstagramService = InstagramService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], InstagramService);
//# sourceMappingURL=instagram.service.js.map