import { OrderList, OrderTrackingEntity } from "./order.entity";

export class OrderState {
  orderList: OrderList = { total: 0, data: [] };
  orderFilter: OrderList = { total: 0, data: [] };
  trackingActive: OrderTrackingEntity[] = [];
}
