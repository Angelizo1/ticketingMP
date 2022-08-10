import { natsWrapper } from "../../../nats-wrapper";
import { TicketCreatedEvent } from '@mpticketz/common';
import mongoose from "mongoose";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../../models/ticket";
import { TicketUpdatedListener } from "../ticket-updated-listener";

const setup = async() => {
  // create an instance of the listener
  const listener = new TicketUpdatedListener(natsWrapper.client);
  // create a fake data event
  const ticket = Ticket.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'concert',
    price: 20
  })
  // create a fake msg object 
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn()
  }

  return { listener, data, msg };
};

it('finds, updates, and saves a ticket', async () => {
  const { listener, data, msg } = await setup();
  // call the onMessage func with the data obj + message obj
  await listener.onMessage(data, msg);
  // write assertions to make sure the ticket was created
  const ticket = await Ticket.findById(data.id);

  expect(ticket).toBeDefined();
  expect(ticket!.title).toEqual(data.title);
  expect(ticket!.price).toEqual(data.price);
});

it('acks the message', async () => {
  const { listener, data, msg } = await setup();

  // call the onMessage func with the data obj + message obj
  await listener.onMessage(data, msg);

  // write assertions to make sure ack func is called

  expect(msg.ack).toHaveBeenCalled();
});