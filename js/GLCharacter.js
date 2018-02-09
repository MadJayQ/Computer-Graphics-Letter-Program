class GLCharacter extends GLObject {
    constructor(glContext) {
        super(glContext);
        this.colorBuffer = new GLBuffer(
          glContext, 
          3,
          glContext.UNSIGNED_BYTE,
          false,
          0,
          0 
        );
    }

    
};