import { OrderCancelledEvent, Publisher, Subjects } from "@mpticketz/common";


export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent>{
  readonly subject = Subjects.OrcerCancelled;
}

