uniform float uTime;
uniform float uPeak;
varying vec2 vUv;

const float SPEED = 3.0;
const float ROW_DENSITY = 18.0;
const float COL_DENSITY = 24.0;
const float LINE_THICKNESS = 0.03;
const vec3 BASE_COL = vec3(0.02, 0, 0.05);
const vec3 GRID_COL = vec3(0.44, 0.82, 1);
const vec3 FINISH_LINE_COL = vec3(0.96, 0.19, 0.60);
const float PEAK_MULT = 1.2;
const float FINISH_LINE = 0.0;

float rampUp(float t) {
	return pow(t, 1.5);
}

float grid(vec2 uv) {
	vec2 lineThickness = vec2(LINE_THICKNESS);

	uv += 0.5;
	uv.x *= COL_DENSITY;
	uv.y *= ROW_DENSITY;
	uv.y += uTime * SPEED;
	uv = abs(fract(uv) - 0.5);

	vec2 lines = smoothstep(lineThickness, vec2(0.0), uv);
	return clamp(lines.x + lines.y, 0.0, 1.0);
}

void main() {
	vec2 uv = vUv;
	uv -= 0.5;

	float gridVal = grid(uv);
	float finishLine = smoothstep(LINE_THICKNESS / 4.0, 0.0, abs(uv.y - FINISH_LINE));
	finishLine *= 1.0 - smoothstep(0.01, 0.05, abs(uv.x));
	float fade = smoothstep(0.5, -0.5, uv.y) * 0.75;

	vec3 col = mix(BASE_COL, FINISH_LINE_COL, finishLine);
	col = mix(col, GRID_COL, gridVal);

	gl_FragColor = vec4(col * (0.2 + rampUp(uPeak / 100.0) * PEAK_MULT), fade);
}
