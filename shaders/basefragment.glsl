uniform sampler2D testuniform;//from javascript
varying vec2 vertexUV;//from vrtex shader
void main()
{
    gl_FragColor =texture2D(testuniform,vertexUV);
}