
// function Slug(text){
// var x = ' User name '
// let y = text.toLowerCase()
//          .trim()
//          .replace(' ','-')
//         //  .replace('',)
// return y;
// }
// console.log(Slug("Web d//esign"));

var module1 = {
        x: 42,
        getX: function(){
                return this.x;
        }
}
const y1 = module1.getX;
// const y2 = y1.bind(module1);

// console.log(module1.getX())
console.log(y1())
// console.log(y2())