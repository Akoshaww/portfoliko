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
  const { nodes } = useGLTF('/scene.gltf') as unknown as GLTFResult
  const earthTexture = useTexture('/textures/Material.002_diffuse.jpeg')
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
        <meshBasicMaterial map={earthTexture} />
      </mesh>
    </group>
  )
}

useGLTF.preload('/scene.gltf')
useTexture.preload('/textures/Material.002_diffuse.jpeg')
