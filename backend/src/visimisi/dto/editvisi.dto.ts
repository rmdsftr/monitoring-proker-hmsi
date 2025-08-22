import { IsNotEmpty, IsString } from "class-validator";

export class EditVisiDto{
    @IsNotEmpty()
    @IsString()
    visi:string;
}