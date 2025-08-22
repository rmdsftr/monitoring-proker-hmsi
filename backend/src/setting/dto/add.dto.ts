import { tipe_fungsional_enum } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsString, IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class FungsionalItemDto {
    @IsString()
    @IsNotEmpty()
    id_fungsional: string;

    @IsEnum(tipe_fungsional_enum)
    kategori: tipe_fungsional_enum;
}

export class FungsionalArrayDto {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => FungsionalItemDto)
    data: FungsionalItemDto[];
}