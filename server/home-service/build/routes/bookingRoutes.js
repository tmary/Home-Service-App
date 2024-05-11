"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
let bookings = []; // Assuming you have a data structure to store bookings
// Create a new booking
router.post('/bookings', (req, res) => {
    const newBooking = req.body;
    bookings.push(newBooking);
    res.status(201).json(newBooking);
});
// Retrieve all bookings
router.get('/bookings', (req, res) => {
    res.json(bookings);
});
// Retrieve a specific booking by ID
router.get('/bookings/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const booking = bookings.find(booking => booking.id === id);
    if (booking) {
        res.json(booking);
    }
    else {
        res.status(404).send('Booking not found');
    }
});
// Update an existing booking
router.put('/bookings/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const updatedBooking = req.body;
    const index = bookings.findIndex(booking => booking.id === id);
    if (index !== -1) {
        bookings[index] = Object.assign(Object.assign({}, bookings[index]), updatedBooking);
        res.status(200).json(bookings[index]);
    }
    else {
        res.status(404).send('Booking not found');
    }
});
// Delete a booking
router.delete('/bookings/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = bookings.findIndex(booking => booking.id === id);
    if (index !== -1) {
        bookings.splice(index, 1);
        res.status(204).send();
    }
    else {
        res.status(404).send('Booking not found');
    }
});
exports.default = router;
