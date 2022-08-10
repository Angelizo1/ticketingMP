import { Publisher, Subjects, TicketUpdatedEvent } from "@mpticketz/common";
import { natsWrapper } from "../../nats-wrapper";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}

// new TicketUpdatedPublisher(natsWrapper.client).publish({
  
// });