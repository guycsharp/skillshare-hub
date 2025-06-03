jest.setTimeout(20000);

const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const request = require('supertest');
const app = require('../app');
const User = require('../models/User');
const Skill = require('../models/Skill');
const Booking = require('../models/Booking');

let mongo;
let learnerToken;
let mentorToken;
let skillId;
let bookingId;

// beforeAll(async () => {
//   // mongo = await MongoMemoryServer.create();
//   // const uri = mongo.getUri();

//   // if (mongoose.connection.readyState === 0) {
//   //   await mongoose.connect(uri, {
//   //     useNewUrlParser: true,
//   //     useUnifiedTopology: true,
//   //   });
//   // }

//   await User.deleteMany();
//   await Skill.deleteMany();
//   await Booking.deleteMany();
// });

// afterAll(async () => {
//   await mongoose.connection.dropDatabase();
//   await mongoose.connection.close();
//   await mongo.stop();
// });

describe('Booking API', () => {
  it('should create a booking', async () => {
    const res = await request(app)
      .post('/api/bookings')
      .set('Authorization', `Bearer ${learnerToken}`)
      .send({ skill: skillId });

    console.log('Booking Creation Response:', res.body);
    expect(res.statusCode).toBe(201);
    expect(res.body.status).toBe('pending');
    bookingId = res.body?._id;
  });

  it('should get learner bookings', async () => {
    const res = await request(app)
      .get('/api/bookings')
      .set('Authorization', `Bearer ${learnerToken}`);

    console.log('Bookings List:', res.body);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('should update a booking status', async () => {
    const res = await request(app)
      .put(`/api/bookings/${bookingId}`)
      .set('Authorization', `Bearer ${learnerToken}`)
      .send({ status: 'confirmed' });

    console.log('Booking Update Response:', res.body);
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('confirmed');
  });

  it('should delete a booking', async () => {
    const res = await request(app)
      .delete(`/api/bookings/${bookingId}`)
      .set('Authorization', `Bearer ${learnerToken}`);

    console.log('Booking Deletion Response:', res.body);
    expect(res.statusCode).toBe(200);
  });
});
