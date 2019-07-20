/**
 * Author: Zhou Ht
 * Date: 2019/2/25 0025
 * Time: 22:41
 *
 */
const weightRange = [
    {
        weight: [25, 25, 25, 25],
        range: [1]
    },
    {
        weight: [16, 50, 10, 10, 14],
        range: [2]
    },
    {
        weight: [21, 21, 36, 22],
        range: [4]
    },
]
const data = [
    {
        description: 'question 1',
        selection: [
            {
                key: 'A',
                value: 1
            },
            {
                key: 'B',
                value: 2
            },
            {
                key: 'C',
                value: 3
            },
            {
                key: 'D',
                value: 4
            },
        ],
        multiple: false
    },
    {
        description: 'question 2',
        selection: [
            {
                key: 'A',
                value: 123
            },
            {
                key: 'B',
                value: 456
            },
            {
                key: 'C',
                value: 789
            },
            {
                key: 'D',
                value: 101112
            },
            {
                key: 'E',
                value: 456654
            },
        ],
        multiple: true
    },
    {
        description: 'question 3',
        selection: [
            {
                key: 'A',
                value: 'dsadsaw'
            },
            {
                key: 'B',
                value: 'fdsrewfds'
            },
            {
                key: 'C',
                value: 'dvcxvcxsdf'
            },
            {
                key: 'D',
                value: 'xcfsdds'
            },
        ],
        multiple: true
    },
    {
        description: 'question 4',
        selection: [
            {
                key: 'A',
                value: 'dsadsaw'
            },
            {
                key: 'B',
                value: 'fdsrewfds'
            },
            {
                key: 'C',
                value: 'dvcxvcxsdf'
            },
            {
                key: 'D',
                value: 'xcfsdds'
            },
          {
            key: 'E',
            value: 'xcfsdds'
          },
          {
            key: 'F',
            value: 'xcfsdds'
          },

        ],
        multiple: true
    },
]

/**
 * 将不同权重的问题分组
 * @param data 需要被分组的数据
 * @param condition 分组的依据
 * */
const groupData = (data, condition) => {
    const _result = []
    let totalWeight = []
    for (const v of condition) {
        totalWeight = totalWeight.concat(v.range)
        if (v.range[0].length === 1) {
            _result.push({
                question: [data[v.range[0] - 1]],
                weight: v.weight
            })
        } else {
            const _startIndex = v.range[0] - 1
            const _endIndex = v.range[v.range.length - 1]
            _result.push({
                question: data.slice(_startIndex, _endIndex),
                weight: v.weight
            })
        }
    }
    // 如果有的题目没有加权重，则加上默认权重，默认权重每个选项被选择的几率相等
    if (totalWeight.length !== data.length) {
      data.forEach((v, i) => {
          if (!totalWeight[i]) {
            console.log(v);
            const weightDefault = []
            v.selection.forEach(() => {
              const everyWeight = Math.ceil(100 / v.selection.length)
              weightDefault.push(everyWeight)
            })
            _result.push({
              question: [v],
              weight: weightDefault
            })
          }
      })
    }
  return _result
}
console.log(groupData(data, weightRange));

/**
 * 生成结果数据
 *
 * */

const generateResult = () => {
  const TOTAL_RANGE = 100
  const _data = JSON.parse(JSON.stringify(groupData(data, weightRange)))
  function generateBig(){
    const str = [];
    for(let i=65;i<91;i++){
      str.push(String.fromCharCode(i));
    }
    return str;
  }

  _data.forEach(v => {
    function weightRange(weight) {
      const selectionIndex = generateBig().slice(0, weight.length)
      const weightRange = []
      for (let i = 0; i< weight.length; i++) {
        for (let k = 0; k < TOTAL_RANGE; k++) {
          if (k < weight[i]) {
            weightRange.push(selectionIndex[i])
          }
        }
      }
      return weightRange
    }
      const { weight, question } = v
    if (weight) {
        question.forEach(v => {
          if (v.multiple) {
              let times =  Math.floor(Math.random() * v.selection.length) + 1
/*              if (times === 1) { times = times + 1 }
              if (times === v.selection.length) { times -- }*/
              const selected = []
              for (let n = 0; n < times; n++) {
                const selection = weightRange(weight)[Math.floor(Math.random() * TOTAL_RANGE)]
                console.log(n, times, selected, selection);
                if (selected.indexOf(selection) >= 0) {
                      n--
                  } else {
                    selected.push(selection)
                  }
              }
            console.log('多选的结果', selected.sort());
            v.result = selected
          } else {
            const selected = Math.floor(Math.random() * TOTAL_RANGE)
            v.result = [weightRange(weight)[selected]]
          }
        })
      }
    })
  return _data
}
console.log(generateResult());
const selectedData = []

/*data.forEach((v, i) => {
    let selected = ''
    if (v.multiple) {
        const multipleSelected = []
        const multipleTimes = Math.ceil(Math.random() * (v.selection.length - 0))
        for (let i = 0; i < multipleTimes; i++) {
            const multipleIndex = Math.floor(Math.random() * (v.selection.length - 0))
            const selectItem = v.selection[multipleIndex]
            if (multipleSelected.findIndex(j => j.key === selectItem.key) >= 0) {
                i--
            } else {
                multipleSelected.push(selectItem)
            }
        }
        selected = multipleSelected
    } else {
        const targetIndex = Math.floor(Math.random() * (v.selection.length - 0))
        selected = v.selection[targetIndex]
    }
    selectedData.push(selected)
})*/
