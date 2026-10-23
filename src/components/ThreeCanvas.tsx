import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { PROJECTS, CASE_STUDIES } from '../data/portfolioData';

interface ThreeCanvasProps {
  activeView: 'global' | 'rag' | 'news' | 'agri' | 'casestudies';
  visualStyle: 'neural' | 'core' | 'matrix';
  onSelectProject: (projectId: string) => void;
  onSelectCaseStudy: (caseStudyId: string) => void;
}

// Module-scope reusable math objects to avoid garbage collection inside render loop
const _vec3 = new THREE.Vector3();
const _targetCamPos = new THREE.Vector3(0, 8, 26);
const _targetLookAt = new THREE.Vector3(0, 0, 0);
const _currentLookAt = new THREE.Vector3(0, 0, 0);
const _mouse = new THREE.Vector2();
const _raycaster = new THREE.Raycaster();

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({
  activeView,
  visualStyle,
  onSelectProject,
  onSelectCaseStudy,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Store interactive refs
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const interactiveNodesRef = useRef<{ id: string; mesh: THREE.Mesh; type: 'project' | 'study'; label: string }[]>([]);
  const isDraggingRef = useRef(false);
  const prevMouseRef = useRef({ x: 0, y: 0 });
  const sphericalRef = useRef({ radius: 26, theta: 0, phi: Math.PI / 2.8 });

  // Update camera target coordinates based on activeView
  useEffect(() => {
    switch (activeView) {
      case 'rag':
        _targetCamPos.set(0, 3, 10);
        _targetLookAt.set(0, 0, 0);
        break;
      case 'news':
        _targetCamPos.set(12, 4, 12);
        _targetLookAt.set(8, 0, -4);
        break;
      case 'agri':
        _targetCamPos.set(-12, 4, 12);
        _targetLookAt.set(-8, 0, -4);
        break;
      case 'casestudies':
        _targetCamPos.set(0, 16, 14);
        _targetLookAt.set(0, -2, 0);
        break;
      case 'global':
      default:
        _targetCamPos.set(0, 8, 26);
        _targetLookAt.set(0, 0, 0);
        break;
    }
  }, [activeView]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL as mandated by directives
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x090d16, 0.022);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      200
    );
    camera.position.set(0, 8, 26);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: true,
    });
    rendererRef.current = renderer;
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // Lighting Rig (Studio 3-Point Setup)
    const ambientLight = new THREE.AmbientLight(0x38bdf8, 0.4);
    scene.add(ambientLight);

    const hemiLight = new THREE.HemisphereLight(0x60a5fa, 0x0f172a, 0.8);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.8);
    keyLight.position.set(15, 20, 15);
    scene.add(keyLight);

    const blueRimLight = new THREE.PointLight(0x3b82f6, 4, 40);
    blueRimLight.position.set(-15, 10, -10);
    scene.add(blueRimLight);

    const purpleFillLight = new THREE.PointLight(0x818cf8, 3, 30);
    purpleFillLight.position.set(12, -8, 10);
    scene.add(purpleFillLight);

    // 1. Procedural Starfield & Particle Constellation
    const particleCount = isSoftwareGl ? 600 : 1800;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorBlue = new THREE.Color(0x38bdf8);
    const colorIndigo = new THREE.Color(0x818cf8);
    const colorTeal = new THREE.Color(0x2dd4bf);

    for (let i = 0; i < particleCount; i++) {
      const radius = 10 + Math.random() * 45;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const chosenColor = Math.random() > 0.6 ? colorBlue : Math.random() > 0.3 ? colorIndigo : colorTeal;
      colors[i * 3] = chosenColor.r;
      colors[i * 3 + 1] = chosenColor.g;
      colors[i * 3 + 2] = chosenColor.b;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.18,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // 2. Multi-part Procedural Central AI Core / Gyro-Sphere
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // Inner glowing sphere
    const innerCoreGeo = new THREE.IcosahedronGeometry(2.2, 3);
    const innerCoreMat = new THREE.MeshStandardMaterial({
      color: 0x1d4ed8,
      emissive: 0x2563eb,
      emissiveIntensity: 0.6,
      wireframe: true,
      roughness: 0.3,
      metalness: 0.8,
    });
    const innerCore = new THREE.Mesh(innerCoreGeo, innerCoreMat);
    coreGroup.add(innerCore);

    // Orbit Ring 1 (X-axis tilt)
    const ring1Geo = new THREE.TorusGeometry(3.6, 0.06, 16, 100);
    const ring1Mat = new THREE.MeshStandardMaterial({
      color: 0x60a5fa,
      emissive: 0x3b82f6,
      emissiveIntensity: 0.4,
      metalness: 0.9,
      roughness: 0.1,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 4;
    coreGroup.add(ring1);

    // Orbit Ring 2 (Y-axis tilt)
    const ring2Geo = new THREE.TorusGeometry(4.4, 0.05, 16, 100);
    const ring2Mat = new THREE.MeshStandardMaterial({
      color: 0x818cf8,
      emissive: 0x6366f1,
      emissiveIntensity: 0.4,
      metalness: 0.9,
      roughness: 0.1,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.y = Math.PI / 3;
    coreGroup.add(ring2);

    // Orbit Ring 3 (Z-axis tilt)
    const ring3Geo = new THREE.TorusGeometry(5.2, 0.04, 16, 100);
    const ring3Mat = new THREE.MeshStandardMaterial({
      color: 0x2dd4bf,
      emissive: 0x0d9488,
      emissiveIntensity: 0.4,
      metalness: 0.9,
      roughness: 0.1,
    });
    const ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
    ring3.rotation.z = Math.PI / 6;
    coreGroup.add(ring3);

    // 3. Floating 3D Interactive Project Nodes
    const interactiveNodes: { id: string; mesh: THREE.Mesh; type: 'project' | 'study'; label: string }[] = [];

    // Project 1: Document RAG Engine (Center-Right)
    const ragGroup = new THREE.Group();
    ragGroup.position.set(0, 0, 0); // Positioned inside the core
    const ragNodeGeo = new THREE.OctahedronGeometry(1.2, 2);
    const ragNodeMat = new THREE.MeshStandardMaterial({
      color: 0x3b82f6,
      emissive: 0x1d4ed8,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      metalness: 0.7,
    });
    const ragNodeMesh = new THREE.Mesh(ragNodeGeo, ragNodeMat);
    ragNodeMesh.position.set(0, 0, 0);
    scene.add(ragNodeMesh);
    interactiveNodes.push({ id: 'pdf-analysis-rag', mesh: ragNodeMesh, type: 'project', label: 'PDF Analysis RAG Engine' });

    // Project 2: AI News Agent (Right Flank)
    const newsNodeGeo = new THREE.DodecahedronGeometry(1.4);
    const newsNodeMat = new THREE.MeshStandardMaterial({
      color: 0x818cf8,
      emissive: 0x4f46e5,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      metalness: 0.7,
    });
    const newsNodeMesh = new THREE.Mesh(newsNodeGeo, newsNodeMat);
    newsNodeMesh.position.set(8, 0, -4);
    scene.add(newsNodeMesh);
    interactiveNodes.push({ id: 'ai-news-agent', mesh: newsNodeMesh, type: 'project', label: 'AI News Agent System' });

    // Project 3: AgriTech Vision (Left Flank)
    const agriNodeGeo = new THREE.IcosahedronGeometry(1.4);
    const agriNodeMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      emissive: 0x059669,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      metalness: 0.7,
    });
    const agriNodeMesh = new THREE.Mesh(agriNodeGeo, agriNodeMat);
    agriNodeMesh.position.set(-8, 0, -4);
    scene.add(agriNodeMesh);
    interactiveNodes.push({ id: 'agricultural-development', mesh: agriNodeMesh, type: 'project', label: 'Agricultural ML Vision Suite' });

    // 4. Case Studies Orbital Vault Pods (Overhead Halo)
    const caseStudiesData = [
      { id: 'cs-agricultural-ml', pos: new THREE.Vector3(-4.5, 4.5, -2), label: 'Case Study: Agri-Vision ML' },
      { id: 'cs-pdf-rag', pos: new THREE.Vector3(0, 5.5, -3), label: 'Case Study: Local RAG Pipeline' },
      { id: 'cs-news-agent', pos: new THREE.Vector3(4.5, 4.5, -2), label: 'Case Study: Agentic News Briefing' },
    ];

    caseStudiesData.forEach((cs) => {
      const podGeo = new THREE.BoxGeometry(1.1, 1.1, 1.1);
      const podMat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0x0284c7,
        emissiveIntensity: 0.7,
        wireframe: true,
        roughness: 0.1,
        metalness: 0.9,
      });
      const podMesh = new THREE.Mesh(podGeo, podMat);
      podMesh.position.copy(cs.pos);
      scene.add(podMesh);
      interactiveNodes.push({ id: cs.id, mesh: podMesh, type: 'study', label: cs.label });
    });

    // 5. Connective Cyber Neural Constellation Lines
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.35,
    });

    const linePoints = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(8, 0, -4),
      new THREE.Vector3(4.5, 4.5, -2),
      new THREE.Vector3(0, 5.5, -3),
      new THREE.Vector3(-4.5, 4.5, -2),
      new THREE.Vector3(-8, 0, -4),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 5.5, -3),
    ];
    const lineGeo = new THREE.BufferGeometry().setFromPoints(linePoints);
    const networkLines = new THREE.Line(lineGeo, lineMat);
    scene.add(networkLines);

    // Save interactive nodes
    interactiveNodesRef.current = interactiveNodes;

    // Contact Grounding Plane with Soft Shadow Texture
    const groundGeo = new THREE.PlaneGeometry(60, 60);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x090d16,
      roughness: 0.85,
      metalness: 0.1,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -6;
    scene.add(ground);

    // Mouse / Pointer Interaction Handlers
    const handlePointerDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      prevMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      _mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      _mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      // Handle user drag rotation
      if (isDraggingRef.current) {
        const deltaX = e.clientX - prevMouseRef.current.x;
        const deltaY = e.clientY - prevMouseRef.current.y;
        prevMouseRef.current = { x: e.clientX, y: e.clientY };

        sphericalRef.current.theta -= deltaX * 0.005;
        sphericalRef.current.phi = Math.max(0.1, Math.min(Math.PI / 2.05, sphericalRef.current.phi - deltaY * 0.005));

        // Update target camera position relative to current spherical coords
        const r = sphericalRef.current.radius;
        const p = sphericalRef.current.phi;
        const t = sphericalRef.current.theta;
        _targetCamPos.x = r * Math.sin(p) * Math.sin(t);
        _targetCamPos.y = r * Math.cos(p);
        _targetCamPos.z = r * Math.sin(p) * Math.cos(t);
      }

      // Check hover for clickable nodes
      _raycaster.setFromCamera(_mouse, camera);
      const meshesToTest = interactiveNodesRef.current.map((n) => n.mesh);
      const intersects = _raycaster.intersectObjects(meshesToTest, false);

      if (intersects.length > 0) {
        const hitMesh = intersects[0].object as THREE.Mesh;
        const matched = interactiveNodesRef.current.find((n) => n.mesh === hitMesh);
        if (matched) {
          setHoveredNode(matched.label);
          container.style.cursor = 'pointer';
        }
      } else {
        setHoveredNode(null);
        container.style.cursor = 'grab';
      }
    };

    const handlePointerUp = () => {
      isDraggingRef.current = false;
    };

    const handleClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      _mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      _mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      _raycaster.setFromCamera(_mouse, camera);
      const meshesToTest = interactiveNodesRef.current.map((n) => n.mesh);
      const intersects = _raycaster.intersectObjects(meshesToTest, false);

      if (intersects.length > 0) {
        const hitMesh = intersects[0].object as THREE.Mesh;
        const matched = interactiveNodesRef.current.find((n) => n.mesh === hitMesh);
        if (matched) {
          if (matched.type === 'project') {
            onSelectProject(matched.id);
          } else if (matched.type === 'study') {
            onSelectCaseStudy(matched.id);
          }
        }
      }
    };

    container.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', handlePointerUp);
    container.addEventListener('click', handleClick);

    // Resize Handler
    const handleResize = () => {
      if (!container || !camera || !renderer) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop with Smooth Exponential Damping
    let frameId = 0;
    let clock = new THREE.Clock();

    function tick() {
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Gyro Core Rotations
      ring1.rotation.y += 0.4 * delta;
      ring1.rotation.x += 0.2 * delta;
      ring2.rotation.z += 0.3 * delta;
      ring2.rotation.y -= 0.15 * delta;
      ring3.rotation.x += 0.25 * delta;
      innerCore.rotation.y += 0.5 * delta;

      // Project Nodes Floating Motion
      ragNodeMesh.rotation.y += 0.6 * delta;
      newsNodeMesh.rotation.y += 0.4 * delta;
      newsNodeMesh.position.y = Math.sin(elapsed * 1.5) * 0.4;
      agriNodeMesh.rotation.y -= 0.4 * delta;
      agriNodeMesh.position.y = Math.cos(elapsed * 1.5) * 0.4;

      // Case Studies Orbit Wobble
      interactiveNodesRef.current.forEach((node, i) => {
        if (node.type === 'study') {
          node.mesh.rotation.x += 0.5 * delta;
          node.mesh.rotation.y += 0.7 * delta;
          node.mesh.position.y += Math.sin(elapsed * 2 + i) * 0.003;
        }
      });

      // Ambient Starfield Rotation
      particles.rotation.y = elapsed * 0.02;

      // Smooth Camera Damping Interpolation
      camera.position.x = THREE.MathUtils.damp(camera.position.x, _targetCamPos.x, 3.5, delta);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, _targetCamPos.y, 3.5, delta);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, _targetCamPos.z, 3.5, delta);

      _currentLookAt.x = THREE.MathUtils.damp(_currentLookAt.x, _targetLookAt.x, 3.5, delta);
      _currentLookAt.y = THREE.MathUtils.damp(_currentLookAt.y, _targetLookAt.y, 3.5, delta);
      _currentLookAt.z = THREE.MathUtils.damp(_currentLookAt.z, _targetLookAt.z, 3.5, delta);
      camera.lookAt(_currentLookAt);

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(tick);
    }

    tick();

    // Cleanup resources strictly
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', handlePointerUp);
      container.removeEventListener('click', handleClick);

      particleGeometry.dispose();
      particleMaterial.dispose();
      innerCoreGeo.dispose();
      innerCoreMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      ring3Geo.dispose();
      ring3Mat.dispose();
      ragNodeGeo.dispose();
      ragNodeMat.dispose();
      newsNodeGeo.dispose();
      newsNodeMat.dispose();
      agriNodeGeo.dispose();
      agriNodeMat.dispose();
      lineGeo.dispose();
      lineMat.dispose();
      groundGeo.dispose();
      groundMat.dispose();

      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [onSelectProject, onSelectCaseStudy]);

  return (
    <div className="relative w-full h-full select-none overflow-hidden">
      {/* Three.js Canvas Container */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Floating 3D Target Inspection Label (when hovering nodes) */}
      {hoveredNode && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 pointer-events-none z-20 transition-all">
          <div className="px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-blue-500/50 text-xs font-semibold text-white shadow-xl shadow-blue-500/20 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-400" />
            <span>Click to Inspect: {hoveredNode}</span>
          </div>
        </div>
      )}
    </div>
  );
};
