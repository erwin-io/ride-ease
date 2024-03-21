import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Booking } from "./Booking";
import { BookingConversation } from "./BookingConversation";
import { Driver } from "./Driver";
import { Notifications } from "./Notifications";
import { Passenger } from "./Passenger";
import { UserOneSignalSubscription } from "./UserOneSignalSubscription";
import { UserProfilePic } from "./UserProfilePic";
import { Access } from "./Access";

@Index("u_user_number", ["active", "password"], { unique: true })
@Index("u_username", ["active", "userName"], { unique: true })
@Index("pk_users_1557580587", ["userId"], { unique: true })
@Entity("Users", { schema: "dbo" })
export class Users {
  @PrimaryGeneratedColumn({ type: "bigint", name: "UserId" })
  userId: string;

  @Column("character varying", { name: "UserName" })
  userName: string;

  @Column("character varying", { name: "Password" })
  password: string;

  @Column("boolean", { name: "AccessGranted" })
  accessGranted: boolean;

  @Column("boolean", { name: "Active", default: () => "true" })
  active: boolean;

  @Column("character varying", { name: "UserCode", nullable: true })
  userCode: string | null;

  @Column("character varying", { name: "UserType" })
  userType: string;

  @OneToMany(() => Booking, (booking) => booking.passengerUser)
  bookings: Booking[];

  @OneToMany(
    () => BookingConversation,
    (bookingConversation) => bookingConversation.fromUser
  )
  bookingConversations: BookingConversation[];

  @OneToMany(
    () => BookingConversation,
    (bookingConversation) => bookingConversation.toUser
  )
  bookingConversations2: BookingConversation[];

  @OneToMany(() => Driver, (driver) => driver.user)
  drivers: Driver[];

  @OneToMany(() => Notifications, (notifications) => notifications.user)
  notifications: Notifications[];

  @OneToMany(() => Passenger, (passenger) => passenger.user)
  passengers: Passenger[];

  @OneToMany(
    () => UserOneSignalSubscription,
    (userOneSignalSubscription) => userOneSignalSubscription.user
  )
  userOneSignalSubscriptions: UserOneSignalSubscription[];

  @OneToOne(() => UserProfilePic, (userProfilePic) => userProfilePic.user)
  userProfilePic: UserProfilePic;

  @ManyToOne(() => Access, (access) => access.users)
  @JoinColumn([{ name: "AccessId", referencedColumnName: "accessId" }])
  access: Access;
}
