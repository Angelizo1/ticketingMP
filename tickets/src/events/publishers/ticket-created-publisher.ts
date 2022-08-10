import { Publisher, Subjects, TicketCreatedEvent } from "@mpticketz/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
