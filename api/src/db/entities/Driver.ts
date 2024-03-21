import {
  Column,
  Entity,
  Index,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./Users";
import { Vehicle } from "./Vehicle";

@Index("u_Driver", ["active", "driverId"], { unique: true })
@Index("u_Driver_UserId", ["active", "driverId", "userId"], { unique: true })
@Index("Driver_pkey", ["driverId", "userId"], { unique: true })
@Index("u_driver_user", ["driverId", "userId"], {})
@Entity("Driver", { schema: "dbo" })
export class Driver {
  @PrimaryGeneratedColumn({ type: "bigint", name: "DriverId" })
  driverId: string;

  @Column("character varying", { name: "DriverCode", nullable: true })
  driverCode: string | null;

  @Column("character varying", { name: "Name" })
  name: string;

  @Column("character varying", { name: "MobileNumber" })
  mobileNumber: string;

  @Column("character varying", { name: "Address" })
  address: string;

  @Column("character varying", { name: "CompanyId" })
  companyId: string;

  @Column("character varying", { name: "LicenseNumber" })
  licenseNumber: string;

  @Column("bigint", { primary: true, name: "UserId" })
  userId: string;

  @Column("boolean", { name: "Active", default: () => "true" })
  active: boolean;

  @Column("numeric", { name: "WalletBalance", default: () => "0" })
  walletBalance: string;

  @ManyToOne(() => Users, (users) => users.drivers)
  @JoinColumn([{ name: "UserId", referencedColumnName: "userId" }])
  user: Users;

  @ManyToMany(() => Vehicle, (vehicle) => vehicle.drivers)
  @JoinTable({
    name: "DriverVehicle",
    joinColumns: [{ name: "DriverId", referencedColumnName: "driverId" }],
    inverseJoinColumns: [
      { name: "VehicleId", referencedColumnName: "vehicleId" },
    ],
    schema: "dbo",
  })
  vehicles: Vehicle[];
}
