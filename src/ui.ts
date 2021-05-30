export function ConfigureUi() {
  const canvas = new UICanvas();

  const textInput = new UIInputText(canvas);
  textInput.width = '20%';
  textInput.height = '25px';
  textInput.vAlign = 'bottom';
  textInput.hAlign = 'center';
  textInput.fontSize = 10;
  textInput.placeholder = 'Write message here';
  textInput.placeholderColor = Color4.Gray();
  textInput.positionY = '200px';
  textInput.isPointerBlocker = true;

  textInput.onTextSubmit = new OnTextSubmit((x) => {
    const text = new UIText(textInput);
    text.value = '<USER-ID> ' + x.text;
    text.width = '100%';
    text.height = '20px';
    text.vAlign = 'top';
    text.hAlign = 'left';
  });
}
