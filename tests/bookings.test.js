const request = require('supertest');
const app = require('../server');
const Booking = require('../models/Booking');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { MongoMemoryServer } = require('mongodb-memory-server');

let adminToken, mentorToken, learnerToken;

beforeAll(async () => {
  // Create test users in in-memory DB
  const admin = await User.create({ name: 'Admin', email: 'admin@test.com', password: 'password', role: 'admin' });
  const mentor = await User.create({ name: 'Mentor', email: 'mentor@test.com', password: 'password', role: 'mentor' });
  const learner = await User.create({ name: 'Learner', email: 'learner@test.com', password: 'password', role: 'learner' });

  // Generate JWT tokens
  adminToken = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  mentorToken = jwt.sign({ id: mentor._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  learnerToken = jwt.sign({ id: learner._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
});

afterEach(async () => {
  await Booking.deleteMany(); // Clear test bookings after each test
});

describe('Booking Routes', () => {

  test('PUT /api/bookings/:id - Admin & Mentor can update bookings', async () => {
    const booking = await Booking.create({ skillId: '12345abcd', userId: '123user' });

    const res = await request(app)
      .put(`/api/bookings/${booking._id}`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ status: 'confirmed' });

    expect(res.statusCode).toBe(200);
  });

  test('POST /api/bookings - Admin, Mentor, Learner can create bookings', async () => {
    const res = await request(app)
      .post('/api/bookings')
      .set('Authorization', `Bearer ${mentorToken}`)
      .send({
        skillId: '12345abcd',
        scheduledAt: new Date(), // ✅ Provide required scheduledAt field
        learner: 'someLearnerId' // ✅ Provide required learner field
      });

    expect(res.statusCode).toBe(201);
  });


  test('DELETE /api/bookings/:id - Admin, Mentor, Learner can delete bookings', async () => {
    const booking = await Booking.create({ skillId: '12345abcd', userId: '123user' });

    const res = await request(app)
      .delete(`/api/bookings/${booking._id}`)
      .set('Authorization', `Bearer ${learnerToken}`);

    expect(res.statusCode).toBe(200);
  });
});
