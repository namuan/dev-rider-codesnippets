const fizzbuzz = require('./index');

describe('fizzbuzz()', () => {
    it('should return fizzbuzz for multiples of 3 and 5', () => {
        expect(fizzbuzz(15)).toBe('FizzBuzz')
        expect(fizzbuzz(30)).toBe('FizzBuzz')
    });

    it('should return fizz for multiples of 3', () => {
        expect(fizzbuzz(9)).toBe('Fizz');
        expect(fizzbuzz(27)).toBe('Fizz');
    });

    it('should return buzz for multiples of 5', () => {
        expect(fizzbuzz(10)).toBe('Buzz');
        expect(fizzbuzz(20)).toBe('Buzz');
    });
    it('should return the given number if it is not a multiple of 5 or 3', () => {
        expect(fizzbuzz(7)).toBe('7');
        expect(fizzbuzz(11)).toBe('11');
    });
});