/**
 * util 
 */

 class Util {
     public static sleep (second) {
        return new Promise((resolve, reject) => {
            setTimeout(resolve, second * 1000);
        })
     }
     public static random (a : number, b : number) : number {
         if (a > b) [a, b] = [b, a];
        return Math.floor((Math.random() * (b - a + 1)) + a);
     }
 }