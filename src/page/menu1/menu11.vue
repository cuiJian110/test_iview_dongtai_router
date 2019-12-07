<template>
    <div>
        <Tree :data="data" :render="renderContent"></Tree>
        <Modal
            v-model="isShowCreate"
            title="Common Modal dialog box title"
            :footer-hide='true'
            width='700'
        >
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
                <FormItem label="当前路径" prop="fileName">
                    <Input v-model="formValidate.fileName" disabled placeholder="fileName"></Input>
                </FormItem>
                <FormItem label="新建文件名" prop="fileName">
                    <Input v-model="newfileName" placeholder="fileName"></Input>
                </FormItem>
                <FormItem label="内容" prop="content">
                    <Input v-model="formValidate.content" placeholder="content"></Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
                    <Button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>
<script>
import {getTreeData} from '@/api'
export default {
    data () {
        return {
            isShowCreate: false,
            data: [],
            data: [
                {
                    title: '根目录',
                    expand: true,
                    children: [
                        {
                            title: 'Linux',
                            expand: true,
                            path: "linux",
                            type: "tree",
                            children: [
                                {
                                    path: "linux/baseline1",
                                    title: "baseline1",
                                    type: "tree",
                                    expand: true,
                                    children: [
                                        {
                                            path: "linux/baseline1/son1",
                                            title: "son1",
                                            type: "tree",
                                            expand: true,
                                            children: [
                                                {
                                                    title: 'son1_1',
                                                    expend: true,
                                                    type: 'tree'
                                                }
                                            ]
                                        },
                                        {
                                            path: "linux/baseline1/son2",
                                            title: "son2",
                                            type: "tree",
                                            expand: true
                                        },
                                    ]
                                },
                                {
                                    path: "linux/baseline2",
                                    title: "baseline2",
                                    type: "tree",
                                    expand: true,
                                    children: [
                                        
                                    ]
                                },
                                {
                                    path: "linux/baseline3",
                                    title: "baseline3",
                                    type: "tree",
                                    expand: true
                                },
                            ]
                        },
                        {
                            title: 'window',
                            expand: true,
                            path: "window",
                            type: "tree",
                            children: [
                                {
                                    path: "window/baseline1",
                                    title: "baseline1",
                                    type: "tree",
                                    expand: true
                                },
                                {
                                    path: "window/baseline2",
                                    title: "baseline2",
                                    type: "tree",
                                    expand: true
                                },
                            ]
                        }
                    ]
                }
            ],
            buttonProps: {
                type: 'default',
                size: 'small',
            },
            formValidate: {
                fileName: '',
                content: ''
            },
            newfileName: '',
            ruleValidate: {
                fileName: [
                    { required: true, message: 'The name cannot be empty', trigger: 'blur' }
                ],
            }
        }
    },
    created() {
        // this.initData()
    },
    methods: {
        // initData() {
        //     getTreeData().then(res => {
        //         console.dir(res)
        //         if(res.status) {
        //             // this.data = res.data
        //             // console.log("this.data => ",this.data )
        //         }
        //     })
        // },
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.formValidate.fileName += `/${this.newfileName}`
                    this.newfileName = '' 
                    this.$Message.success('Success!');
                } else {
                    this.$Message.error('Fail!');
                }
            })
        },
        handleReset (name) {
            this.$refs[name].resetFields();
        },
        renderContent (h, { root, node, data }) {
            if(data.title !== '根目录' && data.children && data.children.length !== 0) {
                return h('span', {
                    style: {
                        display: 'inline-block',
                        width: '100%'
                    }
                }, [
                    h('span', [
                        h('Icon', {
                            props: {
                                type: 'ios-paper-outline'
                            },
                            style: {
                                marginRight: '8px'
                            }
                        }),
                        h('span', data.title)
                    ]),
                    h('span', {
                        style: {
                            display: 'inline-block',
                            float: 'right',
                            marginRight: '32px'
                        }
                    }, [
                        h('Button', {
                            props: Object.assign({}, this.buttonProps, {
                                icon: 'ios-add'
                            }),
                            style: {
                                marginRight: '8px'
                            },
                            on: {
                                click: () =>  this.append(data) 
                            }
                        }),
                        h('Button', {
                            props: Object.assign({}, this.buttonProps, {
                                icon: 'ios-remove'
                            }),
                            on: {
                                click: () => { this.remove(root, node, data) }
                            }
                        })
                    ])
                ]);
            } else {
                return h('span',[
                    h('Icon', {
                        props: {
                            type: 'ios-paper-outline'
                        },
                        style: {
                            marginRight: '8px'
                        }
                    }),
                    h('span', data.title)
                ])
            }
        },
        append (data) {
            console.log(data)
            this.isShowCreate = true
            this.formValidate.fileName = data.path
            // const children = data.children || [];
            // children.push({
            //     title: 'appended node',
            //     expand: true
            // });
            // this.$set(data, 'children', children);
        },
        remove (root, node, data) {
            const parentKey = root.find(el => el === node).parent;
            const parent = root.find(el => el.nodeKey === parentKey).node;
            const index = parent.children.indexOf(data);
            parent.children.splice(index, 1);
        },
        ok () {
            this.$Message.info('Clicked ok');
        },
        cancel () {
            this.$Message.info('Clicked cancel');
        }
    }
}
</script>
<style scoped>

</style>

