type cellObject = {
    axis1: { x: number, y: number, z: number, periodic: boolean },
    axis2: { x: number, y: number, z: number, periodic: boolean },
    axis3: { x: number, y: number, z: number, periodic: boolean }
}
type positionsObject = {
    x: number, y: number, z: number
}
type forcesObject = {
    x: number, y: number, z: number
}

export default class DetailDataCleaner {


    public static getCell = (
        atomsJson: any
    ) => {
        const cellArray: number[] = atomsJson["cell"]["array"]["__ndarray__"][2]
        const pbcArray: boolean[] = atomsJson["pbc"]["__ndarray__"][2]
        const cell: cellObject = {
            axis1: { x: cellArray[0], y: cellArray[1], z: cellArray[2], periodic: pbcArray[0] },
            axis2: { x: cellArray[3], y: cellArray[4], z: cellArray[5], periodic: pbcArray[1] },
            axis3: { x: cellArray[6], y: cellArray[7], z: cellArray[7], periodic: pbcArray[2] }
        }
        return cell
    }
    public static getPostitions = (
        atomsJson: any
    ) => {
        const cellArray: number[] = atomsJson["cell"]["array"]["__ndarray__"][2]
        const pbcArray: boolean[] = atomsJson["pbc"]["__ndarray__"][2]
        const cell: cellObject = {
            axis1: { x: cellArray[0], y: cellArray[1], z: cellArray[2], periodic: pbcArray[0] },
            axis2: { x: cellArray[3], y: cellArray[4], z: cellArray[5], periodic: pbcArray[1] },
            axis3: { x: cellArray[6], y: cellArray[7], z: cellArray[7], periodic: pbcArray[2] }
        }
        return cell
    }


}