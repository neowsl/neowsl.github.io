uniform float uTime;
uniform vec2 uResolution;
uniform sampler2D uTexture;
uniform float uPeak;
varying vec2 vUv;

const float SPEED = 3.0;
const float CUTOFF = 0.4;
const float SOLID = 0.6;
const vec3 SAT_COL = vec3(0.96, 0.19, 0.6);
const float PEAK_MULT = 1.5;

float easeOut(float t) {
	return 1.0 - (1.0 - t) * (1.0 - t) * (1.0 - t);
}

float rampUp(float t) {
	return pow(t, 1.5);
}

// https://github.com/Experience-Monks/glsl-fast-gaussian-blur
vec4 blur(sampler2D image, vec2 uv, vec2 resolution, vec2 direction) {
	vec4 col = vec4(0.0);
	vec2 off1 = vec2(1.411764705882353) * direction;
	vec2 off2 = vec2(3.2941176470588234) * direction;
	vec2 off3 = vec2(5.176470588235294) * direction;

	col += texture2D(image, uv) * 0.1964825501511404;
	col += texture2D(image, uv + (off1 / resolution)) * 0.2969069646728344;
	col += texture2D(image, uv - (off1 / resolution)) * 0.2969069646728344;
	col += texture2D(image, uv + (off2 / resolution)) * 0.09447039785044732;
	col += texture2D(image, uv - (off2 / resolution)) * 0.09447039785044732;
	col += texture2D(image, uv + (off3 / resolution)) * 0.010381362401148057;
	col += texture2D(image, uv - (off3 / resolution)) * 0.010381362401148057;

	return col;
}

void main() {
    vec2 uv = vUv;

	vec4 blurH = blur(uTexture, uv, uResolution, vec2(2.5, 0.0));
	vec4 blurV = blur(uTexture, uv, uResolution, vec2(0.0, 2.5));
	vec4 base = min(blurH, blurV);

	float lines;
	if (uv.y > SOLID) {
		lines = 1.0;
	} else {
		lines = 1.0 - max(sin(uv.y * 160.0 - uTime * SPEED), 0.0);
		lines += clamp((uv.y - CUTOFF) / (SOLID - CUTOFF), 0.0, 1.0) * 2.0 - 1.0;
		lines = min(lines, 1.0);
	}

	float falloff = uv.y < CUTOFF ? 0.0 : easeOut(1.0 - (1.0 - uv.y) / (1.0 - CUTOFF));
    float sat = smoothstep(0.8, 0.4, uv.y);

    vec3 col = mix(base.rgb, SAT_COL, sat);

    gl_FragColor = vec4(col * (0.5 + rampUp(uPeak / 100.0) * PEAK_MULT), base.a * lines * falloff);
}
