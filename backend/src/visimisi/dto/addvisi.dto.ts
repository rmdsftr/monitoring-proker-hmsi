import { IsNotEmpty, IsString } from "class-validator";

export class AddVisiDto{
    @IsNotEmpty()
    @IsString()
    visi:string;
}