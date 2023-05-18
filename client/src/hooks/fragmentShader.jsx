const fragmentShader = `
uniform float u_intensity;
uniform float u_time;
varying vec2 vUv;
varying float vDisplacement;

void main() {
    float distort = 0.5 * vDisplacement * u_intensity * sin(vUv.y * 5.0 + u_time);
    
    // Kolor żółty
    vec3 yellow = vec3(1.0, 1.0, 0.0);
    
    // Kolor fioletowy (bardziej intensywny)
    vec3 purple = vec3(0.5, 0.0, 1.0);
    purple.b += 0.6; // Zwiększenie wartości niebieskiej składowej (B)
    
    vec3 color = mix(yellow, purple, abs(vUv.x - 0.4) * (1.0 - distort));
    
    gl_FragColor = vec4(color, 1.0);
}

`;

export default fragmentShader;