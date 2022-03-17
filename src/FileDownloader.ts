import { saveAs } from 'file-saver'

export default class FileDownloader {
    /**
     * CSVをダウンロードする
     */
    public static downloadCsv = (
        filename: string,
        csvData: any[][],
        separator = ',',
        LF = '\n',
    ) => {
        const bom = new Uint8Array([0xef, 0xbb, 0xbf])
        const file = csvData
            .map((row) => {
                return row.join(separator)
            })
            .join(LF)

        // download
        const blob = new Blob([bom, file], {
            type: 'text/csv',
        })
        saveAs(blob, filename)
    }

    /**
     * jsonをダウンロードする
     */
    public static downloadJSon = (jsonObject: any, filename: string) => {
        const blob = new Blob([JSON.stringify(jsonObject, null, 2)], {
            type: 'application/json',
        })

        saveAs(blob, filename)
    }

    /**
     * textをダウンロードする
     */
    public static downloadText = (
        text: string,
        filename: string,
        type = 'text/plain;charset=utf-8',
    ) => {
        const blob = new Blob([text], { type: type })
        saveAs(blob, filename)
    }

    /**
     * URLのファイルをダウンロードする
     */
    public static downloadUrl = (url: string, filename: string) => {
        // NOTE: ここのfilenameは適用されないかも
        saveAs(url, filename)
    }
}
