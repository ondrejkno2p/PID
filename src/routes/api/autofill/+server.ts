import { options, url_departure_board } from "$lib/server/golem";
import {stop_names} from '$lib/server/get_all_stops'
import type { RequestHandler } from "@sveltejs/kit";

const DIAKRITIKA = [
    "áäčďéěíĺľňóôöŕšťúůüýřžÁÄČĎÉĚÍĹĽŇÓÔÖŔŠŤÚŮÜÝŘŽ",
    "aacdeeillnooorstuuuyrzAACDEEILLNOOORSTUUUYRZ"
    ];

const cz_to_en =(str_cz:string) => {
    let str_en='';
    for(let i = 0; i < str_cz.length; i++){
        const j = DIAKRITIKA[0].indexOf(str_cz.charAt(i));
        if (j!==-1){
            str_en += DIAKRITIKA[1].charAt(j);
        }
        else{
            str_en += str_cz.charAt(i);
        }
    }
    return str_en;
}


export const GET:RequestHandler=(async ({url, setHeaders}) => {
    setHeaders({"cache-control":"max-age=24*60*60"})
    let search_name = url.searchParams.get('search_name') as string;
    let result_names:Array<string>=[];
    const search_name_red = cz_to_en(search_name).replace(/[\s,.-]/g, '').toLowerCase();
    stop_names.forEach((stop_name:string) => {
        if (cz_to_en(stop_name).replace(/[\s,.-]/g, '').toLowerCase().startsWith(search_name_red)) {
                result_names = [...result_names, stop_name];
        }
    });
    return new Response(JSON.stringify(result_names),{status:200});
}) satisfies RequestHandler;