import { Injectable, InternalServerErrorException } from "@nestjs/common";
import { createClient, SupabaseClient } from "@supabase/supabase-js";

@Injectable()
export class SupabaseService{
    private supabase: SupabaseClient;

    constructor(){
        const supabaseUrl = process.env.SUPABASE_URL;
        const supabaseKey = process.env.SUPABASE_KEY;

        console.log("SUPABASE KEY : ", supabaseKey);
        console.log("SUPABASE URL : ", supabaseUrl);

        if(supabaseKey && supabaseUrl){
            this.supabase = createClient(supabaseUrl, supabaseKey);
        }
    }

    async uploadToSupabase(bucket:string, path:string, file: Express.Multer.File){
        const { data, error } = await this.supabase.storage
            .from(bucket)
            .upload(path, file.buffer, {
                contentType: file.mimetype,
                upsert: true
            })

        if(error) throw error;
        return data;
    }

    getPublicUrl(bucket:string, path:string){
        return this.supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl;
    }

    async getImage(bucket: string, path: string) {
        const { data, error } = await this.supabase.storage.from(bucket).download(path);
        if (error) throw error;
        return data; 
    }
}