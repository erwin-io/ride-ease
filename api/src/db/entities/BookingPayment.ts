import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Booking } from "./Booking";

@Index("BookingPayment_pkey", ["bookingPaymentId"], { unique: true })
@Entity("BookingPayment", { schema: "dbo" })
export class BookingPayment {
  @PrimaryGeneratedColumn({ type: "bigint", name: "BookingPaymentId" })
  bookingPaymentId: string;

  @Column("character varying", { name: "BookingPaymentCode", nullable: true })
  bookingPaymentCode: string | null;

  @Column("character varying", { name: "PaymentMethod" })
  paymentMethod: string;

  @Column("numeric", { name: "Amount", default: () => "0" })
  amount: string;

  @Column("character varying", { name: "Status", default: () => "'ACTIVE'" })
  status: string;

  @ManyToOne(() => Booking, (booking) => booking.bookingPayments)
  @JoinColumn([{ name: "BookingId", referencedColumnName: "bookingId" }])
  booking: Booking;
}
