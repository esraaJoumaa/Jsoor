export const useGlobalStore=defineStore('globalStore',()=>{
    const token =ref('')
    const role=ref('')
    const user_id=ref('')

    return {token,role,user_id}
},{
    persist:{
        pick:['token','role','user_id']
    }
})