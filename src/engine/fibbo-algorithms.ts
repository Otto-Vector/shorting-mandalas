// функция сложения чисел к одному числу фибоначчи
export const toOneFibonacciDigit = ( num: number ): number => num % 9 || 9

// для вывода последнего массива из списка
const lastElement = ( arr: number[][] ): number[] => arr[arr.length - 1]

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


// сужение по Фибоначи (на один уровень вниз)
const minusOneLevel = ( array: number[] ): number[] =>
    array.reduce( ( prev: number[], curr, idx, arr ) =>
            idx < arr.length - 1 // до предпоследней позиции
                ? [ ...prev, // репарсим состояние массива
                    curr + arr[idx + 1] ] // cкладываем первый индекс со вторым, второй с третьи и т.д.
                : prev, // если дошли до предпоследней позиции, просто возвращаем номинал
        [] ) // здесь задаём пустой массив prev
        .map( toOneFibonacciDigit ) // преобразуем суммы в суммы по фибоначи


// альтернативное расширение: [1,2,3] => [1,1+2,2,2+3,3]
// массив расширяется на порядок (lenght*2-1)
const plusOneLevel = ( anotherPlusArray: number[] ): number[] =>
    anotherPlusArray.reduce( ( prev: number[], curr, ind ) =>
        !ind ? [ curr ] // при нуле возвращаем первую
            : [ ...prev, prev[prev.length - 1] + curr, curr ] // собираем массив
        , [] ) // объявляем массив в curr
        .map( toOneFibonacciDigit ) // преобразуем суммы в суммы по фибоначи

// массив расширяется пока не достигнет искомой++ длины
const plusToLevel = ( anotherPlusArray: number[], alength: number ): number[] => {
    let bufferArray = plusOneLevel(anotherPlusArray)
    return bufferArray.length >= alength ? bufferArray : plusToLevel( bufferArray, alength )
}


// сужение по Урсуле
// возвращает сужаемый до нужного количества цифр двумерный массив
const listLayersToLevel = ( minArray: number[], level = 1 ): number[][] => {

    level = level < 1 ? 1 : Math.ceil( level ) // проверяем уровни на ненужные значения

    // задаём массив на расширение, если нужно расширение
    let bufferArray = level > minArray.length ? plusToLevel( minArray, level ) : minArray

    return bufferArray.reduce( ( prev: number[][], curr, idx, arr ) =>
            idx < arr.length - level // до предпоследней позиции
                ? [ ...prev, minusOneLevel( prev[idx] ) ] // докидываем вложенный массив, высчитанный из предыдущего
                : prev, // если дошли до нужной позиции, просто возвращаем номинал
        [ bufferArray ] ) // здесь задаём первый вложенный массив для подсчёта остальных
}

// сужение по Урсуле (полная таблица)
export const listLayersToOne = ( minArray: number[] ): number[][] => listLayersToLevel( minArray, 1 )

// пересчитываем массив до последнего элемента
export const lastLayer = ( minArray: number[] ): number[] => lastElement( listLayersToOne( minArray ) )

// пересчитываем массив до нужного количества элементов
export const toNumbersOfElement = (minArray: number[], level: number): number[] =>
    lastElement( listLayersToLevel( minArray, level) )
