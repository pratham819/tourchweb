/**
 * Ultra-Fast 60FPS WebGL Shader for Lamp Shockwave & Chromatic Aberration:
 * - Origin-locked to the 3D bulb filament screen coordinates
 * - Multi-band chromatic aberration (RGB prism separation)
 * - Sinusoidal refraction displacement wave
 * - Radiant volumetric light burst flare impulse
 * - Zero CPU-overhead, 100% hardware-accelerated
 */
export const LampShockwaveShader = {
  uniforms: {
    tDiffuse: { value: null },
    uTime: { value: 0 },
    uResolution: { value: [1920, 1080] },
    uWaveCenter: { value: [0.5, 0.35] },
    uWaveProgress: { value: 0.0 }, // 0 to 1
    uWaveStrength: { value: 0.0 }, // Amplitude of displacement
    uChromaIntensity: { value: 0.0035 },
    uFlareIntensity: { value: 0.0 },
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
    uniform vec2 uWaveCenter;
    uniform float uWaveProgress;
    uniform float uWaveStrength;
    uniform float uChromaIntensity;
    uniform float uFlareIntensity;

    varying vec2 vUv;

    // Fast hash for subtle film grain
    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
    }

    void main() {
      vec2 uv = vUv;
      float aspect = uResolution.x / max(uResolution.y, 1.0);

      // Vector from bulb to current fragment
      vec2 diff = uv - uWaveCenter;
      diff.x *= aspect;
      float dist = length(diff);

      vec2 waveDir = normalize(diff + 0.00001);
      waveDir.x /= aspect;

      // 1. REFRACTIVE EXPANDING SHOCKWAVE DISPLACEMENT
      float waveMask = 0.0;
      vec2 displacedUv = uv;

      if (uWaveStrength > 0.001) {
        float ringRadius = uWaveProgress * 1.75;
        float ringWidth = 0.18;
        float ringDist = abs(dist - ringRadius);

        if (ringDist < ringWidth) {
          float factor = 1.0 - (ringDist / ringWidth);
          float wave = sin(factor * 3.14159265);
          waveMask = wave;

          // Outward refractive lens warping
          displacedUv -= waveDir * wave * uWaveStrength * (1.0 - uWaveProgress * 0.55);
        }
      }

      // 2. CHROMATIC PRISM SEPARATION (Red, Green, Blue dispersion)
      float chroma = uChromaIntensity + waveMask * 0.022;
      float r = texture2D(tDiffuse, displacedUv + waveDir * chroma).r;
      float g = texture2D(tDiffuse, displacedUv).g;
      float b = texture2D(tDiffuse, displacedUv - waveDir * (chroma * 1.15)).b;
      vec3 color = vec3(r, g, b);

      // 3. RADIANT BULB FLASH IMPULSE
      if (uFlareIntensity > 0.001) {
        float flare = 1.0 / (1.0 + dist * 16.0);
        vec3 flareColor = mix(vec3(1.0, 0.98, 0.88), vec3(0.85, 0.7, 0.45), 0.35);
        color += flareColor * flare * uFlareIntensity * 1.8;
      }

      // Subtle fine film grain
      float grain = (hash(vUv * uResolution + fract(uTime * 17.1)) - 0.5) * 0.03;
      color += grain;

      gl_FragColor = vec4(color, 1.0);
    }
  `
}
