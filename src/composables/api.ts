import axios from 'axios'
export const searchBusLines = (lineName: string) => {
  return axios.request({
    url: 'https://pts-linkcld-comx3efb63a802260xx.ipv6best.cn/pts-server/busService/client/busLine/searchBusLines',
    method: 'POST',
    data: { h: { deviceId: 'fixedDeviceID', userToken: '', appCode: '330900', codeValue: '330900', sourceCodeValue: '330900' }, b: { lineName, offset: 10, page: 1 } },
  })
}

export const queryLine = (lineName: string) => {
  return axios.request({
    url: 'https://pts-linkcld-comx3efb63a802260xx.ipv6best.cn/pts-server/busService/client/busLine/queryLine',
    method: 'POST',
    data: { h: { deviceId: 'fixedDeviceID', userToken: '', appCode: '330900', codeValue: '330900', sourceCodeValue: '330900' }, b: { lineName, needGeometry: 123 } },
  })
}
