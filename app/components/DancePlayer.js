import Slider from '@react-native-community/slider';
import { useGLTF } from '@react-three/drei/native';
import { Canvas, useFrame } from '@react-three/fiber/native';
import React, { Suspense, useEffect, useRef } from 'react';
import { Pressable, Text, View } from 'react-native';
import * as THREE from 'three';

function Dancer({ clip, time, setDuration }) {
  const group = useRef();
  const mixer = useRef();
  const actions = useRef({});

  // useGLTF handles 'require' and resolves the URL/Asset automatically
  const { scene, animations } = useGLTF(require('../../assets/dance.glb'));

  useEffect(() => {
    if (scene && animations.length) {
      const mixerObj = new THREE.AnimationMixer(scene);
      mixer.current = mixerObj;

      animations.forEach((a) => {
        actions.current[a.name] = mixerObj.clipAction(a);
      });

      if (actions.current[clip]) {
        actions.current[clip].play();
        setDuration(actions.current[clip].getClip().duration);
      }
    }
  }, [scene, animations, clip]);

  // Scrub timeline based on slider
  useEffect(() => {
    if (mixer.current) mixer.current.setTime(time);
  }, [time]);

  // Handle the animation loop
  useFrame((_, delta) => {
    if (mixer.current) {
      // If we are scrubbing manually, we don't usually call .update(delta) 
      // unless 'playing' is true. But setTime() works independently.
    }
  });

  return <primitive ref={group} object={scene} />;
}


export default function DancePlayer({ clip = 'basic_step', style }) {
  const [time, setTime] = React.useState(0);
  const [duration, setDuration] = React.useState(1);
  const [playing, setPlaying] = React.useState(false);

  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => {
      setTime((t) => (t + 0.016) % duration);
    }, 16);
    return () => clearInterval(id);
  }, [playing, duration]);

  return (
    <View style={[{ flex: 1, backgroundColor: '#070707' }, style]}>
      <Canvas
        onCreated={(state) => {
          const _gl = state.gl.getContext();
          const originalPixelStorei = _gl.pixelStorei.bind(_gl);
          
          _gl.pixelStorei = function(...args) {
            const [parameter] = args;
            // Only pass through the parameter Expo actually supports
            if (parameter === _gl.UNPACK_FLIP_Y_WEBGL) {
              return originalPixelStorei(...args);
            }
            // Silently ignore other parameters to stop the log spam
          };
        }}
        camera={{ position: [15, 18, 20], fov: 40, rotation: [-.7, 0.5, 0.35] }}
      >
        <ambientLight intensity={0.3} />
        <directionalLight intensity={0.5} position={[-10, 10, -10]} />
        <pointLight intensity={0.3} position={[0, 20, 0]} />
        <Suspense fallback={null}>
          <Dancer clip={clip} time={time} setDuration={setDuration} />
        </Suspense>
      </Canvas>

      <View style={{ paddingBottom: 40 }}>
        <Slider
          minimumValue={0}
          maximumValue={duration || 1}
          value={time}
          onValueChange={setTime}
          style={{ marginHorizontal: 20, height: 40 }}
        />
        <Pressable onPress={() => setPlaying(!playing)}>
          <Text style={{ textAlign: 'center', color: '#fff', fontSize: 18 }}>
            {playing ? 'PAUSE' : 'PLAY'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}