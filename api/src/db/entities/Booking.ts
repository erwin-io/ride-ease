import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./Users";
import { Vehicle } from "./Vehicle";
import { BookingConversation } from "./BookingConversation";
import { BookingPayment } from "./BookingPayment";

@Index("Booking_pkey", ["bookingId"], { unique: true })
@Entity("Booking", { schema: "dbo" })
export class Booking {
  @PrimaryGeneratedColumn({ type: "bigint", name: "BookingId" })
  bookingId: string;

  @Column("character varying", { name: "BookingCode", nullable: true })
  bookingCode: string | null;

  @Column("character varying", { name: "DestinationAddress" })
  destinationAddress: string;

  @Column("json", { name: "DestinationMap" })
  destinationMap: object;

  @Column("character varying", { name: "PickupAddress" })
  pickupAddress: string;

  @Column("json", { name: "PickupMap" })
  pickupMap: object;

  @Column("timestamp with time zone", { name: "DateTimeBooked" })
  dateTimeBooked: Date;

  @Column("timestamp with time zone", {
    name: "DateTimePickUp",
    nullable: true,
  })
  dateTimePickUp: Date | null;

  @Column("timestamp with time zone", { name: "DateTimeArrived" })
  dateTimeArrived: Date;

  @Column("numeric", { name: "BookingAmount", default: () => "0" })
  bookingAmount: string;

  @Column("numeric", { name: "OtherCharges" })
  otherCharges: string;

  @Column("numeric", { name: "TotalBookingAmount", default: () => "0" })
  totalBookingAmount: string;

  @Column("character varying", { name: "Status", default: () => "'PENDING'" })
  status: string;

  @ManyToOne(() => Users, (users) => users.bookings)
  @JoinColumn([{ name: "PassengerUserId", referencedColumnName: "userId" }])
  passengerUser: Users;

  @ManyToOne(() => Vehicle, (vehicle) => vehicle.bookings)
  @JoinColumn([{ name: "VehicleId", referencedColumnName: "vehicleId" }])
  vehicle: Vehicle;

  @OneToMany(
    () => BookingConversation,
    (bookingConversation) => bookingConversation.booking
  )
  bookingConversations: BookingConversation[];

  @OneToMany(() => BookingPayment, (bookingPayment) => bookingPayment.booking)
  bookingPayments: BookingPayment[];
}
