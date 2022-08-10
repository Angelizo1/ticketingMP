import mongoose from "mongoose";
import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";

it('returns a 404 if the ticket is not found', async() => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app).post(`/api/tickets/${id}`).send({})
  .expect(404);
});
it('returns the ticket if the ticket is found', async() => {
  const title = 'concert';
  const price = 20;

  const resp = await request(app).post('/api/tickets')
  .set('Cookie', global.signin())
  .send({
    title,price
  })
  .expect(201);

  const ticketResponse = await request(app).get(`/api/tickets/${resp.body.id}`)
    .send()
    .expect(200)

  
});