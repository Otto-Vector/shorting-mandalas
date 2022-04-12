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


// сужение по Фибоначи (на один уровень вниз)
const minusOneLevel = ( array: number[] ): number[] =>
    array.reduce( ( prev: number[], curr, idx, arr ) =>
            idx < arr.length - 1 // до предпоследней позиции
                ? [ ...prev, // репарсим состояние массива
                    curr + arr[idx + 1] ] // cкладываем первый индекс со вторым, второй с третьи и т.д.
                : prev, // если дошли до предпоследней позиции, просто возвращаем номинал
        [] ) // здесь задаём пустой массив prev
        .map( toOneFibonacciDigit ) // преобразуем суммы в суммы по фибоначи


// сужение по Урсуле
// возвращает сужаемый до нужного количества цифр двумерный массив
const listLayersToLevel = ( minArray: number[], level = 1 ): number[][] => {
    level = level < 1 || level > minArray.length ? 1 : level // проверяем уровни на ненужные значения || 1
    return minArray.reduce( ( prev: number[][], curr, idx, arr ) =>
            idx < arr.length - level // до предпоследней позиции
                ? [ ...prev, minusOneLevel( prev[idx] ) ] // докидываем вложенный массив, высчитанный из предыдущего
                : prev, // если дошли до нужной позиции, просто возвращаем номинал
        [ minArray ] ) // здесь задаём первый вложенный массив для подсчёта остальных
}

// сужение по Урсуле (полная таблица)
export const listLayersToOne = ( minArray: number[] ): number[][] => listLayersToLevel( minArray, 1 )
