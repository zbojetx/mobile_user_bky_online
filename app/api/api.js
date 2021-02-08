import axios from 'axios'

const endpoint = 'http://192.168.100.96:6789'
//const endpoint = 'https://api-bky.dinartech.com'


export const get_all = async(url) => {
    let data = []
    await axios.get(`${endpoint}${url}`)
    .then(res => {
        data = res.data
    })

    return(data)
}

export const get_all_by_id = async(url, id) => {
    let data = []
    await axios.get(`${endpoint}${url}/${id}`,{
        headers: {
            'x-api-key' : 'web-client'
        }
    })
    .then(res => {
        data = res
    })

    return(data)
}

export const get_all_post = async(url, datas) => {
    let data = []
    console.log(datas.keyword)
    await axios.post(`${endpoint}${url}`,{
        'keyword': datas.keyword
    },{
        headers: {
            'x-api-key' : 'web-client'
        }
    })
    .then(res => {
        data = res
    })

    return(data)
}

export async function uploadsinglefile(fd, URL){
    let status = 0
    await axios
    .post(`${endpoint}/${URL}`,fd)
    .then(res => {
        if (res.data.kode === 1){
            status = 1
        }else{
            status = 2
        }
    })
    return status;
}

export async function loginPost(fd, URL){
    let status = []
    await axios
    .post(`${endpoint}/${URL}`,fd)
    .then(res => {
        if (res.data.kode === 1){
            status = {
                status : 1,
                datas : res.data
            }
        }else{
            status = {
                status : 2,
            }
        }
    })
    return status;
}
