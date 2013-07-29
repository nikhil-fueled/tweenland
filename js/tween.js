// returns a copy of array source
function copyArray(source) {
	var copy = new Array();
	var len = source.length;
	for (var i = 0; i < len; i++) {
		copy[copy.length] = source[i];
	}
	return copy;
}

// returns an array populated with integers 1..n
function integerArray(n) {
	var arr = new Array();
	for (var i=0; i < n; i++) {
		arr[arr.length] = i;
	}
	return arr;
}

// clears the browser page
// note: will fail if page contains no data
function clearPage() {
	document.getElementsByTagName("body")[0].innerHTML = "";
}

// returns a 0 indexed array with one element for every line of data in filepath
function loadFileIntoArray(filepath) {
	if (window.XMLHttpRequest)
	{
		var xhttp = new XMLHttpRequest();
	}
	else // Internet Explorer 5/6
	{
		var xhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}
	xhttp.open("GET",filepath,false);
	xhttp.send("null");
	var data = xhttp.responseText;

	var re = new RegExp("^.*$", "mg");

	var dataArray = data.match(re);

	return dataArray;
}

// prints an array to the webpage - omits any undefined or null elements
function writeArray(source) {
	for (var i=0; i < source.length; i++) {
		if (source[i] != undefined && source[i] != null) {
			document.write(i + ": " + source[i] + "<br />");
		}
	}

}

// returns an array containing the indices of elements in source and target that differ
// and optionally writes the output to the page
// assumes source.length == target.length
function compareArrays(source, target, print) {
	var diff = new Array();

	for (var i=0; i < source.length; i++) {
		if (source[i] != target[i]) {
			diff[diff.length] = i;
		}
	}

	if (print) {
		var diffPrint = new Array();
		for (var i=0; i < diff.length; i++) {
			diffPrint[diff[i]] = [source[diff[i]], target[diff[i]]];
		}
		writeArray(diffPrint);
	}

	return diff;

}
function findRelative(source){
	var relation= new Array();
	var count;
	for (var i=0 ; i<source.length; i++){
		 count=0;
		var relative= new Array();
		for(var j=0; j<source.length; j++){
			if(i!=j){
				var diff= compareArrays(source[i], source[j]);
				var fraction= diff.length/source.length;
				if(fraction<=0.245){
					relative[count]= j;
					count++;
				}
			}
		}
		relation[i]=relative;
	}
	//writeArray(relation);
	return relation;
}
function calculateTerminalChildren(source){
	var relation= new Array();
	var count=0;
	/*var pos=0;
	for (var i=0 ; i<source.length; i++){
		 count=0;
		var relative= new Array();
		for(var j=0; j<source.length; j++){
			if(i!=j){
				var diff= compareArrays(source[i], source[j]);
				var fraction= diff.length/source.length;
				if(fraction<=0.245){
					relative[count]= j;
					count++;
				}
			}
		}
		if(count==1){
			relation[pos]=relative[0];
			pos++;
		}
	}
	//writeArray(relation);
	return relation;*/
	var tc= new Array();
	for(var i=0; i<source.length; i++){

		if(source[i]!=null && source[i].length==1 ){
			tc[count]=i;
			count++;
		}
	}
	return tc;
}
function main(){
	var a = new Array();
	var rel=0;
	a= loadFileIntoArray('tweens600.txt');
	var relation= new Array();
	relation= findRelative(a);
	var fatherChild= new Array();
	var tc=new Array();
	/*while(1){
		tc= calculateTerminalChildren(a);
	}*/
	tc = calculateTerminalChildren(relation);
	var i=0;
	var count=0;
	var nulla=0;
	//writeArray(relation);
	while(relation.length>count){
	//while(count<400){
		/*
		 	show the father son relation
			from relations, remove them
		*/
		console.log(i, tc[i], relation[tc[i]]);
		var dad= parseInt(relation[tc[i]]);
		fatherChild[dad]=tc[i];
		console.log("----Father child----", fatherChild);


		if(relation[dad]!=null){
			var childIndex=relation[dad].indexOf(tc[i]);
			relation[dad].splice(childIndex,1);

			count++;
			console.log(nulla);
			nulla=0;// remove after errors fixed
		}
		else{   //remove after errors fixed
			nulla++;
			console.log(tc[i], tc+ "is son");
			console.log(dad, relation + "is dad");
		}
		if(nulla>300){
			console.log(relation);
			console.log(relation.length, count);
			console.log(tc);
			//return;
		}
		if(i==tc.length){
			console.log("Generated new list of terminal children");
			tc=[];
			tc=calculateTerminalChildren(relation);
			console.log(tc);
			i=0;
		}
	console.log(relation[tc[i]] + " is the relation of the child that will be removed -----------");
	relation[tc[i]]=null;
	i++;
	}

	document.write("---------------------");
	writeArray(relation);
	writeArray(fatherChild);
	return;
}
