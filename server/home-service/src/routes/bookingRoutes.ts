import express, { Request, Response } from 'express';

const router = express.Router();

let bookings: any[] = []; // Assuming you have a data structure to store bookings

// Create a new booking
router.post('/bookings', (req: Request, res: Response) => {
    const newBooking = req.body;
    bookings.push(newBooking);
    res.status(201).json(newBooking);
});

// Retrieve all bookings
router.get('/bookings', (req: Request, res: Response) => {
    res.json(bookings);
});

// Retrieve a specific booking by ID
router.get('/bookings/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const booking = bookings.find(booking => booking.id === id);
    if (booking) {
        res.json(booking);
    } else {
        res.status(404).send('Booking not found');
    }
});

// Update an existing booking
router.put('/bookings/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const updatedBooking = req.body;

    const index = bookings.findIndex(booking => booking.id === id);
    if (index !== -1) {
        bookings[index] = { ...bookings[index], ...updatedBooking };
        res.status(200).json(bookings[index]);
    } else {
        res.status(404).send('Booking not found');
    }
});

// Delete a booking
router.delete('/bookings/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const index = bookings.findIndex(booking => booking.id === id);
    if (index !== -1) {
        bookings.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).send('Booking not found');
    }
});

export default router;
