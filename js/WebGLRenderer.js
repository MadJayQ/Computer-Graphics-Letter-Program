    class WebGLRenderer {
    constructor() {
        this.canvas = $('#paintCanvas')[0];
        this.gl = this.canvas.getContext("webgl");
        this.shaders = new Map();

        this.resolutionScaling = 100;
        this.canvas.width = window.innerWidth * (this.resolutionScaling / 100);
        this.canvas.height = window.innerHeight * (this.resolutionScaling / 100); 

        this.shaders.set("VERTEX", new Shader(this.gl.VERTEX_SHADER, "shaders/vertex.glsl", this.gl));
        this.shaders.set("FRAGMENT", new Shader(this.gl.FRAGMENT_SHADER, "shaders/fragment.glsl", this.gl));

        this.program = new GLProgram(this.gl);
        this.program.attachShaders([
            this.shaders.get("VERTEX").compile(),
            this.shaders.get("FRAGMENT").compile()
        ]);

        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        this.gl.clearColor(1.0, 1.0, 1.0, 1.0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        this.gl.useProgram(this.program.link());

        var vertexPosition = this.program.getAttributeLocation("a_position");
        this.gl.enableVertexAttribArray(vertexPosition);


        this.rotation = 0;

        console.log(this.gl.canvas.clientHeight);

        
    }

    clear(col = BLACK) {
        this.gl.clearColor(col.r, col.g, col.b, col.a);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    }

    setupDraw() {
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.clear();
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.useProgram(this.program.innerProgram);
    }

    drawObject(obj) {
        this.setupDraw();

        var vertexPosition = this.program.getAttributeLocation("a_position");
        var matrixLocation = this.gl.getUniformLocation(this.program.innerProgram, "u_matrix");

        obj.setupVertexAttributes(vertexPosition);
        
        var mathhelper = MathHelper.getInstance();
        var m = mathhelper.projection(this.gl.canvas.clientWidth, this.gl.canvas.clientHeight, 400);
        var transm = mathhelper.translate(this.gl.canvas.clientWidth / 2, 150, 0);
        var roty = mathhelper.rotateY(this.rotation++);

        m = mathhelper.matrixMultiply(m, transm);
        m = mathhelper.matrixMultiply(m, roty);

        this.gl.uniformMatrix4fv(matrixLocation, false, m);

        obj.draw();
    }
};