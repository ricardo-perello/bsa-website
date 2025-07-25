"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Environment } from "@react-three/drei"
import * as THREE from "three"
import BSALogo from "./bsa-logo"

export default function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse position to be between -1 and 1
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -(e.clientY / window.innerHeight) * 2 + 1
      setMousePosition({ x, y })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div className="relative w-full h-screen bg-[#1f273a]">
      <div className="absolute inset-0 z-10">
        <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
          <color attach="background" args={["#1f273a"]} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <Environment preset="night" />
          <BlockchainChain mousePosition={mousePosition} />
        </Canvas>
      </div>

      {/* Move text to the left side */}
      <div className="absolute inset-0 z-20 flex flex-col items-start justify-center px-8 md:px-16 lg:px-24">
        <div className="w-full max-w-xl" style={{ maxWidth: "45%" }}>
          <div className="mb-6">
            <BSALogo classname="w-48 md:w-64 lg:w-72 h-auto" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Blockchain Student Association</h1>
          <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl">
            Connecting students with blockchain technology, innovation, and industry opportunities
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              className="px-6 py-3 bg-white text-[#1f273a] font-medium rounded-lg hover:bg-white/90 transition-colors"
              onClick={() => window.location.href = '/join'}
            >
              Join BSA
            </button>
            <button className="px-6 py-3 bg-transparent border border-white text-white font-medium rounded-lg hover:bg-white/10 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

interface ChainProps {
  mousePosition: { x: number; y: number }
}

function BlockchainChain({ mousePosition }: ChainProps) {
  return (
    <>
      {/* Position the chain more to the right side */}
      <group position={[1.5, 0, 0]}>
        <ChainStructure mousePosition={mousePosition} />
      </group>
    </>
  )
}

function ChainStructure({ mousePosition }: ChainProps) {
  // Config for our chain structure
  const chainConfig = {
    rows: 4, // Number of separate chains
    blocksPerRow: 6, // Number of blocks in each chain
    rowSpacing: 2, // Vertical spacing between chains (reduced from 3)
    blockSpacing: 1.5, // Horizontal spacing between blocks in a chain (reduced from 2.5)
    blockSize: 0.4, // Size of each block (reduced from 0.7)
    chainColor: new THREE.Color(0x4a80ff), // Color for chain links
    blockColor: new THREE.Color(0xffffff), // Color for blocks
    chainThickness: 0.1, // Thickness of chain links (reduced from 0.15)
    chainSegments: 8, // Number of segments in each chain link
  }

  // Create refs for all blocks
  const blocksRef = useRef<THREE.Mesh[]>([])
  const totalBlocks = chainConfig.rows * chainConfig.blocksPerRow

  // Initialize the blocks array
  useEffect(() => {
    blocksRef.current = Array(totalBlocks)
      .fill(null)
      .map(() => new THREE.Mesh())
  }, [totalBlocks])

  // Chain links (connections between blocks)
  const chainLinksRef = useRef<THREE.Mesh[]>([])
  const connections: [number, number][] = []

  // Initialize connections - only connect blocks within the same row
  useEffect(() => {
    // Create connections array - each pair represents indices of connected blocks
    for (let row = 0; row < chainConfig.rows; row++) {
      for (let block = 0; block < chainConfig.blocksPerRow - 1; block++) {
        const currentIndex = row * chainConfig.blocksPerRow + block
        const nextIndex = row * chainConfig.blocksPerRow + block + 1
        connections.push([currentIndex, nextIndex])
      }
    }

    // Initialize chain link refs
    chainLinksRef.current = Array(connections.length)
      .fill(null)
      .map(() => new THREE.Mesh())
  }, [chainConfig.rows, chainConfig.blocksPerRow])

  // Animation and mouse interaction
  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime()

    // Update position of each block
    blocksRef.current.forEach((block, i) => {
      if (!block) return

      // Calculate row and position in row
      const row = Math.floor(i / chainConfig.blocksPerRow)
      const posInRow = i % chainConfig.blocksPerRow

      // Base position
      const baseX = posInRow * chainConfig.blockSpacing
      const baseY = (row - (chainConfig.rows - 1) / 2) * chainConfig.rowSpacing
      const baseZ = 0

      // Apply mouse influence - stronger for blocks closer to mouse
      const distanceFromMouseX = Math.abs(baseX / 10 - mousePosition.x)
      const distanceFromMouseY = Math.abs(baseY / 10 - mousePosition.y)
      const distanceFromMouse = Math.sqrt(
        distanceFromMouseX * distanceFromMouseX + distanceFromMouseY * distanceFromMouseY,
      )

      // Wave effect along the chain
      const waveSpeed = 1.5
      const waveAmplitude = 0.3
      const waveFactor = Math.sin(elapsedTime * waveSpeed + posInRow * 0.5) * waveAmplitude

      // Mouse influence decreases with distance
      const mouseInfluence = Math.max(0, 1 - distanceFromMouse) * 1.5

      // Apply position with mouse influence
      block.position.x = baseX + mousePosition.x * mouseInfluence * 0.5
      block.position.y = baseY + mousePosition.y * mouseInfluence + waveFactor
      block.position.z = baseZ + mousePosition.x * mouseInfluence * 0.2

      // Rotation effect - blocks rotate more when mouse is closer
      block.rotation.x = elapsedTime * 0.2 + mouseInfluence * 0.5
      block.rotation.y = elapsedTime * 0.3 + mouseInfluence * 0.5
      block.rotation.z = waveFactor * 0.2
    })

    // Update positions of each chain link
    connections.forEach((connection, i) => {
      const chainLink = chainLinksRef.current[i]
      if (!chainLink) return

      const blockA = blocksRef.current[connection[0]]
      const blockB = blocksRef.current[connection[1]]

      if (blockA && blockB) {
        // Position the chain link between the two blocks
        const midX = (blockA.position.x + blockB.position.x) / 2
        const midY = (blockA.position.y + blockB.position.y) / 2
        const midZ = (blockA.position.z + blockB.position.z) / 2

        chainLink.position.set(midX, midY, midZ)

        // Calculate direction vector from block A to block B
        const direction = new THREE.Vector3().subVectors(blockB.position, blockA.position)

        // Set the chain link's length based on the distance between blocks
        const distance = direction.length()
        chainLink.scale.x = distance - chainConfig.blockSize * 1.2 // Adjust for block size

        // Orient the chain link to point from block A to block B
        chainLink.lookAt(blockB.position)

        // Calculate stretch factor for visual effects
        const stretchFactor = distance / chainConfig.blockSpacing

        // Make chain links thinner when stretched
        chainLink.scale.y = chainConfig.chainThickness / Math.max(1, stretchFactor * 0.7)
        chainLink.scale.z = chainConfig.chainThickness / Math.max(1, stretchFactor * 0.7)

        // Change opacity based on stretch
        if (chainLink.material instanceof THREE.MeshStandardMaterial) {
          chainLink.material.opacity = Math.min(1, 1.2 / stretchFactor)

          // Glow effect increases with stretch
          chainLink.material.emissiveIntensity = 0.2 + stretchFactor * 0.2
        }
      }
    })
  })

  return (
    <group>
      {/* Render all blocks */}
      {Array.from({ length: totalBlocks }).map((_, i) => {
        // Calculate row and position in row
        const row = Math.floor(i / chainConfig.blocksPerRow)
        const posInRow = i % chainConfig.blocksPerRow

        // Calculate initial position
        const posX = posInRow * chainConfig.blockSpacing
        const posY = (row - (chainConfig.rows - 1) / 2) * chainConfig.rowSpacing
        const posZ = 0

        // Alternate between different geometries for variety
        const geometryType = (row + posInRow) % 3

        return (
          <mesh
            key={`block-${i}`}
            position={[posX, posY, posZ]}
            ref={(el) => {
              if (el) blocksRef.current[i] = el
            }}
            castShadow
            receiveShadow
          >
            {geometryType === 0 ? (
              <boxGeometry args={[chainConfig.blockSize, chainConfig.blockSize, chainConfig.blockSize]} />
            ) : geometryType === 1 ? (
              <octahedronGeometry args={[chainConfig.blockSize * 0.6, 0]} />
            ) : (
              <dodecahedronGeometry args={[chainConfig.blockSize * 0.6, 0]} />
            )}
            <meshStandardMaterial
              color={chainConfig.blockColor}
              emissive={chainConfig.blockColor}
              emissiveIntensity={0.1}
              transparent
              opacity={0.9}
              roughness={0.3}
              metalness={0.7}
            />
          </mesh>
        )
      })}

      {/* Render all chain links */}
      {connections.map((connection, i) => {
        return (
          <mesh
            key={`chain-${i}`}
            ref={(el) => {
              if (el) chainLinksRef.current[i] = el
            }}
          >
            <group rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry
                args={[
                  chainConfig.chainThickness,
                  chainConfig.chainThickness,
                  1, // Will be scaled to match distance
                  chainConfig.chainSegments,
                ]}
              />
            </group>
            <meshStandardMaterial
              color={chainConfig.chainColor}
              emissive={chainConfig.chainColor}
              emissiveIntensity={0.3}
              transparent
              opacity={0.8}
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>
        )
      })}
    </group>
  )
}

