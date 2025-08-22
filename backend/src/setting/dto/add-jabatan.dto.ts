import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsNotEmpty, IsString, ValidateNested } from "class-validator";

export class JabatanItemDto{
    @IsString()
    @IsNotEmpty()
    id_jabatan:string;

    @IsBoolean()
    is_inti:boolean;

    @IsBoolean()
    is_presidium:boolean;
}

export class JabatanArrayDto{
    @IsArray()
    @ValidateNested({each:true})
    @Type(() => JabatanItemDto)
    data: JabatanItemDto[];
}