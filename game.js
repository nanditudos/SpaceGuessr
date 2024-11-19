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
let objectLink = [
//NASA links
{name:"Saturn",link:"https://science.nasa.gov/saturn/"},{name:"Venus",link:"https://science.nasa.gov/venus/"},
{name:"Earth",link:"https://science.nasa.gov/earth/facts/"},{name:"Jupiter",link:"https://science.nasa.gov/jupiter/"},
{name:"Uranus",link:"https://science.nasa.gov/uranus/"},{name:"Neptune",link:"https://science.nasa.gov/neptune/"},
{name:"Mercury",link:"https://science.nasa.gov/mercury/"},{name:"Pluto",link:"https://science.nasa.gov/dwarf-planets/pluto/"},
{name:"Mimas",link:"https://science.nasa.gov/saturn/moons/mimas/"},{name:"Enceladus",link:"https://science.nasa.gov/saturn/moons/enceladus/"},
{name:"Tethys",link:"https://science.nasa.gov/saturn/moons/tethys/"},{name:"Dione",link:"https://science.nasa.gov/saturn/moons/dione/"},
{name:"Rhea",link:"https://science.nasa.gov/saturn/moons/rhea/"},{name:"Titan",link:"https://science.nasa.gov/saturn/moons/titan/"},
{name:"Hyperion",link:"https://science.nasa.gov/saturn/moons/hyperion/"},{name:"Iapetus",link:"https://science.nasa.gov/saturn/moons/iapetus/"},
{name:"Phoebe",link:"https://science.nasa.gov/saturn/moons/phoebe/"},{name:"Janus",link:"https://science.nasa.gov/saturn/moons/janus/"},
{name:"Epimetheus",link:"https://science.nasa.gov/saturn/moons/epimetheus/"},{name:"Helene",link:"https://science.nasa.gov/saturn/moons/helene/"},
{name:"Telesto",link:"https://science.nasa.gov/saturn/moons/telesto/"},{name:"Calypso",link:"https://science.nasa.gov/saturn/moons/calypso/"},
{name:"Atlas",link:"https://science.nasa.gov/saturn/moons/atlas/"},{name:"Prometheus",link:"https://science.nasa.gov/saturn/moons/prometheus/"},
{name:"Pandora",link:"https://science.nasa.gov/saturn/moons/pandora/"},{name:"Pan",link:"https://science.nasa.gov/saturn/moons/pan"},
{name:"Ymir",link:"https://science.nasa.gov/saturn/moons/ymir/"},{name:"Paaliaq",link:"https://science.nasa.gov/saturn/moons/paaliaq/"},
{name:"Tarvos",link:"https://science.nasa.gov/saturn/moons/tarvos/"},{name:"Ijiraq",link:"https://science.nasa.gov/saturn/moons/ijiraq/"},
{name:"Suttungr",link:"https://science.nasa.gov/saturn/moons/suttungr/"},{name:"Kiviuq",link:"https://science.nasa.gov/saturn/moons/kiviuq/"},
{name:"Mundilfari",link:"https://science.nasa.gov/saturn/moons/mundilfari/"},{name:"Albiorix",link:"https://science.nasa.gov/saturn/moons/albiorix/"},
{name:"Skathi",link:"https://science.nasa.gov/saturn/moons/skathi/"},{name:"Erriapus",link:"https://science.nasa.gov/saturn/moons/erriapus/"},
{name:"Siarnaq",link:"https://science.nasa.gov/saturn/moons/siarnaq/"},{name:"Thrymr",link:"https://science.nasa.gov/saturn/moons/thrymyr/"},
{name:"Narvi",link:"https://science.nasa.gov/saturn/moons/narvi/"},{name:"Methone",link:"https://science.nasa.gov/saturn/moons/methone/"},
{name:"Pallene",link:"https://science.nasa.gov/saturn/moons/pallene/"},{name:"Polydeuces",link:"https://science.nasa.gov/saturn/moons/polydeuces/"},
{name:"Daphnis",link:"https://science.nasa.gov/saturn/moons/daphnis/"},{name:"Aegir",link:"https://science.nasa.gov/saturn/moons/aegir/"},
{name:"Bebhionn",link:"https://science.nasa.gov/saturn/moons/bebhionn/"},{name:"Bergelmir",link:"https://science.nasa.gov/saturn/moons/bergelmir/"},
{name:"Bestla",link:"https://science.nasa.gov/saturn/moons/bestla/"},{name:"Farbauti",link:"https://science.nasa.gov/saturn/moons/farbauti/"},
{name:"Fenrir",link:"https://science.nasa.gov/saturn/moons/fenrir/"},{name:"Fornjot",link:"https://science.nasa.gov/saturn/moons/fornjot/"},
{name:"Hati",link:"https://science.nasa.gov/saturn/moons/hati/"},{name:"Hyrrokkin",link:"https://science.nasa.gov/saturn/moons/hyrrokkin/"},
{name:"Kari",link:"https://science.nasa.gov/saturn/moons/kari/"},{name:"Loge",link:"https://science.nasa.gov/saturn/moons/loge/"},
{name:"Skoll",link:"https://science.nasa.gov/saturn/moons/skoll/"},{name:"Surtur",link:"https://science.nasa.gov/saturn/moons/surtur/"},
{name:"Anthe",link:"https://science.nasa.gov/saturn/moons/anthe/"},{name:"Jarnsaxa",link:"https://science.nasa.gov/saturn/moons/jarnsaxa/"},
{name:"Greip",link:"https://science.nasa.gov/saturn/moons/greip/"},{name:"Tarqeq",link:"https://science.nasa.gov/saturn/moons/tarqeq/"},
{name:"Aegaeon",link:"https://science.nasa.gov/saturn/moons/aegaeon/"},
{name:"Ceres",link:"https://science.nasa.gov/dwarf-planets/ceres/"},{name:"Haumea",link:"https://science.nasa.gov/dwarf-planets/haumea/"},
{name:"Makemake",link:"https://science.nasa.gov/dwarf-planets/makemake/"},{name:"Eris",link:"https://science.nasa.gov/dwarf-planets/eris/"},
{name:"Ganymede",link:"https://science.nasa.gov/jupiter/moons/ganymede/"},{name:"Callisto",link:"https://science.nasa.gov/jupiter/moons/callisto/"},
{name:"Io",link:"https://science.nasa.gov/jupiter/moons/io/"},{name:"Europa",link:"https://science.nasa.gov/jupiter/moons/europa/"},
{name:"Miranda",link:"https://science.nasa.gov/uranus/moons/miranda/"},{name:"Ariel",link:"https://science.nasa.gov/uranus/moons/ariel/"},
{name:"Umbriel",link:"https://science.nasa.gov/uranus/moons/umbriel/"},{name:"Titania",link:"https://science.nasa.gov/uranus/moons/titania/"},
{name:"Oberon",link:"https://science.nasa.gov/uranus/moons/oberon/"},{name:"Triton",link:"https://science.nasa.gov/neptune/neptune-moons/triton"},
{name:"Larissa",link:"https://science.nasa.gov/neptune/neptune-moons/larissa"},{name:"Naiad",link:"https://science.nasa.gov/neptune/neptune-moons/naiad"},
{name:"Nereid",link:"https://science.nasa.gov/neptune/neptune-moons/nereid"},{name:"Proteus",link:"https://science.nasa.gov/neptune/neptune-moons/proteus"},
{name:"Thalassa",link:"https://science.nasa.gov/neptune/neptune-moons/thalassa"},{name:"Puck",link:"https://science.nasa.gov/uranus/moons/puck/"},
{name:"Mab",link:"https://science.nasa.gov/uranus/moons/mab/"},{name:"Cupid",link:"https://science.nasa.gov/uranus/moons/cupid/"},
{name:"Charon",link:"https://science.nasa.gov/dwarf-planets/pluto/moons/charon/"},{name:"Nix",link:"https://science.nasa.gov/dwarf-planets/pluto/moons/nix/"},
{name:"Hydra",link:"https://science.nasa.gov/dwarf-planets/pluto/moons/hydra/"},
{name:"Kerberos",link:"https://science.nasa.gov/dwarf-planets/pluto/moons/kerberos/"},{name:"Styx",link:"https://science.nasa.gov/dwarf-planets/pluto/moons/styx/"},
//wikipedia links
//{name:"",link:""},{name:"",link:""},

//OPUS links
]
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
	for (let i=0; i<objectLink.length; i++) {
		if (objectLink[i].name==selectedImage[2]) {
			document.getElementById("result").innerHTML+=" "+"<a href='"+objectLink[i].link+"'>(More)</a>";
		}
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