import Scraper from '@lib/Scraper';
import { AxiosRequestConfig } from 'axios';

type ProfileCache = {
    [username : string] : any,
}

export type ProfileResponse = {
    username: string,
    bio: string,
    fullName: string,
    id: string,
    profilePicUrl: string,
    followers: number,
    following: number,
    businessEmail?: string,
    rawResponse: any,
}

class ProfileScraper extends Scraper{
    private BASE_URL = 'https://www.instagram.com';
    private RESPONSE_CACHE : ProfileCache = {};
    private SHARED_DATA_REGEXP : RegExp = /^window._sharedData = /;

    constructor(axiosOptions: AxiosRequestConfig){
        super(axiosOptions)
    }

    private extractProfileInfo(profileDocument: Document) : ProfileResponse{
        const rawgraphqlResponse = Array.from(profileDocument.scripts)
        .find(s => s.text.startsWith('window._sharedData = '))
        .text.replace(this.SHARED_DATA_REGEXP, '')
        .replace(/;$/, '')
        const parsedGraphqlReponse = JSON.parse(rawgraphqlResponse)
        const userGrapqlResponse = parsedGraphqlReponse.entry_data.ProfilePage[0].graphql.user;
        return {
            username: userGrapqlResponse.username,
            id: userGrapqlResponse.id,
            followers: userGrapqlResponse.edge_followed_by.count,
            following: userGrapqlResponse.edge_follow.count,
            businessEmail: userGrapqlResponse.business_email || '',
            fullName: userGrapqlResponse.full_name,
            bio: userGrapqlResponse.biography || '',
            profilePicUrl: userGrapqlResponse.profile_pic_url || '',
            rawResponse: parsedGraphqlReponse,
        }
    }
    public async getProfileInfo(username: string) : Promise<ProfileResponse>{
        if (this.RESPONSE_CACHE[username]){
            return this.RESPONSE_CACHE[username];
        }
        const fetchedDocument = await this.dispatchRequest(`${this.BASE_URL}/${username}`, username)
        this.RESPONSE_CACHE[username] = this.extractProfileInfo(fetchedDocument);
        return this.RESPONSE_CACHE[username];
    }
}

export default ProfileScraper;