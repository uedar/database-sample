type cellObject = {
    axis1: { x: number, y: number, z: number, periodic: boolean },
    axis2: { x: number, y: number, z: number, periodic: boolean },
    axis3: { x: number, y: number, z: number, periodic: boolean }
}


const sliceByNumber = (array: number[], number: number) => {
    const length = Math.ceil(array.length / number)
    return new Array(length).map((_, i) =>
        array.slice(i * number, (i + 1) * number)
    )
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
        const positionsArray: number[] = atomsJson["positions"]["__ndarray__"][2]
        return sliceByNumber(positionsArray, 3)
    }

    public static getForces = (
        atomsJson: any
    ) => {
        const forcesArray: number[] = atomsJson["forces"]["__ndarray__"][2]
        return sliceByNumber(forcesArray, 3)
    }
}