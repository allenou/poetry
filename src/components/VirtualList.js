export default {
    name: 'VirtualList',
    props: {
        list: Array,
        size: {
            type: Number,
            default: 5
        }
    },
    data() {
        return {
            datas: [],
            current: 0
        }
    },
    created() {
        this.loopRender()
    },
    methods: {
        loopRender() {
            let globalId
            const { list, current, size } = this
            const totalSize = Math.ceil(this.list.length / this.size)
            const loop = () => {
                if (this.current >= totalSize) {
                    return cancelAnimationFrame(globalId)
                }
                const data = list.splice(current * size, (current + 1) * size)
                this.datas = [...this.datas, ...data]
                this.current++

                globalId = requestAnimationFrame(loop)
            }
            requestAnimationFrame(loop)
        }
    },
    render() {
        const list = [];
        this.datas.forEach(item => {
            list.push(
                this.$scopedSlots.default({
                    item: item
                })
            );
        });
        return (
            <div class="item">
                {list}
            </div>
        );
    }
}