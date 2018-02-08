attribute vec4 a_position;
uniform mat4 u_matrix;

varying vec4 v_color;
void main()
{
    v_color = vec4(1.0, 0.0, 0.0, 1.0);
    gl_Position = u_matrix * a_position;
}