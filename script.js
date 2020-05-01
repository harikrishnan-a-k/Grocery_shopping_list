// const checkAndParse=(response)=>{
//     if(!response.ok){
//         throw new Error(`  error status:${response.status}`);
//     }
//     return response.json();
// };
// const print=(data)=>{
//     console.log(data);
// }
// fetch('groceries.json')
// .then(checkAndParse)
// .then(print)
// .catch((err)=>{
//     console.log(`Failed to load data  : ${err}`);
// })
function getRelevantData(arr,category){
    return arr.filter((el)=>{ return el.department===category});
}
async function getGroceryList(e){
    try{
        const res=await axios.get('groceries.json');
        
        let groceries=res.data;
        console.log(e.target.value);
        let relevantData=e.target.value==='all'?groceries:getRelevantData(groceries,e.target.value);
        console.log(relevantData);
        let tableData=``;
        relevantData.forEach((el)=>{
            tableData +=`<tr>
            <td data-th="SI NO.">${el.siNo}</td>
            <td data-th="NAME">${el.name}</td>
            <td data-th="QUANTITY">${el.quantity}</td>
            <td data-th="UNIT">${el.unit}</td>
            <td data-th="DEPARTMENT">${el.department}</td>
            <td data-th="NOTES">${el.notes}</td>
        </tr>`;
        });
        const tableContents=document.querySelector('#tableContents');
        tableContents.innerHTML=tableData;
        groceriesTable=document.querySelector('#groceriesTable');
        groceriesTable.classList.remove('hidden');


    }
    catch(err){
        console.log('error occured:',err);
    }
    
}
document.querySelector('#category').addEventListener('input',getGroceryList);
document.querySelector('#category').addEventListener('input',(e)=>{
if(!e.target.value){
        groceriesTable=document.querySelector('#groceriesTable');
        groceriesTable.classList.add('hidden');
}
});
//getGroceryList();