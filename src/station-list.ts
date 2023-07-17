export type StationItem = {
    id: string
    name: string
}

export class StationApi {
    /**
     * 模拟获取公交站点
     * @return {Promise<StationItem[]>} 公交站点列表
     */
    static async getStationList(): Promise<StationItem[]> {
        return new Array(32).fill(0).map((_, index) => ({
            name: `公交站点${index}`,
            id: `id-${index}`
        }))
    }
}
