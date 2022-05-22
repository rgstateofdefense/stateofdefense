uniform sampler2D bumpTexture;
uniform float bumpScale;

varying float vAmount;
varying vec2 vUV;

vec2 rotateUV(vec2 uv, float rotation)
{
    float mid = 0.5;
    return vec2(
        cos(rotation) * (uv.x - mid) + sin(rotation) * (uv.y - mid) + mid,
        cos(rotation) * (uv.y - mid) - sin(rotation) * (uv.x - mid) + mid
    );
}

float rand(vec2 co){
    return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() 
{ 
    vUV = rotateUV(uv,uv.x);
    vec3 mPosition = position;
    mPosition[2]-=0.05;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( mPosition, 1 );
	vec4 bumpData = texture2D( bumpTexture, uv );
	
	vAmount = bumpData.r; // assuming map is grayscale it doesn't matter if you use r, g, or b.
}

