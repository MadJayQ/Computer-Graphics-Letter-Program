var self;
class GLProgram {
    constructor(glContext) {
        this.ctx = glContext;
        this.innerProgram = glContext.createProgram();
        self = this;
    }

    attachShader(shader) {
        self.ctx.attachShader(this.innerProgram, shader);
    }

    attachShaders(shaders) {
        shaders.forEach((value, index, array) => {
            self.ctx.attachShader(self.innerProgram, value);
        });
    }

    getAttributeLocation(name) {
        return this.ctx.getAttribLocation(this.innerProgram, name);
    }

    link(cleanup = true) {
        this.ctx.linkProgram(this.innerProgram);
        var success = this.ctx.getProgramParameter(this.innerProgram, this.ctx.LINK_STATUS);
        var info = this.ctx.getProgramInfoLog(this.innerProgram);
        if(success) {
            console.log("[GLPROGRAM]: Link status: OK");
            return this.innerProgram;
        }
        console.error("[GLPROGRAM]: Link status: " + info);
        if(cleanup) {
            this.ctx.deleteProgram(this.innerProgram);
        }
    }
};