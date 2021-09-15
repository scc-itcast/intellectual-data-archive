/**
 * @description 封装的方法工具函数
 **/
const tool = {}

/**
 * @description 封装的方法工具函数
 **/

tool.fun_cascader_text = function(
  list = [],
  valueList = '',
  value = 'value',
  label = 'label'
) {
  let text1 = ''
  let text2 = ''
  let text3 = ''
  list.forEach(item => {
    if (item[value] == valueList[0]) {
      text1 = item[label]
    }
    if (item.children) {
      item.children.forEach(itemC1 => {
        if (itemC1[value] == valueList[1]) {
          text2 = itemC1[label]
        }
        if (itemC1.children) {
          itemC1.children.forEach(itemC2 => {
            if (itemC2[value] == valueList[2]) {
              text3 = itemC2[label]
            }
          })
        }
      })
    }
  })
  let text_value = `${text1}${text2 ? '/' + text2 : ''}${
    text3 ? '/' + text3 : ''
  }`
  return text_value
}

tool.fun_select_text = function(
  list = [],
  valueId = '',
  value = 'value',
  label = 'label'
) {
  let text = ''
  list.forEach(item => {
    if (item[value] == valueId) {
      text = item[label]
    }
  })
  return text
}

tool.fun_multiple_select_text = function(
  list = [],
  valueId = '',
  value = 'value',
  label = 'label'
) {
  let text = ''
  list.forEach(item => {
    if (valueId.indexOf(item[value]) != -1) {
      text += item[label] + ','
    }
  })
  text = text.slice(0, text.length - 1)
  return text
}

tool.fun_now_format_date = function() {
  //获取年月日时分秒
  var date = new Date()
  var seperator1 = '-'
  var seperator2 = ':'
  var month = date.getMonth() + 1
  var strDate = date.getDate()
  var strHours = date.getHours()
  var strMinutes = date.getMinutes()
  var strSeconds = date.getSeconds()
  var currentdate = date.getFullYear() + seperator1 + add0(month) + seperator1 + add0(strDate) + ' ' + add0(strHours) + seperator2 + add0(strMinutes) + seperator2 + add0(strSeconds)
  return currentdate
}

export default tool
