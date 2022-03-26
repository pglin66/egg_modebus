<!--
 * @Author: pglin66@126.com
 * @Date: 2022-03-25 11:50:31
 * @LastEditors: pglin66@126.com
 * @LastEditTime: 2022-03-26 08:29:50
 * @FilePath: \sf-midway-adminf:\iot\2022\egg_modebus\ws.vue
 * @Description: 
-->
<template>
    <div>
        <el-select placeholder="" v-model="form.path">
            <el-option :label="item.path" v-for="item in COMList" :value="item.path"></el-option>
        </el-select>
        <el-select placeholder="数据位" v-model="form.databits">
            <el-option :label="7" :value="7"></el-option>
            <el-option :label="8" :value="8"></el-option>
        </el-select>
        <el-select placeholder="波特率" v-model="form.baudRate">
            <el-option :label="item"
                v-for="item in [4800,9600,19200,38400,57600,78400,115200,230400,460800,576000]"
                :value="item"></el-option>
        </el-select>
        <el-select placeholder="校验位" v-model="form.parity">
            <el-option label="None" value="None"></el-option>
            <el-option label="Even" value="Even"></el-option>
            <el-option label="Mark" value="Mark"></el-option>
            <el-option label="Odd" value="Odd"></el-option>
            <el-option label="Space" value="Space"></el-option>
        </el-select>
        <el-select placeholder="停止位" v-model="form.stopbits">
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
        </el-select>
        {{content}}
        <el-input v-model="content">

        </el-input>
        <el-button @click="hanbleContent">连接</el-button>
        <el-button @click="hanbleWrite">发送</el-button>

        <el-button @click="hanbleWrite('010600000001480A')">打开空调</el-button>

        <el-button @click="hanbleWrite('01060000000089CA')">关闭空调</el-button>
    </div>

</template>

<script setup>
    import io from 'socket.io-client'

    const state = reactive({
        COMList: [],
        content:'',
        form:{
            path:'COM3',
            baudRate: 9600,  //波特率设置
            databits: 7,  //数据位
            parity: 'None',  //校验位
            stopbits: 1 //停止位
        }
    })

    let socket = io("ws://localhost:7001", {
        transports: ['websocket']
    })

    // /不间断尝试重连接
    socket.on('reconnect_attempt', () => {
        console.log("reconnect")
        socket.transports = ['websocket', 'polling', 'flashsocket'];
    });

    // 重连接时出错
    socket.on('reconnect_error', (attemptNumber) => {
        console.log(attemptNumber)
    });

    //连接成功走这个方法
    socket.on('connect', () => {
        console.log(socket.connected)
    })

    //报错时走这个方法
    socket.on('connect_error', (error) => {
        console.log(error)
    });

    //连接存活验证 
    socket.on('ping', (error) => {
        console.log('ping_include')
    });

    socket.emit('serialport/list', '');
    socket.on('list', (res) => {
        state.COMList = res
        console.log(res)
    });
    //socket.emit('serialport/connect','');
    //socket.emit('serialport/write', '');
    const hanbleContent = () => {
        socket.emit('serialport/connect', state.form);
    }

    const hanbleWrite = (content) => {
        socket.emit('serialport/write', content||state.content);
    }
    const { COMList,form,content } = toRefs(state)
</script>