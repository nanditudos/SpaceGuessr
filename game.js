function generateImageURL(input) {
	if (input[0]=="Voyager ISS") {
		return "https://opus.pds-rings.seti.org/holdings/previews/" + input[7].slice(0,7)+ "xxx/" + input[7].slice(0,-7) + "full.jpg";
	}
	if (input[0]=="Galileo SSI") {
		return "https://opus.pds-rings.seti.org/holdings/previews/" + input[7].slice(0,4)+ "xxx/" + input[7].slice(0,-4) + "_full.jpg";
	}
	if (input[0]=="Hubble WFPC2") {
		return "https://opus.pds-rings.seti.org/holdings/previews/" + input[7].slice(0,4)+ "x_xxxx/" + input[7].slice(0,-4) + "_full.jpg";
	}
	if (input[0]=="Hubble ACS") {
		return "https://opus.pds-rings.seti.org/holdings/previews/" + input[7].slice(0,4)+ "x_xxxx/" + input[7].slice(0,-4) + "_full.jpg";
	}
	if (input[0]=="Hubble NICMOS") {
		return "https://opus.pds-rings.seti.org/holdings/previews/" + input[7].slice(0,4)+ "x_xxxx/" + input[7].slice(0,-4) + "_full.jpg";
	}
	if (input[0]=="Hubble STIS") {
		return "https://opus.pds-rings.seti.org/holdings/previews/" + input[7].slice(0,4)+ "x_xxxx/" + input[7].slice(0,-4) + "_full.jpg";
	}
	if (input[0]=="Hubble WFC3") {
		return "https://opus.pds-rings.seti.org/holdings/previews/" + input[7].slice(0,4)+ "x_xxxx/" + input[7].slice(0,-4) + "_full.jpg";
	}
	if (input[0]=="Cassini ISS") {
		return "https://opus.pds-rings.seti.org/holdings/previews/" + input[7].slice(0,7)+ "xxx/" + input[7].slice(0,-4) + "_full.png";
	}
	if (input[0]=="New Horizons LORRI") {
		return "https://opus.pds-rings.seti.org/holdings/previews/" + input[7].slice(0,2) + "xx" + input[7].slice(4,7) + "xxxx/" + input[7].slice(0,-4) + "_full.jpg";
	}
	if (input[0]=="New Horizons MVIC") {
		return "https://opus.pds-rings.seti.org/holdings/previews/" + input[7].slice(0,2) + "xx" + input[7].slice(4,7) + "xxxx/" + input[7].slice(0,-4) + "_full.jpg";
	}
	return input[7];
}

//Loading csv
const csvText = data.trim();
const rows = csvText.split('\n').map(row => row.split(','));
let selectedImage;
    
function newDrop() {
	let dropGroups = getDropGroups();
	let groups = [];
	for (let i=0; i<rows.length; i++) {
		if (dropGroups.includes(rows[i][2])) {
			groups.push(rows[i]);
			
		}
	}
	if (document.getElementById('_balance').checked) {
		let counts=[];
		for (let i=0; i<dropGroups.length; i++) {
			counts.push(0);
		}
		for (let i=0; i<dropGroups.length; i++) {
			for (let j=0; j<groups.length; j++) {
				if (groups[j][2]==dropGroups[i]) counts[i]++;
			}
		}
		for (let i=0; i<dropGroups.length; i++) {
			counts[i]=Math.log(counts[i]);
		}
		let sum=0;
		for (let i=0; i<dropGroups.length; i++) {
			sum+=counts[i];
		}
		for (let i=0; i<dropGroups.length; i++) {
			counts[i]/=sum;
		}
		//print chances
		console.log("\n\nNew:\n");
		for (let i=0; i<dropGroups.length; i++) {
			console.log(dropGroups[i]+" "+(Math.floor(counts[i]*10000)/100)+"%");
		}
		let selectedGroup;
		let choice=Math.random();
		let prodsum=0;
		for (let i=0; i<dropGroups.length; i++) {
			prodsum+=counts[i];
			if (choice<prodsum) {
				selectedGroup=dropGroups[i];
				break;
			}
		}
		let newGroups=[];
		for (let i=0; i<groups.length; i++) {
			if (groups[i][2]==selectedGroup) {
				newGroups.push(groups[i]);
				
			}
		}
		selectedImage=newGroups[Math.floor(Math.random() * newGroups.length)];
	} else {
		selectedImage=groups[Math.floor(Math.random() * groups.length)];
	}
	document.getElementById('targetImg').src = generateImageURL(selectedImage);
	document.getElementById("guess").innerHTML="";
	document.getElementById("guess").innerHTML+='<option value="none">None</option>'
	for (let i=0; i<dropGroups.length; i++) {
		document.getElementById("guess").innerHTML+='<option value="'+dropGroups[i]+'">'+dropGroups[i]+"</option>"
	}

}
function checkguess() {
	if (document.getElementById("guessButton").innerHTML!="Guess!") {
		newDrop();
		document.getElementById("guessButton").innerHTML="Guess!";
		document.getElementById("result").innerHTML="";
		document.getElementById("imageMetadata").innerHTML="";
		return;
	}
	if (selectedImage[2]==document.getElementById("guess").value) {
		document.getElementById("result").innerHTML="Correct.";
	} else {
		document.getElementById("result").innerHTML="Incorrect. "+selectedImage[2];
	}
	document.getElementById("imageMetadata").innerHTML="Spacecraft: "+selectedImage[5]+", Instrument: "+selectedImage[0];
	document.getElementById("guessButton").innerHTML="Next!";
}

function toggleCheckboxesInDiv(divId, state) {
  const container = document.getElementById(divId);
  if (container) {
	const checkboxes = container.querySelectorAll('input[type="checkbox"]');
	checkboxes.forEach(checkbox => {
	  checkbox.checked = state;
	});
	const nestedDivs = container.querySelectorAll('div');
	nestedDivs.forEach(nestedDiv => {
	  toggleCheckboxesInDiv(nestedDiv.id, state);
	});
  }
}
function getDropGroups() {
	let out=[];
	const container = document.getElementById("options_menu");
	const checkboxes = container.querySelectorAll('input[type="checkbox"]');
	checkboxes.forEach(checkbox => {
	  if (checkbox.id[0]!='_'&&checkbox.checked) out.push(checkbox.id);
	});
	console.log(out);
	return out;
}

function toggleLargeMoons(state) {
	let largeMoons = ["Moon","Callisto","Io","Ganymede","Europa","Enceladus","Iapetus","Mimas","Tethys","Titan","Ariel","Miranda","Oberon","Titania","Umbriel","Triton","Charon"];
	for (let i=0; i<largeMoons.length; i++) {
		document.getElementById(largeMoons[i]).checked=state;
	}
}
function toggleOptions() {
	if (document.getElementById("options_menu").style.display=="none") {
		document.getElementById("options_menu").style.display="block";
	} else {
		document.getElementById("options_menu").style.display="none";
	}
}