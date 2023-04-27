// Fetching data with promise chaining

// function getData(){
//     document.getElementById("loader").style.display = "block";
//     setTimeout(()=>{
//         fetch("https://gauravgitacc.github.io/postAppData/auctionData.json")
//     .then(res => res.json())
//     .then((data)=>{
//        console.log("Data", data);
    
//        let innerHtml = "";
//        data.forEach(item => {
//         innerHtml += `
//         <div class="myDiv">
//            <h1>${item.status}</h1>
//            <h3>${item.caseNumber}</h3>
//         </div>
//         `
//        });
//        document.getElementById("container").innerHTML = innerHtml;
//        document.getElementById("loader").style.display = "none";
//     })
//     },1500);
//}

var arr = [];
// Fetching data with async-await
async function getDataFromAPI(){
    document.getElementById("loader").style.display = "block";
    const response = await fetch("https://gauravgitacc.github.io/postAppData/auctionData.json");
    arr = await response.json();
    sessionStorage.setItem("myArr", JSON.stringify(arr));
    if(arr){
        showData(arr);
              
        document.getElementById("loader").style.display = "none";
    }
}


if (sessionStorage.getItem("myArr")) {
  // user is coming again in the session
  //   alert("Getting from Session Storage");
  var myArr = JSON.parse(sessionStorage.getItem("myArr"));
  showData(myArr);
  arr = myArr;
} else {
  // user is coming to the session for the very first time
  getDataFromAPI();
}

document.getElementById("search").addEventListener("input", () => {
  var newArr = arr.filter((item) =>
    item.toLocation
      .toLowerCase()
      .includes(document.getElementById("search").value.trim().toLowerCase())
  );
  showData(newArr);
});


function showData(arr){
  document.getElementById("container").innerHTML ="";
  let innerHtml = "";
  arr.forEach(item => {
   innerHtml += `
   <div class="myDiv">
     <div class="flex-info">
       <div>
        <div class="chip ${
           item.status == "PENDING"
           ? "yellow"
           : item.status == "CANCELLED"
           ? "red"
           : ""
        }">${item.status}</div>
        <p>${item.caseNumber}</p>
       </div>
       <p>${item.date}</p>
     </div>
     <hr>
     <div>
       <strong>${item.fromLocation}</strong>
       <p>${item.toLocation} <div style="float : right;">${item.fare}</div></p>
     </div>
   </div>
   `
   document.getElementById("container").innerHTML = innerHtml;
  });
}