import Axios from 'axios';
import  {BrowserRouter} from 'react-router-dom';
let router = new BrowserRouter();
Axios.interceptors.request.use(config=>{
    let pathname = location.pathname;
    if(window.localStorage.getItem('token')){
        if(pathname!='login'){
            config.headers.common['token'] = window.localStorage.getItem('token');
        }
    }else{
        console.log('token不存在');
    }
    return config;
})
Axios.interceptors.response.use(response=>{
    return response;
},error=>{
    if(error.response){
        switch(error.response.status){
            case 401:
                window.localStorage.removeItem('token');
                router.push('/login');
        }
    }
})
export default Axios;