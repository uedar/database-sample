import { Canvas, useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import React, { useContext, useRef } from "react";
import { DetailDataContext } from './AtomsDetail';
import DetailDataCleaner from './DetailDataCleaner';
import Controls from "./utils/Controls";
import { ContactSupportOutlined } from "@material-ui/icons";

const Thing = (props: any) => {
    const ref = useRef({} as Mesh);
    useFrame(() => (ref.current.rotation.z += 0.));
    return (
        <mesh
            {...props}
            ref={ref}
            onClick={(e) => console.log("click")}
            onPointerOver={(e) => console.log("hover")}
            onPointerOut={(e) => console.log("unhover")}
        >
            <sphereGeometry args={[0.5, 10, 36]} />
            <meshBasicMaterial
                attach="material"
                color="blue"
            />
        </mesh>
    );
};


const Three: React.FC = React.memo(() => {
    const detailData = useContext(DetailDataContext)
    const positions = DetailDataCleaner.getPostitions(detailData)
    return (
        <div style={{ width: "100vw", height: "100vh" }}>

            <Canvas>
                {positions.map((p: number[]) => (
                    <Thing position={p}></Thing>
                )
                )}
                <Controls />
                <gridHelper />
            </Canvas>
        </div>
    );
});
export default Three;
