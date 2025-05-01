#version 300 es
precision highp float;

#include "@motion-canvas/core/shaders/common.glsl"

uint hash(uint x) {
    x ^= x >> 16;
    x *= 0x21f0aaadu;
    x ^= x >> 15;
    x *= 0xd35a2d97u;
    x ^= x >> 15;
    return x;
}

float u2f(uint x) {
    return uintBitsToFloat(0x40000000u | (x & 0x007FFFFFu)) - 3.;
}

vec3 rand_grad(uvec3 p) {
    uint tmp = hash(hash(hash(hash(p.x)) ^ hash(p.y)) ^ hash(p.z));
    return vec3(u2f(hash(tmp ^ 0u)), u2f(hash(tmp ^ 1u)), u2f(hash(tmp ^ 2u)));
}

mat2 rotmat(float a) {
    float c = cos(a);
    float s = sin(a);
    return mat2(c, s, -s, c);
}

float perlin(vec3 p) {
    p.xz *= rotmat(1.2);
    p.xy *= rotmat(-3.2);
    p.xz *= rotmat(6.2);

    uvec3 ip = uvec3(ivec3(floor(p)));
    vec3 fp = p - floor(p);

    vec3 wa = fp * fp * fp * (fp * (fp * 6. - 15.) + 10.);
    vec3 wb = 1. - wa;

    float res = 0.;
    res += dot(rand_grad(ip + uvec3(0, 0, 0)), fp - vec3(0, 0, 0)) * wb.x * wb.y * wb.z;
    res += dot(rand_grad(ip + uvec3(1, 0, 0)), fp - vec3(1, 0, 0)) * wa.x * wb.y * wb.z;
    res += dot(rand_grad(ip + uvec3(0, 1, 0)), fp - vec3(0, 1, 0)) * wb.x * wa.y * wb.z;
    res += dot(rand_grad(ip + uvec3(1, 1, 0)), fp - vec3(1, 1, 0)) * wa.x * wa.y * wb.z;
    res += dot(rand_grad(ip + uvec3(0, 0, 1)), fp - vec3(0, 0, 1)) * wb.x * wb.y * wa.z;
    res += dot(rand_grad(ip + uvec3(1, 0, 1)), fp - vec3(1, 0, 1)) * wa.x * wb.y * wa.z;
    res += dot(rand_grad(ip + uvec3(0, 1, 1)), fp - vec3(0, 1, 1)) * wb.x * wa.y * wa.z;
    res += dot(rand_grad(ip + uvec3(1, 1, 1)), fp - vec3(1, 1, 1)) * wa.x * wa.y * wa.z;
    return res;
}

void main() {
    float v = perlin(vec3(vec2(screenUV * resolution + vec2(500, 100)) * .0022, time * .15));
    float alhpa = smoothstep(50., 40., abs(fract(10. * v) - .5) / fwidth(v));
    outColor = vec4(24.0 / 255.0, 24.0 / 255.0, 37.0 / 255.0, alhpa);
}
