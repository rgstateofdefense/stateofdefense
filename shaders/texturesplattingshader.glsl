uniform sampler2D oceanTexture;
uniform sampler2D sandyTexture;
uniform sampler2D grassTexture;
uniform sampler2D rockyTexture;
uniform sampler2D snowyTexture;

uniform vec2 resolution;
uniform sampler2D backbuffer;

varying vec2 vUV;

varying float vAmount;

void main() 
{  
    vec4 water =vec4(0,0, 0,0);
    if( vAmount < 0.17 ) water =texture2D( oceanTexture, vUV * 6.0 );
	vec4 sandy = (smoothstep(0.14, 0.17, vAmount) - smoothstep(0.18, 0.31, vAmount)) * texture2D( sandyTexture, vUV * 10.0 );
	vec4 grass = (smoothstep(0.28, 0.32, vAmount) - smoothstep(0.35, 0.40, vAmount)) * texture2D( grassTexture, vUV * 20.0 );
	vec4 rocky = (smoothstep(0.30, 0.50, vAmount) - smoothstep(0.40, 0.70, vAmount)) * texture2D( rockyTexture, vUV * 20.0 );
	vec4 snowy = (smoothstep(0.50, 0.65, vAmount))                                   * texture2D( snowyTexture, vUV * 10.0 );
	gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0) + water + sandy + grass + rocky + snowy; //, 0.1);
    
}  