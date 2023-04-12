const fragmentShader = `
uniform float u_intensity;
uniform float u_time;
varying vec2 vUv;
varying float vDisplacement;
void main() {
    float distort = 1.5 * vDisplacement * u_intensity * sin(vUv.y * 10.0 + u_time);
    vec3 color = vec3(abs(vUv - 1.549) * 1.0  * (1.082- distort), 0.453);
    gl_FragColor = vec4(color, 1.0);
}
`;

export default fragmentShader;