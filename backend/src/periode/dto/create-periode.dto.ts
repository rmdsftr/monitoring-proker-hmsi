import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePeriodeDto{
    @IsNotEmpty()
    @IsNumber()
    start_year:number;

    @IsNotEmpty()
    @IsNumber()
    end_year:number;
}