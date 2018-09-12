class Scraper {
    private fetchOpt: any;
    protected FETCHED_DOCUMENT : Document;

    constructor(axiosOptions : any = {}){
        this.fetchOpt = axiosOptions;
    }

    protected async dispatchRequest(url: string) : Promise<void> {
        this.FETCHED_DOCUMENT = await fetch(url, this.fetchOpt)
        .then(this.checkResponse)
        .then(response => response.text())
        .then(text => new DOMParser().parseFromString(text, "text/html"))
        .catch(error => error)
    }

    private checkResponse(response: Response): Response {
        if(response.status > 299) {
            throw Error(`Error during the fetching of the url ${response.url}`);
        }
        return response;
    }
}

export default Scraper;