import { ExpirationCompleteEvent, Publisher, Subjects } from "@mpticketz/common";


export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}