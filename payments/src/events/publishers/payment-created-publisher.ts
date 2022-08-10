import { Publisher, Subjects, PaymentCreatedEvent } from "@mpticketz/common";


export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent>{
  readonly subject = Subjects.PaymentCreated;
}