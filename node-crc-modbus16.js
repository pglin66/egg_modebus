/**
 *  MODBUS-RTU CRC校验
 * @param data Buffer对象十六进制Hex
 * @returns {any[]}  十六进制高低位
 * @constructor
 */
function MODBUS_CRC(data) {
    let crcValue = 0xFFFF;
    for(let i=0;i<data.length;i++){
        crcValue^=data[i]&0xFFFF
        for(let j=0;j<8;j++){
            if(crcValue&0x0001){
                crcValue>>=1
                crcValue^=0xA001
            }else{
                crcValue>>=1
            }
        }
    }

    crcValue=crcValue.toString(16)
    let crcArr=new Array(2)
    crcArr[0]=crcValue.substring(2,4)
    crcArr[1]=crcValue.substring(0,2)
    return crcArr
}

/**
 *  测试
 */
function testMODBUS_CRC() {
    console.log(MODBUS_CRC(new Buffer("01060000000089","hex")))   //输出 3039
}
testMODBUS_CRC()
