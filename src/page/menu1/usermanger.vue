<template>
    <div>
        <my-table
            :col='col'
            :data='data'
            @reset='initData'
        >
            <Button slot='addItem' type='error' @click='handleAdd'>addItem</Button>
        </my-table>
    </div>
</template>
<script>
import myTable from '@/components/table'
export default {
    components: {
        myTable
    },
    created() {
        this.initData()
    },
    methods: {
        initData() {
            this.$api.getUserList().then(res => {
                if(res.status) {
                    this.data = res.data
                }
            })
        },
        handleAdd() {
            const data = this.$copy(this.data)
            data.push({
                "name": "user John Brown",
                "age": Math.floor(Math.random()*100),
                "sex": 1,
                "address": "New York No. 1 Lake Park",
                "date": "2016-10-03"
            })
            this.data = data
        }
    },
    data() {
        return {
            col: [
                {
                    title: 'Name',
                    key: 'name',
                    renderHeader: (h,p) => {
                        return h('div','Name')
                    }
                },
                {
                    title: 'Age',
                    key: 'age'
                },
                {
                    title: 'sex',
                    key: 'sex',
                    render: (h,p) => {
                        let sex = '男'
                        if(p.row.sex === 1) {
                            sex = '男'
                        } else if(p.row.sex === 0) {
                            sex = '女'
                        }
                        return h('span',sex)
                    }
                },
                {
                    title: 'Address',
                    key: 'address',
                    render(h,p) {
                        const data = p.row.address
                        if(data.constructor === Array) {
                            return h('div', data.map(item => h('li',item)))
                        } else if (data.constructor === Object) {
                            const ka = []
                            for (let k in data) {
                                ka.push(h('li',`${k}:${data[k]}`))
                            }
                            return h('div',ka)
                        } else {
                            return h('div',data)
                        }
                    }
                }
            ],
            data: [],
            // data: [
            //     {
            //         name: 'user John Brown',
            //         age: 18,
            //         sex: 1,
            //         address: 'New York No. 1 Lake Park',
            //         date: '2016-10-03'
            //     },
            //     {
            //         name: 'Jim Green',
            //         age: 24,
            //         sex: 0,
            //         address: ['北京','上海','重庆'],
            //         date: '2016-10-01'
            //     },
            //     {
            //         name: 'Joe Black',
            //         age: 30,
            //         sex: 0,
            //         address: {
            //             jingdu: '23.67',
            //             weidu: '12.11'
            //         },
            //         date: '2016-10-02'
            //     },
            //     {
            //         name: 'Jon Snow',
            //         age: 26,
            //         sex: 1,
            //         address: 'Ottawa No. 2 Lake Park',
            //         date: '2016-10-04'
            //     }
            // ]
        }
    }
}
</script>