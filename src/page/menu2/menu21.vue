<!--
 * @Description: 
 * @Autor: cuiJian
 * @Date: 2019-12-10 17:07:58
 * @LastEditors: cuiJian
 * @LastEditTime: 2019-12-12 16:57:18
 -->
<template>
    <div>
        menu2_1
        <div>
            from son1 value===>>>:{{from_son1_msg}}
        </div>
    </div>
</template>
<script>
import VM from "@/util/vueInstance";
export default {
    data() {
        return {
            from_son1_msg: ""
        }
    },
    created() {
        VM.$on("toMenu2_1",res => {
            this.from_son1_msg = res;
        })
    }
}
</script>
<style scoped>

</style>

