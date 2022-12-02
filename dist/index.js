const test = (name) => {
    console.log(name);
};
test('fsda');
document.querySelector('div')?.addEventListener('click', () => {
    console.log(undefined);
});
window.$utils.message('fsd');

export { test as default };
