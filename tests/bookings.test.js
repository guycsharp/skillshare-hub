const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Booking = require('../models/Booking');
const Skill = require('../models/Skill');
const User = require('../models/User');

let learnerToken, skillId, bookingId;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await Booking.deleteMany();
  await Skill.deleteMany();
  await User.deleteMany();

  await request(app).post('/api/auth/register').send({
    name: 'Mentor1',
    email: 'mentor1@test.com',
    password: 'pass123',
    role: 'mentor'
  });

  const mentorLogin = await request(app).post('/api/auth/login').send({
    email: 'mentor1@test.com',
    password: 'pass123'
  });

  const skill = await request(app)
    .post('/api/skills')
    .set('Authorization', `Bearer ${mentorLogin.body.token}`)
    .send({ title: 'Node.js', description: 'Node backend' });

  skillId = skill.body._id;

  await request(app).post('/api/auth/register').send({
    name: 'Learner',
    email: 'learner@test.com',
    password: 'pass123',
    role: 'learner'
  });

  const learnerLogin = await request(app).post('/api/auth/login').send({
    email: 'learner@test.com',
    password: 'pass123'
  });

  learnerToken = learnerLogin.body.token;
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('Booking API', () => {
  it('should create a booking', async () => {
    const res = await request(app)
      .post('/api/bookings')
      .set('Authorization', `Bearer ${learnerToken}`)
      .send({
        skill: skillId,
        scheduledAt: new Date(Date.now() + 3600000)
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.skill).toBe(skillId);
    bookingId = res.body._id;
  });

  it('should get learner bookings', async () => {
    const res = await request(app)
      .get('/api/bookings')
      .set('Authorization', `Bearer ${learnerToken}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('should update a booking status', async () => {
    const res = await request(app)
      .put(`/api/bookings/${bookingId}`)
      .set('Authorization', `Bearer ${learnerToken}`)
      .send({ status: 'confirmed' });

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('confirmed');
  });

  it('should delete a booking', async () => {
    const res = await request(app)
      .delete(`/api/bookings/${bookingId}`)
      .set('Authorization', `Bearer ${learnerToken}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Booking deleted');
  });
});
