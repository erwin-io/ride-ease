import { ApiProperty } from "@nestjs/swagger";
import { Transform, Type } from "class-transformer";
import {
  IsNotEmpty,
  IsNumberString,
  ArrayNotEmpty,
  IsArray,
  ValidateNested,
  IsBooleanString,
  IsDateString,
  IsEmail,
  IsIn,
  IsOptional,
  IsUppercase,
  Matches,
} from "class-validator";
import { DefaultPassengerDto } from "./passenger-base.dto";


export class UpdatePassengerDto extends DefaultPassengerDto {

}


export class UpdatePassengerProfileDto extends DefaultPassengerDto {
  @ApiProperty()
  @IsOptional()
  userProfilePic: any;
}