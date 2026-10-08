export const CinematicPostShader = {
  uniforms: {
    tDiffuse: { value: null },
    uTime: { value: 0 },
    uResolution: { value: [1920, 1080] },
    uGrainIntensity: { value: 0.085 },
    uChromaIntensity: { value: 0.0035 },
    uVignetteDarkness: { value: 0.75 },
    uWaveCenter: { value: [0.5, 0.5] },
    uWaveProgress: { value: 0.0 },
    uWaveStrength: { value: 0.0 },
    uImpactFlash: { value: 0.0 },
  },

  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,

  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform float uTime;
    uniform vec2 uResolution;
    uniform float uGrainIntensity;
    uniform float uChromaIntensity;
    uniform float uVignetteDarkness;
    uniform vec2 uWaveCenter;
    uniform float uWaveProgress;
    uniform float uWaveStrength;
    uniform float uImpactFlash;

    varying vec2 vUv;

    float random(vec2 p) {
      vec2 k1 = vec2(23.14069263277926, 2.665144142690225);
      return fract(cos(dot(p, k1)) * 12345.6789);
    }

    void main() {
      vec2 uv = vUv;
      vec2 centeredUv = uv - 0.5;
      float aspect = uResolution.x / max(uResolution.y, 1.0);
      centeredUv.x *= aspect;

      if (uWaveStrength > 0.001) {
        vec2 waveDiff = uv - uWaveCenter;
        waveDiff.x *= aspect;
        float dist = length(waveDiff);

        float ringRadius = uWaveProgress * 1.5;
        float ringWidth = 0.12;
        float ringDist = abs(dist - ringRadius);

        if (ringDist < ringWidth) {
          float wave = sin((ringDist / ringWidth) * 3.14159265);
          vec2 normDiff = normalize(waveDiff + 0.0001);
          uv -= normDiff * wave * uWaveStrength * (1.0 - uWaveProgress * 0.7);
        }
      }

      float distFromCenter = length(vUv - 0.5);
      float chroma = uChromaIntensity * (1.0 + distFromCenter * 1.8);
      vec2 dir = normalize(vUv - 0.5 + 0.0001);

      float r = texture2D(tDiffuse, uv + dir * chroma).r;
      float g = texture2D(tDiffuse, uv).g;
      float b = texture2D(tDiffuse, uv - dir * chroma * 1.15).b;
      vec3 color = vec3(r, g, b);

      if (uImpactFlash > 0.001) {
        vec3 flashColor = mix(vec3(1.0, 0.95, 0.98), vec3(1.0, 0.2, 0.45), 0.35);
        color = mix(color, color + flashColor * 0.8, uImpactFlash);
      }

      float grain = (random(vUv * uResolution + fract(uTime * 43.12)) - 0.5) * uGrainIntensity;
      color += grain;

      float vignette = smoothstep(0.9, 0.25, length(vUv - 0.5) * 1.15);
      color *= mix(1.0 - uVignetteDarkness, 1.0, vignette);

      color = pow(color, vec3(0.96));

      gl_FragColor = vec4(color, 1.0);
    }
  `
}
