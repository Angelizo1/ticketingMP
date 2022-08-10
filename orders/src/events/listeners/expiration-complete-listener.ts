import { ExpirationCompleteEvent, Listener, OrderStatus, Subjects } from "@mpticketz/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "../../../../expiration/src/events/listeners/queue-group-name";
import { } from "../../../../expiration/src"
import { Order } from "../../models/order";
import { OrderCancelledPublisher } from "../publishers/order-cancelled-publisher";

export class ExpirationCompleteListener extends Listener<ExpirationCompleteEvent> {
  
  queueGroupName = queueGroupName;
  readonly subject = Subjects.ExpirationComplete;

  async onMessage(data: ExpirationCompleteEvent['data'], msg: Message) {
    const order = await Order.findById(data.orderId).populate('ticket');

    if(!order){
      throw new Error('Order not Found')
    }

    if(order.status === OrderStatus.Complete){
      return msg.ack();
    }

    order.set({
      status: OrderStatus.Cancelled,
    });

    await order.save();

    await new OrderCancelledPublisher(this.client).publish({
      id: order.id,
      version: order.version,
      ticket: {
        id: order.ticket.id 
      }
    });

    msg.ack();
  }
}