uniform sampler2D groundsand;
uniform sampler2D hillsand;
uniform vec2 resolution;
uniform sampler2D backbuffer;

varying vec2 vUV;

varying float vAmount;

void main() 
{  
    vec4 water =vec4(0,0, 0,0);
    //if( vAmount < 0.01 ) 
    water =texture2D( groundsand, vUV * 10.0 );

	//vec4 c = (smoothstep(0.0, 0.65, vAmount))                                   * texture2D( hillsand, vUV * 10.0 );
	gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0)+water; //, 0.1);
    
}  