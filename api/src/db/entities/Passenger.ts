import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./Users";

@Index("u_passenger_user", ["passengerId", "userId"], { unique: true })
@Index("Passenger_pkey", ["passengerId", "userId"], { unique: true })
@Entity("Passenger", { schema: "dbo" })
export class Passenger {
  @PrimaryGeneratedColumn({ type: "bigint", name: "PassengerId" })
  passengerId: string;

  @Column("character varying", { name: "PassengerCode", nullable: true })
  passengerCode: string | null;

  @Column("character varying", { name: "Name" })
  name: string;

  @Column("character varying", { name: "MobileNumber" })
  mobileNumber: string;

  @Column("bigint", { primary: true, name: "UserId" })
  userId: string;

  @Column("boolean", { name: "Active", default: () => "true" })
  active: boolean;

  @ManyToOne(() => Users, (users) => users.passengers)
  @JoinColumn([{ name: "UserId", referencedColumnName: "userId" }])
  user: Users;
}
