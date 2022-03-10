type cellObject = { axis: number, x: string, y: string, z: string, periodic: boolean }[]


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
        const cell: cellObject = [
            { axis: 1, x: cellArray[0].toFixed(2), y: cellArray[1].toFixed(2), z: cellArray[2].toFixed(2), periodic: pbcArray[0] },
            { axis: 2, x: cellArray[3].toFixed(2), y: cellArray[4].toFixed(2), z: cellArray[5].toFixed(2), periodic: pbcArray[1] },
            { axis: 3, x: cellArray[6].toFixed(2), y: cellArray[7].toFixed(2), z: cellArray[8].toFixed(2), periodic: pbcArray[2] }
        ]
        console.log(cell)
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