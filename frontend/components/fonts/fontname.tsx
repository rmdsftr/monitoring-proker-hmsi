import { Maname } from "next/font/google";
import { Poppins } from "next/font/google";

export const maname = Maname({
    weight: '400',
    subsets: ['latin'],
    variable: '--maname'
})

export const poppins = Poppins({
    subsets: ['latin'],
    variable: '--poppins',
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
})