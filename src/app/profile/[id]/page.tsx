

export default function page({params}:any){
    return <div 
   className="flex flex-col  justify-center items-center 
        min-h-screen py-2" >

        <h1>Profile</h1>
        <h2
         className="bg-green-500  mt-4 hover:bg-green-700 text-white 
         font-bold  py-2 px-2 rounded"
        > {params.id}</h2>
    </div>
}