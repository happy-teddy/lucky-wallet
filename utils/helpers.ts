import { beginCell, Cell } from "@ton/core";

const OFF_CHAIN_CONTENT_PREFIX = 0x01

function bufferToChunks(buff: Buffer, chunkSize: number) {
    const chunks: Buffer[] = []
    while (buff.byteLength > 0) {
        chunks.push(buff.slice(0, chunkSize))
        buff = buff.slice(chunkSize)
    }
    return chunks
}

export function makeSnakeCell(data: Buffer, addStartBit = false): Cell {
    const chunks = bufferToChunks(data, 126)

    if (chunks.length === 0) {
        return beginCell().endCell()
    }

    if (chunks.length === 1) {
        if (addStartBit) {
            return beginCell().storeUint(0, 8).storeBuffer(chunks[0]).endCell()
        }
        return beginCell().storeBuffer(chunks[0]).endCell()
    }

    let curCell = beginCell()

    for (let i = chunks.length - 1; i >= 0; i--) {
        const chunk = chunks[i]

        if (i === 0 && addStartBit) {
            curCell.storeUint(0, 8)
        }
        curCell.storeBuffer(chunk)

        if (i - 1 >= 0) {
            const nextCell = beginCell()
            nextCell.storeRef(curCell)
            curCell = nextCell
        }
    }

    return curCell.endCell()
}

export function encodeOffChainContent(content: string) {
    let data = Buffer.from(content)
    const offChainPrefix = Buffer.from([OFF_CHAIN_CONTENT_PREFIX])
    data = Buffer.concat([offChainPrefix, data])
    return makeSnakeCell(data)
}