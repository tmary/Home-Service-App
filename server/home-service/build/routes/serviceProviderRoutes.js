"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const serviceProviders = [
    { id: 1, name: 'Plumber', areasOfService: ['Installing, maintaining and repairing sanitation systems', 'Supplying, installing and repairing hot water systems',
            'Fitting domestic appliances', 'Fitting bathrooms with pipes, showerheads and toilets, among other fixtures', 'Unclogging blocked drains', 'Pipe relining',
            'Emergency plumbing and Gas fitting'] },
    { id: 2, name: 'Furniture Assembler', areasOfService: ['Bed Frames', 'Bookcases', 'Cabinets and Desks', 'Entertainment Centers', 'IKEA Furniture',
            'Shelving Units', 'Sofas and Storage Racks'] },
    { id: 3, name: 'Painter', areasOfService: ['Interior Painting', 'Exterior painting', 'Drywall Repair', 'Wallpaper Installation'] },
    { id: 4, name: 'Electrician', areasOfService: ['Ceiling fans and lighting installations Sevices', 'Circuit Breaker and Fuse Services', 'Smoke Detectors Services'] },
    { id: 5, name: 'Cleaners', areasOfService: ['Window cleaning', 'Carpet edges vacuumed', 'Upholstery cleaning', 'Kitchen cleaning'] }
];
//retrieve all service providers
router.get('/service-providers', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.json(serviceProviders);
}));
//create a service provider
router.post('/service-providers', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newServiceProvider = req.body;
    serviceProviders.push(newServiceProvider);
    res.status(201).json(newServiceProvider);
}));
// Update an existing service Provider
router.put('/service-providers/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const updatedServiceProvider = req.body;
    const index = serviceProviders.findIndex(provider => provider.id === id);
    if (index == -1) {
        serviceProviders[index] = Object.assign(Object.assign({}, serviceProviders[index]), updatedServiceProvider);
        res.status(200).json([serviceProviders[index]]);
    }
    else {
        res.status(404).send('Service provider not found');
    }
}));
// Delete a service provider
router.delete('/service-providers/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const index = serviceProviders.findIndex(provider => provider.id === id);
    if (index !== -1) {
        serviceProviders.splice(index, 1);
        res.status(204).send();
    }
    else {
        res.status(404).send('Service provider not found');
    }
}));
exports.default = router;
