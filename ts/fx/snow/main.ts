(function () {
    console.log("snow is load!\nsource code from https://69.run/8NXGPw")

	let canvas:HTMLCanvasElement
    let ctx:CanvasRenderingContext2D
	let points = [] as unknown as [{x: number,y: number,fill: string,z: number,vx: number,vy: number,dia: number}]
	let maxDist = 100

	fx.snow.onload = function(){
		//Add on load scripts
		canvas = document.createElement("canvas")
        canvas.id = "snow_shader"
		ctx = canvas.getContext("2d") as CanvasRenderingContext2D

		resizeCanvas()
		window.addEventListener('resize', resizeCanvas, false)

		animate()
		fx.snow.animate = animate

        document.body.appendChild(canvas)
        fx.snow.chg_opc()
	}
	//Particle constructor
	function point() {
        let tmp = {
		    "x" : Math.random() * (canvas.width + maxDist) - (maxDist / 2),
		    "y" : Math.random() * (canvas.height + maxDist) - (maxDist / 2),
		    "fill" : "rgba(255,255,255," + ((0.4 * Math.random()) + 0.5) + ")",
		    "z" : (Math.random() * 0.5) + 0.5,

            "vx" : 0 as number,
            "vy" : 0 as number,
            "dia" : 0 as number,
        }
		tmp.vx = ((Math.random() * 2) - 0.5) * tmp.z
		tmp.vy = ((Math.random() * 1.5) + 1.5) * tmp.z
		tmp.dia = ((Math.random() * 2.5) + 1.5) * tmp.z
		points.push(tmp)
	}
	//Point generator
	function generatePoints(amount:number) {
		for (let i = 0 ;i < amount; i++) {
			point()
		}
		// console.log(points)
	}
	//Point drawer
	function draw(obj:typeof points[0]) {
		ctx.beginPath()
		ctx.strokeStyle = "transparent"
		ctx.fillStyle = obj.fill
		ctx.arc(obj.x, obj.y, obj.dia, 0, 2 * Math.PI)
		ctx.closePath()
		ctx.stroke()
		ctx.fill()
	}
	//Updates point position values
	function update(obj:typeof points[0]) {
		obj.x += obj.vx
		obj.y += obj.vy
		if (obj.x > canvas.width + (maxDist / 2)) {
			obj.x = -(maxDist / 2)
		}
		else if (obj.x < -(maxDist / 2)) {
			obj.x = canvas.width + (maxDist / 2)
		}
		if (obj.y > canvas.height + (maxDist / 2)) {
			obj.y = -(maxDist / 2)
		}
		else if (obj.y < -(maxDist / 2)) {
			obj.y = canvas.height + (maxDist / 2)
		}
	}
	//
	function animate() {
		ctx.clearRect(0, 0, canvas.width, canvas.height)
        for (const i in points) {
            draw(points[i])
            update(points[i])
        }
	}

	function resizeCanvas() {
		canvas.width = window.innerWidth
		canvas.height = window.innerHeight
		points = [] as unknown as typeof points
		generatePoints(window.innerWidth / 3)
	}
})()