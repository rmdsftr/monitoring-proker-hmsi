import { IsNotEmpty, IsString } from "class-validator";

export class CreatePeriodeDto{
    @IsNotEmpty()
    @IsString()
    start_year:string;

    @IsNotEmpty()
    @IsString()
    end_year:string;
}