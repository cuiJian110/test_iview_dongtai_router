<!--
 * @Description: 
 * @Autor: cuiJian
 * @Date: 2019-12-11 14:12:42
 * @LastEditors: cuiJian
 * @LastEditTime: 2019-12-12 17:06:06
 -->
<template>
    <div style="border: 1px solid #ccc; margin-top: 10px">
        son1
        <div>
            {{usedTemplate}}
        </div>
        <div>
            {{test_value}}
        </div>
        <div>
            {{testvalue1}}
        </div>
        <div>
            <button @click="changeFatherCommon('c_1')">change common1</button>
            <button @click="changeFatherCommon('c_2')">change common2</button>
            common_value===>>>: {{common_value}}
        </div>
        <div>
            给son2传数据了
            <br />
            <button @click="emitToSon2">给son2广播数据了</button>
        </div>
        <div>
            给son2-1传数据了
            <br />
            <button @click="emitToSon2_1">给son2-1广播数据了</button>
        </div>
    </div>
</template>
<script>
import VM from "@/util/vueInstance";
export default {
    props: {
        usedTemplate: {
            type: Array,
            required: true,
            default: function(){
                return []
            }
        },
        testvalue1: {
            type: String,
            required: true
        },
        common_value: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            alreadyCheck: [],
            test_value: "",
            test_toSon2_msg: "test to son2 的值",
            test_toSon2_1_msg: "test to son2-1 的值"
        }
    },
    watch: {
        // usedTemplate: {
        //     handler(newv,oldv) {
        //         console.log(newv,oldv)
        //         this.alreadyCheck = newv;
        //     },
        //     deep: true
        // }
    },
    methods: {
        emitToSon2() {
            VM.$emit("toSon2", this.test_toSon2_msg);
        },
        emitToSon2_1() {
            VM.$emit("toSon2_1",this.test_toSon2_1_msg);
        },
        changTestValue(str) {
            this.test_value = str;
        },
        changeFatherCommon(str) {
            this.$emit("func",str);
        }
        // changeAlreadyCheck(arr) {
        //     console.log(arr);
        //     this.alreadyCheck = arr;
        //     console.log(this.alreadyCheck)
        // },
        // onLoad() {
        //     console.log("onLoad")
        //     this.alreadyCheck = this.usedTemplate;
        //     console.log("current==>>",this.alreadyCheck)
        // }
    },
    created() {
        console.log("son1 -- created -- 执行了")
    },
    mounted() {
        console.log("son1 -- mounted -- 执行了")
    },
    updated() {
        console.log("son1 -- updated -- 执行了")
    }
}
</script>