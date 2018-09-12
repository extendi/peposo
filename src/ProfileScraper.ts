import Scraper from '@lib/Scraper';


class ProfileScraper extends Scraper{
    private BASE_URL = 'https://www.instagram.com';
    constructor(profileName : string){
        super();
        this.dispatchRequest(`${this.BASE_URL}/${profileName}`)
    }

    getDoc(){
        return this.FETCHED_DOCUMENT;
    }
}

export default ProfileScraper;