export let redirect=(header,type)=>{
    let redirect = "/"
        if(type=="hr"){
            redirect="/hr"
            if(!header){
                redirect+="-info";
            }
        }else{
            redirect="/dr"
            if(!header){
                redirect+="-info";
            }
        }
    return redirect;
}