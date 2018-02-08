class GLObject {
    constructor(glContext) {
        this.ctx = glContext;
        this.positionBuffer = glContext.createBuffer();
        this.colorBuffer = glContext.createBuffer();

        
    }
};