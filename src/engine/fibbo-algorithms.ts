// функция сложения чисел к одному числу фибоначчи
export const toOneFibonacciDigit = ( num: number ): number => num % 9 || 9


// функция возвращает обработанную строку без пробелов либо обработанную correctOutput строку
export const modificationToNormal = (
    fromUserInput: string, // fromUserInput - на обработку
    correctOutput?: string, // correctOutput - на замену
): string | '0123456789' => {
    correctOutput ||= '0123456789'
    const modified = fromUserInput.replace( /[^a-zа-яё\d]/ig, '' )
    return +modified === 0 // проверка на ноль и на пустую стоку
        ? modificationToNormal( correctOutput ) // рекурсим с дефолтной строкой
        : modified // иначе просто возвращаем
}


// функция перевода строки в массив чисел 1-9
export const wordToArrayOfNumbers = (
    words: string, // строка на вход
    simbolsOnPositions: string | undefined // буквы на позициях для перевода соответствия их поизиций в число от 1 до 9
        = 'abcdefghijklmnopqrstuvwxyz абвгдеёжзийклмнопрстуфхцчшщъыьэюя   ABCDEFGHIJKLMNOPQRSTUVWXYZ АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ',
): number[] =>
    modificationToNormal( words ) // нормализуем строку для наших нужд
        .split( '' ) // перевод строки в массив
        .map( stringSymbol =>   // пересборка в новый массив
            +stringSymbol || // если символ число, то возвращает число
            // иначе возвращает позицию символа в соответствии с таблицей Урсулы
            simbolsOnPositions.indexOf( stringSymbol ) % 9 + 1,
        )

// сужение по Урсуле
export const splitMinuses = ( minarray: number[] ): number[][] => {

    const minusOne = ( array: number[] ): number[] =>
        array
            .map( ( el, ind, arr ) => el + arr[ind + 1] )
            .filter( v => v )

    let times = minarray.length - 1
    let returnedArray: number[][] = [ minarray ]

    for (let i = 0; i < times; i++) {
        returnedArray.push(
            minusOne( returnedArray[i] ).map( toOneFibonacciDigit )
        )
    }

    return returnedArray

}//возвращает сужаемый до нужного количества цифр двумерный массив

