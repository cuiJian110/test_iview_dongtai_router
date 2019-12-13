<!--
 * @Description: 
 * @Autor: cuiJian
 * @Date: 2019-12-12 16:59:09
 * @LastEditors: cuiJian
 * @LastEditTime: 2019-12-12 17:05:00
 -->
<template>
    <div>
        <div>
            son2_1
        </div>
        <div>
            from_son_1_value===>>>:{{from_son_1_value}}
        </div>
    </div>
</template>
<script>
import VM from "@/util/vueInstance";
export default {
    data() {
        return {
            from_son_1_value: "",
        }
    },
    created() {
        VM.$on("toSon2_1",res => {
            this.from_son_1_value = res;
        })
    }
}
</script>