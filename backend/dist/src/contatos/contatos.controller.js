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
exports.ContatosController = void 0;
const common_1 = require("@nestjs/common");
const contatos_service_1 = require("./contatos.service");
const create_contato_dto_1 = require("./dto/create-contato.dto");
let ContatosController = class ContatosController {
    contatosService;
    constructor(contatosService) {
        this.contatosService = contatosService;
    }
    create(createContatoDto) {
        return this.contatosService.create(createContatoDto);
    }
    findAll(status) {
        return this.contatosService.findAll(status);
    }
    getStats() {
        return this.contatosService.getStats();
    }
    findOne(id) {
        return this.contatosService.findOne(id);
    }
    markAsRead(id) {
        return this.contatosService.markAsRead(id);
    }
    markAsResponded(id) {
        return this.contatosService.markAsResponded(id);
    }
    remove(id) {
        return this.contatosService.remove(id);
    }
};
exports.ContatosController = ContatosController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_contato_dto_1.CreateContatoDto]),
    __metadata("design:returntype", void 0)
], ContatosController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ContatosController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('stats'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ContatosController.prototype, "getStats", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ContatosController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id/read'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ContatosController.prototype, "markAsRead", null);
__decorate([
    (0, common_1.Patch)(':id/responded'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ContatosController.prototype, "markAsResponded", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ContatosController.prototype, "remove", null);
exports.ContatosController = ContatosController = __decorate([
    (0, common_1.Controller)('contatos'),
    __metadata("design:paramtypes", [contatos_service_1.ContatosService])
], ContatosController);
//# sourceMappingURL=contatos.controller.js.map