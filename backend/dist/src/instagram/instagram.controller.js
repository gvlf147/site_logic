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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InstagramController = void 0;
const common_1 = require("@nestjs/common");
const instagram_service_1 = require("./instagram.service");
let InstagramController = class InstagramController {
    instagramService;
    constructor(instagramService) {
        this.instagramService = instagramService;
    }
    async getPosts(limit) {
        const limitNumber = limit ? parseInt(limit, 10) : 6;
        return this.instagramService.getRecentPosts(limitNumber);
    }
};
exports.InstagramController = InstagramController;
__decorate([
    (0, common_1.Get)('posts'),
    __param(0, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InstagramController.prototype, "getPosts", null);
exports.InstagramController = InstagramController = __decorate([
    (0, common_1.Controller)('instagram'),
    __metadata("design:paramtypes", [instagram_service_1.InstagramService])
], InstagramController);
//# sourceMappingURL=instagram.controller.js.map