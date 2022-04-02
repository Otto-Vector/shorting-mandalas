// функция сложения чисел к одному числу фибоначчи
export const toOneFibonacciDigit = ( num: number ): number => num % 9 || 9


// функция возвращает обработанную строку без пробелов либо обработанную тестовую строку
export const modificationToNormal = (
    stringFromUserInput: string, // stringFromUserInput - на обработку
    stringByDefault?: string, // stringByDefault - на замену
): string | '0123456789' => {
    stringByDefault||='0123456789'
    let modified = stringFromUserInput.replace( /[^a-zа-яё\d]/ig, '' )
    return +modified === 0 || !modified // проверка на ноль и на пустую стоку
        ? modificationToNormal(stringByDefault) // рекурсим с дефолтной строкой
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
