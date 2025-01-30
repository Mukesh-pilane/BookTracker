export const getApiQuery = (payload) => {
    if(!payload){
        return ""
    }
    const key = Object.keys(payload)
    let url = []
    key.forEach((k) => {
        if(payload[k]!="" && payload[k]!=undefined && payload[k]!=null){
            url.push(`${k}=${payload[k]}`)
        }
    })
    url = url.join('&')
    url = url ? `?${url}` : ''
    return url
}