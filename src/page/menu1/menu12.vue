<!--
 * @Description: 
 * @Autor: cuiJian
 * @Date: 2019-12-10 17:07:58
 * @LastEditors: cuiJian
 * @LastEditTime: 2019-12-12 16:20:49
 -->
<template>
    <div>
        menu1_2
        <br>
        wode code shi {{code}}
        div
        <div>
            <div v-for="(value,key) in obj" :key="key">
                <!-- {{value}} -->
                <div v-if="value.constructor === Array">
                    <div v-for="item in value" :key="item">
                        {{item}}
                    </div>
                </div>
                <div >

                </div>
                <!-- <span v-else>{{value}}</span> -->

            </div>
            <div>
                <button @click="handleToJSON">toJSONString</button>
            </div>
            <div>
                <div>
                    <button @click="handleusedTemplate(['aa','bb'])">changeusedTemplate1</button>
                    <button @click="handleusedTemplate(['cc','dd'])">changeusedTemplate2</button>
                    <button @click="handleusedTemplate(['ee','ff'])">changeusedTemplate3</button>
                    <button @click="handlechangeson('66')">change son1</button>
                    <button @click="handlechangeson('77')">change son1</button>
                    <button @click="handlechangeson('88')">change son1</button>
                </div>
                <div>
                    <div>
                        <button @click="handleChangeTestValue1('a')">change testvalue1</button>
                        <button @click="handleChangeTestValue1('b')">change testvalue1</button>
                        <button @click="handleChangeTestValue1('c')">change testvalue1</button>
                        <button @click="handleChangeTestValue2('d')">change testvalue2</button>
                        <button @click="handleChangeTestValue2('e')">change testvalue2</button>
                        <button @click="handleChangeTestValue2('f')">change testvalue2</button>
                        <br>
                        <button @click="handleChangeSon2State('state_a')">chang son2 state value</button>
                        <button @click="handleChangeSon2State('state_b')">chang son2 state value</button>
                        <button @click="handleChangeSon2State('state_c')">chang son2 state value</button>
                        <button @click="handletestKong">test son2 kong</button>
                    </div>
                    <son1 :testvalue1="son1_value" @func="changeCommonValue" :common_value="common_value" :usedTemplate="usedTemplate" ref="son1"/>
                    <son2 :testvalue2="son2_value" @func="changeCommonValue" :common_value="common_value" ref="son2"/>
                </div>
                
            </div>
        </div>
        <Modal
            v-model="modal1"
            title="Common Modal dialog box title">
            456
            <!-- <son1 :usedTemplate="usedTemplate" ref="son1"/> -->
        </Modal>

    </div>
</template>
<script>
import {mapState} from 'vuex'
import axios from 'axios'
import son1 from "./components/son1"
import son2 from "./components/son2";
export default {
    components: {son1, son2},
   computed: {
       ...mapState({
           code: state => state.menu.code
       })
   },
   watch: {
       code: {
           handler(newVale) {
            //    this.initData()
           },
           deep: true
       }
   },
   data() {
       return {
           son1_value: "son1_value",
           son2_value: "son2_value",
           common_value: "",
           modal1: false,
           usedTemplate: [],
           obj: {
               a: "a的值是个字符串",
               b: 88,
               c: '{"name": "zx", "age": 12,"gender": "难"}',
               d: ["index1","index2","index3","index4","index5"],
               e: {
                   e_a: "e的a",
                   e_b: "e的b",
                   e_c: "e的c"
               }
           },
       }
   },
   methods: {
       handleChangeTestValue1(str) {
           this.son1_value = str;
       },
       handleChangeTestValue2(str) {
           this.son2_value = str;
       },
       handleChangeSon2State(str) {
           this.$refs.son2.changeState_value1(str);
       },
       handletestKong() {
           this.$refs.son2.testKong();
       },
       changeCommonValue(str) {
        //    console.log(str);
           this.common_value = str;
       },
       handleusedTemplate(arr) {
            // this.modal1 = true;
            // 执行的这个 在子组件的onLoad方法输出后子组件的usedTemplate赋值为传过来的数组值
            // 由于父组件data值发生变化，父组件update执行
            this.usedTemplate = arr
            // 先执行的这个此时子组件的usedTemplate是[]
            // this.$refs.son1.onLoad();
       },
       handlechangeson(str) {
            // 子组件中data值发生变化会触发子组件的update，不会触发夫组件的update(created，mounted只在进入页面的时候执行一次)  
           this.$refs.son1.changTestValue(str)
       },
       renderObj(v,i) {
           if(i % 2 === 0) {
               color = "red";
           } else {
               color = "blue"
           }
           if(v.constuctor === Array) {
               return `<div v-for="i in v" :key="i">{{i}}</div>`
           }
       },
       initData() {
           axios.get(`${this.code}testhost`).then(res => {
               console.log(res)
           })
       },
       handleToJSON() {
        //    const obj = {name: "zx",age: 12};
            // const str = '{"name": "zx", "age": 12,"gender": "难"}'
        //    console.log(JSON.stringify(obj))
        // console.log(JSON.parse(str))
       }
   },
   created() {
       this.$emit("getSonVale",["首页","菜单1-2"])
       console.log("father created 执行了")
    //    this.initData()
   },
   mounted() {
       console.log("father mounted 执行了")
    //    this.initData()
   },
   updated() {
       console.log("father updated 执行了")
    //    this.initData()
   },

}
</script>
<style scoped>

</style>

