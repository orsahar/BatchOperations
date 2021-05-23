
/**
 * Utils Module: helper funcitons only
 */
module.exports = {
    /**
     * 
     * @param {*} url as template(template slots are fiven with "{XXXX}")
     * @param {*} payload (values to map from template)
     * @returns corrcted url accordingly to url and given payload: url:"http://my.url.com/path/{XXXX}",payload:"{XXXX:2}"=> "http://my.url.com/path/2"
     */
    endpointCorrector:  (url, payload)=>{
        
        let correctedUrl = url
        Object.keys(payload).forEach(key=>{
            let template = "{"+key+"}";
            correctedUrl = correctedUrl.replace(template, payload[key]);
        })
        return correctedUrl;
    }
}