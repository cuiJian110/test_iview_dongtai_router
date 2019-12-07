<template>
    <div>
        <div>
            <slot name='create'></slot>
            <slot name='reduceItem'></slot>
            <slot name='addItem'></slot>
            <Button type='primary' @click='$emit("reset")'>刷新</Button>
        </div>
        <Table :columns="col" :data="data"></Table>
        <slot name='options'></slot>
    </div>
</template>
<script>
export default {
    props: {
        col: {
            required: true,
            type: Array
        },
        data: {
            required: true,
            type: Array
        }
    }
}
</script>
