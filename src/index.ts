import './index.less'

const test=(name:string)=>{
  console.log(name);
}

test('fsda')

document.querySelector('div')?.addEventListener('click',()=>{
  console.log(this);
})

window.$utils.message('fsd')

export default test