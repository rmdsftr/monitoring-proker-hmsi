import { IsNotEmpty, IsString } from "class-validator";
import { LoginDto } from "./login.dto";

export class NewPeriodLoginDto extends LoginDto{
    @IsNotEmpty()
    @IsString()
    id_periode:string;
}