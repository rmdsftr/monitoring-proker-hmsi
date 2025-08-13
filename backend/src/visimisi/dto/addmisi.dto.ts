import { IsNotEmpty, IsString } from "class-validator";

export class AddMisiDto{
    @IsNotEmpty()
    @IsString()
    misi:string;
}