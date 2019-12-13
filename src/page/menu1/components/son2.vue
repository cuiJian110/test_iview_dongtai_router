<!--
 * @Description: 
 * @Autor: cuiJian
 * @Date: 2019-12-12 14:21:40
 * @LastEditors: cuiJian
 * @LastEditTime: 2019-12-12 17:01:30
 -->
<template>
    <div style="border: 1px dashed #ccc; margin-top: 10px">
        son2
        <div>
            {{testvalue2}}
        </div>
        <div>
            {{state_value1}}
        </div>
        <div>
            <button @click="changeFatherCommon('c_3')">change common3</button>
            <button @click="changeFatherCommon('c_4')">change common4</button>
            common_value===>>>:{{common_value}}
        </div>
        <div>
            {{fromSon1_msg}}
        </div>
        <div>
            <son21 />
        </div>
    </div>
</template>
<script>
import VM from "@/util/vueInstance";
import son2_1 from "./componentss/son2_1"
export default {
    components: {son21: son2_1},
    props: {
        testvalue2: {
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
            state_value1: "",
            fromSon1_msg: ""
        }
    },
    methods: {
        testKong() {
            console.log("test------kong");
        },
        changeState_value1(str) {
            this.state_value1 = str;
        },
        changeFatherCommon(str) {
            this.$emit("func",str);
        }
    },
    created() {
        console.log("son2 -- created -- 执行了")
        VM.$on("toSon2",res => {
            // console.log("created $on")
            // console.log(res)
            this.fromSon1_msg = res;
        })
    },
    mounted() {
        console.log("son2 -- mounted -- 执行了")
        // VM.$on("toSon2",res => {
        //     console.log("mounted $on")
        //     console.log(res)
        // })
    },
    updated() {
        console.log("son2 -- updated -- 执行了")
    }
}
</script>