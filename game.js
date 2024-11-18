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
	let dropGroups = [];
	if (document.getElementById("planets").checked) {
		dropGroups = dropGroups.concat(["Venus","Earth","Mars","Jupiter","Saturn","Uranus","Neptune","Pluto"]);
	}
	if (document.getElementById("rings").checked) {
		dropGroups = dropGroups.concat(["Jupiter Rings","Saturn Rings","Uranus Rings","Neptune Rings"]);
	}
	if (document.getElementById("moons1").checked) {
		dropGroups = dropGroups.concat(["Moon","Ganymede","Io","Europa","Callisto"]);//Jupiter
		dropGroups = dropGroups.concat(["Mimas","Enceladus","Titan","Tethys","Dione","Rhea","Iapetus"]);//Saturn
		dropGroups = dropGroups.concat(["Titania","Ariel","Miranda","Umbriel","Oberon"]);//Uranus
		dropGroups = dropGroups.concat(["Triton","Nereid","Charon"]);//Uranus, pluto
	}
	if (document.getElementById("moons2").checked) {
		dropGroups = dropGroups.concat(["Adrastea","Amalthea","Callirrhoe","Elara","Himalia","Metis","Thebe"]);//Jupiter
		dropGroups = dropGroups.concat(["Aegaeon","Albiorix","Anthe","Atlas","Bebhionn","Bergelmir","Bestla","Calypso","Daphnis","Epimetheus","Erriapus","Fornjot"]);//Saturn
		dropGroups = dropGroups.concat(["Greip","Hati","Helene","Hyperion","Hyrrokkin","Ijiraq","Jarnsaxa","Kari","Kiviuq","Loge","Methone","Mundilfari"]);//Saturn
		dropGroups = dropGroups.concat(["Narvi","Paaliaq","Pallene","Pan","Pandora","Phoebe","Polydeuces","Prometheus","S/2004 S 12","S/2004 S 13","Siarnaq","Skathi"]);//Saturn
		dropGroups = dropGroups.concat(["Skoll","Surtur","Suttungr","Tarqeq","Tarvos","Telesto","Thrymr","Ymir"]);//Saturn
		dropGroups = dropGroups.concat(["Cupid","Mab","Puck"]);//Uranus
		dropGroups = dropGroups.concat(["Larissa","Naiad","Proteus","Thalassa"]);//Neptune
		dropGroups = dropGroups.concat(["Hydra","Kerberos","Nix","Styx"]);//Pluto
	}
	let groups = [];
	for (let i=0; i<rows.length; i++) {
		if (dropGroups.includes(rows[i][2])) {
			groups.push(rows[i]);
			
		}
	}
	if (document.getElementById('balance').checked) {
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