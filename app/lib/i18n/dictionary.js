import 'server-only'
import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { headers } from "next/headers";

const dictionaries = {
    "pt-BR": () => import('./pt-BR.json').then((module) => module.default),
    "en-US": () => import('./en-US.json').then((module) => module.default),
    //es: () => import('./es.json').then((module) => module.default),
}

export const getDictionary = async () => {
    const h = headers()
    let languages = new Negotiator(h).languages()
    let locales = ['en-US', 'pt-BR']
    let defaultLocale = 'pt-BR'
    let lng = match(locales, languages, { defaultLocale })
   // try {
   //     return dictionaries[lng]();
   // } catch (error) {
        return dictionaries['pt-BR']();
    //}
}