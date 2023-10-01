precision highp float;
precision highp sampler3D;

varying vec3 worldSpaceCoords;

uniform sampler3D textureSampler;

void main(void) {
    
    gl_FragColor  = texture(textureSampler, vec3(worldSpaceCoords));
    // gl_FragColor  = vec4(surfaceLighting,1);
}