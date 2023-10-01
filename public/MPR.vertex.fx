precision highp float;

varying vec3 worldSpaceCoords;

uniform mat4 projection, view, world;
attribute vec3 position;

void main()
{
    worldSpaceCoords = (world * vec4(position, 1.0 )).xyz;
    gl_Position = projection * view * world * vec4( position, 1.0 );
}