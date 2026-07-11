"use client";

import * as THREE from 'three'
import React from 'react'
import { useGLTF, useTexture } from '@react-three/drei'
import { GLTF } from 'three-stdlib'

type GLTFResult = GLTF & {
  nodes: {
    Sphere_Material002_0: THREE.Mesh
  }
  materials: {
    ['Material.002']: THREE.MeshStandardMaterial
  }
}

export function Model(props: React.ComponentProps<'group'>) {
  // Загружаем gltf из корня public
  const { nodes } = useGLTF('/scene.gltf') as unknown as GLTFResult
  
  // Явно указываем абсолютный URL для текстуры, чтобы Vercel не терял ее при деплое
  const earthTexture = useTexture('./textures/Material.002_diffuse.jpeg')
  earthTexture.flipY = false

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere_Material002_0.geometry}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={100}
      >
        {/* Используем meshBasicMaterial, чтобы планета светилась сама на сервере */}
        <meshBasicMaterial map={earthTexture} />
      </mesh>
    </group>
  )
}

useGLTF.preload('/scene.gltf')
useTexture.preload('./textures/Material.002_diffuse.jpeg')
