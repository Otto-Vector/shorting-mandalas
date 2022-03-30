//функция сложения чисел к одному числу фибоначчи
export const toOneFibbonachiDigit = ( num: number ): number =>  num % 9 || 9

export const to_array_of_numbers = (simbols_static_in_fn: string): number[] => {

  return this
          .split('') //перевод строки в массив
          .map( string_symbol =>   //пересборка в новый массив
                +string_symbol || //если символ число, то возвращает число
                //иначе возвращает позицию символа в соответствии с таблицей Урсулы
                simbols_static_in_fn.indexOf(string_symbol)%9+1
              )
}
