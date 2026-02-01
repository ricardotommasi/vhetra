'use client';
import { Suspense, useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useAnimations, useGLTF } from '@react-three/drei';
import { Group } from 'three';
import { Bloom, EffectComposer } from '@react-three/postprocessing';

function Model({ path, scale = 1 }: { path: string, scale?: number }) {
    const { scene } = useGLTF(path); // path relative to /public
    console.log(useGLTF(path).materials);

    return <primitive object={scene} scale={scale} receiveShadow />;
}

export function RotatingModel({ path, scale = 1 }: { path: string, scale?: number }) {
    const { scene, animations } = useGLTF(path)
    const ref = useRef<Group>(null!)

    const [dragging, setDragging] = useState(false)
    const [lastPos, setLastPos] = useState<{ x: number; y: number } | null>(null)

    // Desktop (mouse)
    useEffect(() => {
        const handlePointerMove = (e: PointerEvent) => {
            if (dragging && ref.current) {
                ref.current.rotation.y += e.movementX * 0.01
                ref.current.rotation.x += e.movementY * 0.01
            }
        }
        const handlePointerUp = () => {
            setDragging(false)
            setLastPos(null)
        }

        if (dragging) {
            window.addEventListener('pointermove', handlePointerMove)
            window.addEventListener('pointerup', handlePointerUp)
        }
        return () => {
            window.removeEventListener('pointermove', handlePointerMove)
            window.removeEventListener('pointerup', handlePointerUp)
        }
    }, [dragging])

    // Mobile (touch)
    useEffect(() => {
        const handleTouchMove = (e: TouchEvent) => {
            if (dragging && ref.current && lastPos) {
                const touch = e.touches[0]
                const dx = touch.clientX - lastPos.x
                const dy = touch.clientY - lastPos.y
                ref.current.rotation.y += dx * 0.01
                ref.current.rotation.x += dy * 0.01
                setLastPos({ x: touch.clientX, y: touch.clientY })
            }
        }
        const handleTouchEnd = () => {
            setDragging(false)
            setLastPos(null)
        }

        if (dragging) {
            window.addEventListener('touchmove', handleTouchMove)
            window.addEventListener('touchend', handleTouchEnd)
        }
        return () => {
            window.removeEventListener('touchmove', handleTouchMove)
            window.removeEventListener('touchend', handleTouchEnd)
        }
    }, [dragging, lastPos])

    const { actions } = useAnimations(animations, scene)


    useEffect(() => {
        Object.values(actions).forEach(action => {
            if (action) {
                action.timeScale = 0.2;
                action.play()
            }
        })
    }, [actions])


    return (
        <group
            ref={ref}
            scale={scale}
            onPointerDown={() => setDragging(true)}
            receiveShadow
            castShadow
        >
            <primitive object={scene} receiveShadow
                castShadow />
        </group>
    )
}

export default function BlenderModel({ path, type = 'simple', scale }: { path: string, type: 'autoRotate' | 'simple' | 'animated', scale?: number }) {
    useGLTF.preload(path);

    const renderModel = () => {
        switch (type) {
            case 'simple':
                return <Model path={path} scale={scale} />;
            case 'animated':
                return <RotatingModel path={path} scale={scale} />;
            default:
                break;
        }
    }

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <Canvas shadows={false} camera={{ position: [0, 0, 5], fov: 50 }} dpr={[1, 1.15]}
                gl={{ alpha: true, premultipliedAlpha: false }}
                style={{ background: 'transparent' }}
                onCreated={({ gl }) => {
                    gl.setClearColor(0x000000, 0)
                }}>
                <ambientLight intensity={0.3} />
                <directionalLight position={[3, 5, 2]} intensity={1.2} castShadow />
                <directionalLight position={[-2, -3, -1]} intensity={0.4} castShadow />
                <directionalLight position={[2, 1, 2]} intensity={3} castShadow />
                <Suspense fallback={null}>
                    {renderModel()}
                </Suspense>
                <EffectComposer enableNormalPass={false}>
                    <Bloom
                        intensity={0.4}
                        luminanceThreshold={0.85}
                        luminanceSmoothing={0.2}
                        mipmapBlur
                    />
                </EffectComposer>
            </Canvas>
        </div>
    );
}
