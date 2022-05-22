uniform sampler2D ground;
uniform sampler2D slope;
uniform sampler2D top;
uniform vec2 resolution;
uniform sampler2D backbuffer;

varying vec2 vUV;

varying float vAmount;

void main() 
{  
    vec4 water =vec4(0,0, 0,0);
    if( vAmount < 0.17 ) water =texture2D( ground, vUV * 10.0 );
	//vec4 a = (smoothstep(0.14, 0.17, vAmount) - smoothstep(0.18, 0.31, vAmount)) * texture2D( sandyTexture, vUV * 20.0 );
	vec4 b = (smoothstep(0.14, 0.22, vAmount) - smoothstep(0.14, 0.66, vAmount)) * texture2D( slope, vUV * 10.0 );
	vec4 c = (smoothstep(0.30, 0.65, vAmount))                                   * texture2D( top, vUV * 10.0 );
	gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0)+water+ b + c; //, 0.1);
    
}  