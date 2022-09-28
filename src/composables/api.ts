import axios from 'axios'

const URL_PREFIX = 'https://pts.linkcld.com'
export const searchBusLines = (lineName: string) => {
  return axios.request({
    url: `${URL_PREFIX}/pts-server/busService/client/busLine/searchBusLines`,
    method: 'POST',
    data: { h: { deviceId: 'fixedDeviceID', userToken: '', appCode: '330900', codeValue: '330900', sourceCodeValue: '330900' }, b: { lineName, offset: 10, page: 1 } },
  })
}

export const queryLine = (lineName: string) => {
  return axios.request({
    url: `${URL_PREFIX}/pts-server/busService/client/busLine/queryLine`,
    method: 'POST',
    data: { h: { deviceId: 'fixedDeviceID', userToken: '', appCode: '330900', codeValue: '330900', sourceCodeValue: '330900' }, b: { lineName, needGeometry: 123 } },
  })
}

export const details = (lineId: string) => {
  return axios.request({
    url: `${URL_PREFIX}/pts-server/busService/client/bus/vehicle/dynamic/line/details`,
    method: 'POST',
    data: { h: { deviceId: 'fixedDeviceID', userToken: '', appCode: '330900', codeValue: '330900', sourceCodeValue: '330900' }, b: { lineId, offset: 100 } },
  })
}

