<template>
    <div>
        <my-table
            :col='col'
            :data='data'
            @reset='initData'
        >
            <Button slot='reduceItem' type='error' @click='handleReduce'>删除</Button>
            <Modal
                slot='options'
                v-model="isShow"
                :title="title"
               >
                <p>Content of dialog</p>
                <p>Content of dialog</p>
                <p>Content of dialog</p>
            </Modal>
        </my-table>
    </div>
</template>
<script>
import myTable from '@/components/table'
export default {
    components: {
        myTable
    },
    data() {
        return {
            isShow: false,
            title: '',
            col: [
                {
                    title: 'Name',
                    key: 'name'
                },
                {
                    title: 'Age',
                    key: 'age'
                },
                {
                    title: '性别',
                    key: 'sex'
                },
                {
                    title: 'Address',
                    key: 'address'
                },
                {
                    title: '操作',
                    key: 'action',
                    render: (h,p) => {
                        return h('div',[
                            h('Button',{
                                props: {
                                    type: 'primary'
                                },
                                on: {
                                    click: () => this.handleEdit(p.row)
                                }
                            },'edit'),
                            h('Button',{
                                props: {
                                    type: 'error'
                                }
                            },'del')
                        ])
                    }
                }
            ],
            data: [],
            // data: [
            //     {
            //         name: 'role John Brown',
            //         age: 18,
            //         address: 'New York No. 1 Lake Park',
            //         date: '2016-10-03'
            //     },
            //     {
            //         name: 'Jim Green',
            //         age: 24,
            //         address: 'London No. 1 Lake Park',
            //         date: '2016-10-01'
            //     },
            //     {
            //         name: 'Joe Black',
            //         age: 30,
            //         address: 'Sydney No. 1 Lake Park',
            //         date: '2016-10-02'
            //     },
            //     {
            //         name: 'Jon Snow',
            //         age: 26,
            //         address: 'Ottawa No. 2 Lake Park',
            //         date: '2016-10-04'
            //     }
            // ]
        }
    },
    methods: {
        initData() {
            this.$api.getRoleList().then(res => {
                if(res.status) {
                    this.data = res.data
                }
            })
        },
        handleReduce() {
            const data = this.$copy(this.data)
            data.splice(0,1)
            this.data = data
        },
        handleEdit(obj) {
            this.isShow = true
            this.title = obj.name
        }
    },
    created() {
        this.initData()
    }
}
</script>