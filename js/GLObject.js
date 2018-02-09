var includes = ["js/GLBuffer"];

class GLObject {
    constructor(glContext) {
        this.ctx = glContext;
        this.positionBuffer = new GLBuffer(
            glContext, 
            3,
            glContext.FLOAT,
            false,
            0,
            0 
        );
    }
    setupVertexAttributes(vertexAttrib) {
        this.ctx.vertexAttribPointer(
            vertexAttrib,
            this.positionBuffer.size,
            this.positionBuffer.type,
            this.positionBuffer.normalize,
            this.positionBuffer.stride,
            this.positionBuffer.offset 
        );
    }
    draw() {
        this.positionBuffer.bind();
        this.ctx.drawArrays(this.ctx.TRIANGLES, 0, this.positionBuffer.data.length / this.positionBuffer.size);
    }
};