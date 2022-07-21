import { DropResult } from 'smooth-dnd'
export const applyDrag = (arr:Array<any>, dragResult:DropResult) => {
  const { removedIndex, addedIndex, payload } = dragResult
  if (removedIndex === null && addedIndex === null) return arr

  const result = [...arr]
  let itemToAdd = payload

  if (removedIndex !== null) {
    itemToAdd = result.splice(removedIndex, 1)[0]
  }

  if (addedIndex !== null) {
    result.splice(addedIndex, 0, itemToAdd)
  }

  return result
}

export const mapOrder = (array:Array<any>, order:Array<any>, key:any) => {
  array.sort((a, b) => order.indexOf(a[key]) - order.indexOf(b[key]))
  return array
}

export const handleNotify = (message: string) => {
  alert(message)
}

export const handlerPromise = (promise: Promise<any>) => {
  return promise.then(data => [undefined, data])
    .catch( err => [err, undefined])
}

export const arrayOfIndex = (length: Number) => {
  return [...Array(length).keys()]
}

export function* shuffle(array: Array<Number>) {
  var i = array.length
  while (i--) {
    yield array.splice(Math.floor(Math.random() * (i+1)), 1)[0]
  }
}

export const arrayRandomWithoutRepetitions = (length: Number) => {
  let result: Array<any> = []
  let arrayRoot = arrayOfIndex(length)  
  let arrayRandom = shuffle([...arrayRoot])
  arrayRoot.forEach(() => {
    result.push(arrayRandom.next().value)
  })
  return result
} 
