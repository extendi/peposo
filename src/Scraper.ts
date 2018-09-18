import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';

type FetchedDocuments = {
    [identifier : string] : Document,
}

class Scraper {
    private axiosOpt: AxiosRequestConfig;
    protected FETCHED_DOCUMENTS : FetchedDocuments = {};

    constructor(axiosOptions : AxiosRequestConfig = {}){
        this.axiosOpt = axiosOptions;
    }

    protected async dispatchRequest(url: string, identifier: string) : Promise<Document> {
        this.FETCHED_DOCUMENTS[identifier] = await axios(url, this.axiosOpt)
        .then(this.checkResponse)
        .then(response => response.data)
        .then(text => new DOMParser().parseFromString(text, "text/html"))
        .catch(error  => { 
            console.error(error);
            throw Error(`Peposo encountered some error during the http request`);
        });
        return this.FETCHED_DOCUMENTS[identifier];
    }

    private checkResponse(response: AxiosResponse): AxiosResponse {
        if(response.status > 299) {
            throw Error(`Error during the fetching of the url ${response.config.url}`);
        }
        return response;
    }
}

export default Scraper;