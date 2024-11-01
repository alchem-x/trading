import { BARK_API } from '../common/global.js'
import { getRealtimeStock } from './snowball.js'

function sendBarkNotice(message) {
    const _ = fetch(`${BARK_API}/${message}`)
}

export async function pollWatch(watchList) {
    while (true) {
        for (const it of watchList) {
            if (!it.done) {
                const r = await getRealtimeStock(it.symbol)
                const data = r?.data?.[0]
                if (data) {
                    console.info(data.symbol, data.current)
                    if (it.test(data)) {
                        sendBarkNotice(`⏰目标价格提醒：${data.name ?? ''}${data.symbol}/当前价格${data.current}`)
                        it.done = true
                    }
                }
            }
        }
        if (watchList.every((it) => it.done)) {
            sendBarkNotice('监听任务全部完成，退出监听程序')
            break
        } else {
            await new Promise((resolve) => setTimeout(resolve, 1000))
        }
    }
}