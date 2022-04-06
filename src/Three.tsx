import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stats, OrbitControls, Text, Html } from "@react-three/drei"
import { Vector3, Mesh, Spherical } from "three";
import React, { Suspense, useRef, useEffect, useState, useContext } from "react";
import { DetailDataContext } from './AtomsDetail';
import DetailDataCleaner from './DetailDataCleaner';
import Controls from "./utils/Controls";
import { ContactSupportOutlined } from "@material-ui/icons";
import { AtomsColors } from "./AtomsColor";

const Thing = (props: any) => {
    const ref = useRef({} as Mesh);
    const color = AtomsColors.find((a) => a.id == props.element)?.color
    const radius: number = AtomsColors.find((a) => a.id == props.element)?.radius!!
    const [hovered, setHover] = useState(false)
    const hover = (e: any) => {
        console.log('hover')
        // e.stopPropagation() && setHover(true)
    }
    const unhover = (e: any) => e.stopPropagation() && setHover(false)

    useFrame(() => (ref.current.rotation.z += 0.));
    return (
        <mesh
            {...props}
            ref={ref}
            onClick={(e: any) => console.log("click")}
            onMouseEnter={(e: any) => console.log("hover")}
            onMouseLeave={unhover}
        >

            <sphereGeometry args={[radius * 0.5, 10, 36]} />
            <meshBasicMaterial
                attach="material"
                color={color}
            />
            <Html style={{ pointerEvents: "none", display: hovered ? "block" : "none" }}>
                <div className="content">
                    Hello <br />
                    World
                </div>
            </Html>

        </mesh >
    );
};


const Three: React.FC = React.memo(() => {
    const detailData = useContext(DetailDataContext)
    const positions = DetailDataCleaner.getPostitions(detailData)
    const elements = DetailDataCleaner.getElements(detailData)
    return (
        <div style={{ width: "50vw", height: "50vh" }}>

            <Canvas>
                {positions.map((p: number[], index: number) => (
                    <Thing position={p} element={elements[index]} ></Thing>
                )
                )}
                <Controls />
                <gridHelper />
            </Canvas>
        </div >
    );
});
export default Three;
