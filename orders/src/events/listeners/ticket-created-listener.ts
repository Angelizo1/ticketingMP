import { Listener, Subjects, TicketCreatedEvent } from "@mpticketz/common";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/ticket";
import { queueGroupName } from "./queue-group-name";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: TicketCreatedEvent['data'], msg: Message){
    const { id, title, price } = data;
    const ticket = Ticket.build({  //Remember all of them have their own local
      id,title, price              //DB of mongo, so he also needs to save it 
    });

    await ticket.save();

    msg.ack();//Importantisimo
  }
}