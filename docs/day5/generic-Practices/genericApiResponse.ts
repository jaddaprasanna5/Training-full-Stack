interface ApiResponse<T>{
    data:T;
    success:boolean;
    message:string;
}

type User = {id:number;name:string};
type Product = {id:number; title:string;price:number};

function getUserResponse():ApiResponse<User>{
        return {
            data:{id:1,name:"Prasanna"},
            success:true,
            message:"User Found"
        };
}

function getProductResponse():ApiResponse<Product>{
    return{
        data:{id:101,title:"Laptop",price:50000},
        success:true,
        message:"Product Found"
    };
}
console.log(getUserResponse());
console.log(getProductResponse());
