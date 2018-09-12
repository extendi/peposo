import ProfileScraper from '@lib/ProfileScraper';

export const PROFILE = 'profile';

const availableScrapers : { [key : string]: any } = {
    [PROFILE]: ProfileScraper,
};

const Peposo = (scrapingType : string, ...args : Array<any>) => {
    if(!scrapingType || !availableScrapers[scrapingType]) throw Error('You have selected an invalid scraper.');
    return new availableScrapers[scrapingType](...args);
}   

export default Peposo;