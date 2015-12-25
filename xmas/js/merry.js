var A = [{x:26,y:71},{x:52,y:15},{x:74,y:71},{x:57,y:71},{x:52,y:51},{x:47,y:71},{x:26,y:71},{x:56,y:44},{x:52,y:30},{x:48,y:44},{x:56,y:44}];

var C = [{x:80,y:17},{x:43,y:20},{x:35,y:29},{x:30,y:44},{x:32,y:56},{x:40,y:61},{x:56,y:62},{x:80,y:62},{x:80,y:52},{x:63,y:49},{x:50,y:41},{x:53,y:30},{x:80,y:30}];

var E = [{x:28,y:14},{x:28,y:72},{x:77,y:72},{x:77,y:59},{x:49,y:59},{x:49,y:46},{x:64,y:46},{x:65,y:33},{x:49,y:33},{x:49,y:23},{x:77,y:23},{x:76,y:14}];

var H = [{x:29,y:12},{x:29,y:70},{x:46,y:70},{x:46,y:51},{x:65,y:51},{x:65,y:70},{x:81,y:70},{x:81,y:12},{x:65,y:12},{x:65,y:33},{x:46,y:33},{x:46,y:12}];

var I = [{x:47,y:13},{x:47,y:72},{x:66,y:72},{x:66,y:13}];

var M = [{x:23,y:80},{x:23,y:19},{x:42,y:19},{x:57,y:40},{x:73,y:19},{x:92,y:19},{x:92,y:80},{x:73,y:80},{x:73,y:51},{x:57,y:62},{x:42,y:51},{x:42,y:80}];

var R = [{x:33,y:12},{x:33,y:69},{x:47,y:69},{x:47,y:51},{x:59,y:69},{x:72,y:69},{x:56,y:35},{x:73,y:33},{x:75,y:22},{x:73,y:14},{x:33,y:12},{x:45,y:19},{x:61,y:20},{x:61,y:25},{x:45,y:27},{x:45,y:19}];

var S = [{x:76,y:13},{x:46,y:13},{x:33,y:16},{x:27,y:26},{x:29,y:37},{x:42,y:43},{x:57,y:47},{x:61,y:52},{x:58,y:59},{x:47,y:62},{x:26,y:63},{x:26,y:73},{x:59,y:72},{x:75,y:64},{x:77,y:48},{x:69,y:35},{x:47,y:28},{x:49,y:23},{x:76,y:23}];

var T = [{x:45,y:32},{x:45,y:72},{x:63,y:72},{x:63,y:32},{x:91,y:32},{x:91,y:16},{x:21,y:16},{x:21,y:32}];

var X = [{x:32,y:20},{x:47,y:20},{x:58,y:38},{x:65,y:20},{x:82,y:20},{x:64,y:46},{x:82,y:68},{x:65,y:68},{x:58,y:50},{x:47,y:68},{x:32,y:68},{x:52,y:46}];

var Y = [{x:31,y:15},{x:49,y:15},{x:58,y:32},{x:66,y:15},{x:85,y:15},{x:65,y:43},{x:65,y:69},{x:52,y:69},{x:52,y:43}];

var w = window.innerWidth;
var h = window.innerHeight;
var objLimit = 50;

var Engine = Matter.Engine,
	World = Matter.World,
	Bodies = Matter.Bodies;

var engine = Engine.create(document.body, {
	render: {
		options: {
			height: h,
			width: w,
			showDebug: true,
			wireframes: false,
			background: "hsl(0,0%,20%)"
		}
	}
});
engine.timing.timeScale = 1.2;
engine.world.gravity.y = 2;
engine.world.bounds.max.x = w;
engine.world.bounds.max.y = h;

World.add(engine.world, Bodies.rectangle(w / 2, h - 160, 1000, 170, {
	isStatic: true,
	render: {
		fillStyle: "rgba(10,0,0,0)",
		strokeStyle: "rgba(0,0,0,0)"
	}
}));

Engine.run(engine);

var letters = {
	A: {
		name: "a",
		pos: -500,
		vertices: A
	},
	C: {
		name: "c",
		pos: -200,
		vertices: C
	},
	E: {
		name: "e",
		pos: -300,
		vertices: E
	},
	H: {
		name: "h",
		pos: 100,
		vertices: H
	},
	I: {
		name: "i",
		pos: 200,
		vertices: I
	},
	M: {
		name: "m",
		pos: 300,
		vertices: M
	},
	R: {
		name: "r",
		pos: -200,
		vertices: R
	},
	S: {
		name: "s",
		pos: -400,
		vertices: S
	},
	T: {
		name: "t",
		pos: -100,
		vertices: T
	},
	X: {
		name: "x",
		pos: -300,
		vertices: X
	},
	Y: {
		name: "y",
		pos: 0,
		vertices: Y
	},
};

function createBox(x, y, key) {
	return Matter.Body.create({
		position: {
			x: x,
			y: y
		},
		vertices: JSON.parse(JSON.stringify(letters[key].vertices)),
		mass: 0.0017,
		friction: 0,
		restitution: 1
	});
}

var boxes = [];

$(document).keydown(function(e) {
	var key = String.fromCharCode(e.which);
	if(key in letters){
		addLetter(key);
		hilight(letters[key].name);
	}
});

function addLetter(e) {
	var box = createBox(window.innerWidth / 2 + letters[e].pos, window.innerHeight - 400, e);

	box.angle = Math.random() * 0.5 - 0.25;
	box.force.y -= 0.00005;
	boxes.push(box);
	World.add(engine.world, boxes[boxes.length - 1]);

	if (boxes.length > objLimit) {
		World.remove(engine.world, boxes[0]);
		boxes = boxes.slice(1);
	}
}

function hilight(key) {
	$("#" + key).addClass("hilight");
	setTimeout(function() {
		$("#" + key).removeClass("hilight");
	}, 500);
}

$(".key").bind("click touch",function(e) {
	e.preventDefault();
	var key = String.fromCharCode($(this).attr("id").charCodeAt(0)).toUpperCase();
	if(key in letters){
		addLetter(key);
		hilight($(this).attr("id"));
	}
});