import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Booking } from "./Booking";
import { Users } from "./Users";

@Index("BookingConversation_pkey", ["bookingConversationId"], { unique: true })
@Entity("BookingConversation", { schema: "dbo" })
export class BookingConversation {
  @PrimaryGeneratedColumn({ type: "bigint", name: "BookingConversationId" })
  bookingConversationId: string;

  @Column("character varying", { name: "Message" })
  message: string;

  @Column("timestamp with time zone", { name: "DateTime" })
  dateTime: Date;

  @Column("character varying", { name: "Status", default: () => "'ACTIVE'" })
  status: string;

  @Column("boolean", { name: "Active", default: () => "true" })
  active: boolean;

  @ManyToOne(() => Booking, (booking) => booking.bookingConversations)
  @JoinColumn([{ name: "BookingId", referencedColumnName: "bookingId" }])
  booking: Booking;

  @ManyToOne(() => Users, (users) => users.bookingConversations)
  @JoinColumn([{ name: "FromUserId", referencedColumnName: "userId" }])
  fromUser: Users;

  @ManyToOne(() => Users, (users) => users.bookingConversations2)
  @JoinColumn([{ name: "ToUserId", referencedColumnName: "userId" }])
  toUser: Users;
}
