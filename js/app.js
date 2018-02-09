var includes = [
    "js/globalvars.js",
    "js/Color.js",
    "js/WebGLRenderer.js",
    "js/Shader.js",
    "js/Program.js",
    "js/GLObject.js",
    "js/GLCharacter.js",
    "js/GLBuffer.js"
];
var initialized = false;
var start = 0;
class App {
    constructor() {
        this.glInitCallback = () => {};
    }

    onPageLoad() {
        includes.forEach((value, index, array) => {
            $.getScript(
                value, (data, status, jqxhr) => {
                    console.log("Loaded: " + value + " status: (" + jqxhr.status + ")" + status);
                }
            );
        });
        this.renderer = new WebGLRenderer();
        this.glInitCallback();
    }
    setLetterGeometry(letter) {
        letter.positionBuffer.initializeFromArray(new Float32Array([
            0,   0,  0,
            30,   0,  0,
            0, 150,  0,
            0, 150,  0,
            30,   0,  0,
            30, 150,  0,
 
           // top rung
            30,   0,  0,
           100,   0,  0,
            30,  30,  0,
            30,  30,  0,
           100,   0,  0,
           100,  30,  0,
 
           // middle rung
            30,  60,  0,
            67,  60,  0,
            30,  90,  0,
            30,  90,  0,
            67,  60,  0,
            67,  90,  0
        ]));
    }
    main() {
        var globals = GlobalVars.getInstance();
        if(!initialized) {
            initialized = true;
            start = Date.now();
            globals.setTickrate(30);
            this.letter = new GLCharacter(this.renderer.gl);
            this.setLetterGeometry(this.letter);
        }
        var time = Date.now() - start;
        var delta = time - globals.lasttime;
        var targettime = globals.tickinterval * 1000;

        delta *= globals.timescale;

        globals.lasttime = time;
        globals.frametime += delta;

        var estimatedticks = Math.ceil(globals.frametime / targettime);
        if(estimatedticks < 10) {
            while(globals.frametime >= targettime) {
                globals.tickcount++;
                globals.frametime -= targettime;
                this.tick(globals.tickinterval);
            }
        } else {
            //Reset our timer
            globals.frametime = 0; 
        }
        globals.framecount++;
        globals.curtime = time;
        globals.interpolation = globals.frametime / targettime;

        var framestart = Date.now();
        this.render();
        var frameend = Date.now();
        globals.framedelay = (frameend - framestart) / 1000;

        requestAnimationFrame(() => { this.main();});
    }

    tick(dt) {
        var globals = GlobalVars.getInstance();
        var curtime = globals.getTickCurtime();
        var mathhelper = MathHelper.getInstance();
    }

    render() {
        var mathhelper = MathHelper.getInstance();
        var globals = GlobalVars.getInstance();
        this.renderer.clear(
            WHITE
        );
        this.renderer.drawObject(this.letter);
    }
};