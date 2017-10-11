class Api {
    static URL = `https://api.stubhub.com`;
    static PROD_TOKEN = `7c1fedcd-ec63-3e4a-9cc3-00e12d9b34af`;
    static APP_TOKEN = `900fcbaf-7526-3d39-9aec-30e1c241b7da`;

    static events(city = "San Francisco") {
        return fetch(
            `${Api.URL}/search/catalog/events/v3?status=active |contingent&city="${city}"&rows=200`,
            {
                headers: {
                    Authorization: `Bearer ${Api.PROD_TOKEN}`
                }
            }
        ).then(res => res.json());
    }
}

export default Api;
