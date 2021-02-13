console.log("Loading common.js...");

const tableBody = document.getElementsByTagName("tbody")[0];

const getDataModern = async () => {
    const data = await fetch("http://wsp3.course.tamk.cloud/api/v1/random");
    const dataJson = await data.json();
    var imgLink = JSON.parse(JSON.stringify(dataJson)).recipes[0].image;
    var recName = JSON.parse(JSON.stringify(dataJson)).recipes[0].title;
    var recSumm = JSON.parse(JSON.stringify(dataJson)).recipes[0].summary;
    var recLink = JSON.parse(JSON.stringify(dataJson)).recipes[0].sourceUrl;
    var recIng = JSON.parse(JSON.stringify(dataJson)).recipes[0].extendIngredients;
    var recInst = JSON.parse(JSON.stringify(dataJson)).recipes[0].instructions;

    console.log("dataJson", dataJson);
    console.log("image link", imgLink);
    console.log("Ingredients array", recIng);
    document.getElementById("recipe_img").src = imgLink;
    document.getElementById("recipeName").innerHTML = recName;
    document.getElementById("recipeSummary").innerHTML = recSumm;
    document.getElementById("recipeLink").href = recLink;
    document.getElementById("recipeInstructions").innerHTML = recInst;

    var length = JSON.parse(JSON.stringify(dataJson)).recipes[0].extendedIngredients.length;
    var ingName = [];
    var ingAmount = [];
    var ingUnit = [];
    for(var i =0; i < length; i++){
        ingName[i] = JSON.parse(JSON.stringify(dataJson)).recipes[0].extendedIngredients[i].name;
        ingAmount[i] = JSON.parse(JSON.stringify(dataJson)).recipes[0].extendedIngredients[i].amount;
        ingUnit[i] = JSON.parse(JSON.stringify(dataJson)).recipes[0].extendedIngredients[i].unit;
    }
    var result = "<table border=1>";
    for(var i =0; i < length; i++){
        result+="<tr>";
        result += "<td>"+ingName[i]+"</td>";
        result += "<td>"+ingAmount[i]+"</td>";
        result += "<td>"+ingUnit[i]+"</td>";
        result+="</tr>";
    }
    result += "</table>";
    document.getElementById("ingEntry").innerHTML = result;
    console.log("Table output:", result);
};
getDataModern();
