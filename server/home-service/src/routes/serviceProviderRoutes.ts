import express , { Request, Response} from 'express';

const router = express.Router();

const serviceProviders = [
    { id: 1, name: 'Plumber', areasOfService:['Installing, maintaining and repairing sanitation systems','Supplying, installing and repairing hot water systems',
    'Fitting domestic appliances','Fitting bathrooms with pipes, showerheads and toilets, among other fixtures', 'Unclogging blocked drains','Pipe relining',
    'Emergency plumbing and Gas fitting']},
    { id: 2, name:'Furniture Assembler', areasOfService: ['Bed Frames','Bookcases','Cabinets and Desks','Entertainment Centers','IKEA Furniture',
    'Shelving Units','Sofas and Storage Racks']},
    { id: 3,name: 'Painter', areasOfService: ['Interior Painting','Exterior painting','Drywall Repair','Wallpaper Installation']},
    {id: 4, name:'Electrician', areasOfService: ['Ceiling fans and lighting installations Sevices', 'Circuit Breaker and Fuse Services', 'Smoke Detectors Services']},
    {id:5, name: 'Cleaners', areasOfService: ['Window cleaning', 'Carpet edges vacuumed', 'Upholstery cleaning', 'Kitchen cleaning']}
 
];

//retrieve all service providers
router.get('/service-providers', async (req: Request, res: Response) => {
    res.json(serviceProviders);
});

//create a service provider
router.post('/service-providers', async (req: Request, res: Response) => {
    const newServiceProvider = req.body;
    serviceProviders.push(newServiceProvider);
    res.status(201).json(newServiceProvider);
});

// Update an existing service Provider
router.put('/service-providers/:id', async ( req: Request, res: Response) => {
    const id = parseInt( req.params.id);
    const updatedServiceProvider = req.body;

    const index = serviceProviders.findIndex(provider => provider.id === id);
    if (index ! == -1 ) {
        serviceProviders[index] = {...serviceProviders[index], ...updatedServiceProvider};
        res.status(200).json([serviceProviders[index]]);
    } else {
        res.status(404).send('Service provider not found');
    }
});

// Delete a service provider
router.delete('/service-providers/:id', async (req: Request, res: Response) => {
   const id = parseInt(req.params.id);
   const index = serviceProviders.findIndex(provider => provider.id === id);
    if ( index !== -1) {
        serviceProviders.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).send('Service provider not found');
    }
});

export default router;