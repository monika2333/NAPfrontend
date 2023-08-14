<template>
    <div class="container">
        <div class="head">
            <span class="source">{{ source }}</span>
            <el-select v-model="value" class="chooseCol">
                <el-option
                    v-for="item in column"
                    :key="item"
                    :label="item"
                    :value="item"
                />
            </el-select>
        </div>
        <ul class="scroll">
            <el-scrollbar>
                <li class="item" v-for="(item, index) in top" :key="index">
                    <span class="rank">{{ item.rank }}</span>
                    <span class="title">{{ item.title }}</span>
                    <span class="degree">{{ item.degree }}</span>
                </li>
            </el-scrollbar>
        </ul>
    </div>
</template>

<script>
import { Vue3SeamlessScroll } from "vue3-seamless-scroll";
import { getTophub } from "@/api/user";

export default {
    data() {
        return {
            top:[
                
            ],
            value: ''
        };
    },
    props:['source', 'column'],
    components: {
        Vue3SeamlessScroll,
    },
    mounted(){
        this.value = this.column[0]
        getTophub({source: this.source, column: this.value}).then(res=>{
            this.top = res
        })
    },
    watch:{
        value(){
            getTophub({source: this.source, column: this.value}).then(res=>{
                this.top = res
            })
        }
    }
}
</script>

<style scoped>
.container{
    width: 100%;
    height: 100%;
}
.head{
    width: 100%;
    height: 10%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid rgba(202, 202, 202, 0.5);
}
.source{
    margin-left: 10px;
    font-weight: bold;
    font-size: 21px;
}
.scroll{
    width: 100%;
    height: 90%;
    overflow: hidden;
}
.chooseCol{
    width: 100px;
}
.scroll .item {
    width: 100%;
    margin-top: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
}
.rank{
    width: 10%;
    margin: 5px;
    font-size: 16px;
    font-weight: bold;
}
.title{
    width: 70%;
    margin: 5px;
    font-size: 13px;
}
.degree{
    width: 20%;
    color: rgb(100, 100, 100);
    display: flex;
    justify-content: center;
    font-size: 13px;
}
</style>