import { IsNotEmpty, IsString } from "class-validator";

export class AddNewKahim{
    @IsNotEmpty()
    @IsString()
    nama:string;

    @IsNotEmpty()
    @IsString()
    panggilan:string;

    @IsNotEmpty()
    @IsString()
    nohima:string;

    @IsNotEmpty()
    @IsString()
    nim:string;
}