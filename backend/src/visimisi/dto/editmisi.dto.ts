import { IsNotEmpty, IsString } from "class-validator";

export class EditMisiDto{
    @IsNotEmpty()
    @IsString()
    misi:string;
}